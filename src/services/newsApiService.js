import { FINANCIAL_NEWS_CONFIG } from "../constants/financialNews";

const newsCache = new Map();
const CACHE_TTL_MS = FINANCIAL_NEWS_CONFIG.CACHE_TTL_MS;

const getCacheKey = () => "financial-news";

const clearCache = () => {
  newsCache.clear();
};

const normalizeForDedup = (article) => {
  const titleNorm = (article.title || "").toLowerCase().trim();
  const descNorm = (article.description || "").toLowerCase().trim();
  return `${titleNorm}|${descNorm}`;
};

const fetchFinancialNews = async (
  _language = "en",
  _region = "global",
  batchNumber = 1,
  signal,
) => {
  const language = "en";
  const region = "global";
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return {
      error: "API_KEY_MISSING",
      newsItems: [],
      hasMore: false,
    };
  }

  if (batchNumber > FINANCIAL_NEWS_CONFIG.MAX_BATCHES) {
    const cached = newsCache.get(getCacheKey());
    return {
      newsItems: cached?.newsItems || [],
      hasMore: false,
      error: null,
    };
  }

  const cacheKey = getCacheKey();
  const cached = newsCache.get(cacheKey);

  const isFresh =
    cached && cached.timestamp && Date.now() - cached.timestamp < CACHE_TTL_MS;

  if (isFresh && cached.lastBatch >= batchNumber) {
    return {
      newsItems: cached.newsItems,
      hasMore: cached.lastBatch < FINANCIAL_NEWS_CONFIG.MAX_BATCHES,
      error: null,
    };
  }

  try {
    const baseUrl = "https://gnews.io/api/v4/search";
    const params = new URLSearchParams({
      q: "financial OR economy OR market OR business",
      lang: "en",
      max: FINANCIAL_NEWS_CONFIG.API_BATCH_SIZE.toString(),
      page: batchNumber.toString(),
      apikey: apiKey,
    });

    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const freshItems = (data.articles || []).map((article) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source?.name || "Unknown",
      image: article.image,
    }));

    const existingItems = cached?.newsItems || [];
    const existingKeys = new Set(existingItems.map(normalizeForDedup));
    const uniqueNewItems = freshItems.filter(
      (item) => !existingKeys.has(normalizeForDedup(item)),
    );

    const allItems = [...existingItems, ...uniqueNewItems];
    const cappedItems = allItems.slice(
      0,
      FINANCIAL_NEWS_CONFIG.MAX_TOTAL_ITEMS,
    );

    const hasMore =
      batchNumber < FINANCIAL_NEWS_CONFIG.MAX_BATCHES &&
      freshItems.length >= FINANCIAL_NEWS_CONFIG.API_BATCH_SIZE;

    newsCache.set(cacheKey, {
      newsItems: cappedItems,
      hasMore,
      lastBatch: batchNumber,
      timestamp: Date.now(),
    });

    return {
      newsItems: cappedItems,
      hasMore,
      error: null,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        newsItems: cached?.newsItems || [],
        hasMore: cached?.hasMore ?? false,
        error: null,
      };
    }

    if (cached && isFresh) {
      return {
        newsItems: cached.newsItems,
        hasMore: cached.hasMore,
        error: null,
      };
    }

    return {
      error: "FETCH_FAILED",
      newsItems: [],
      hasMore: false,
    };
  }
};

export const newsApiService = {
  fetchFinancialNews,
  clearCache,
  getCacheKey,
};
