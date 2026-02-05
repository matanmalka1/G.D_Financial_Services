// Session-level in-memory cache for financial news
const newsCache = new Map();
// Default TTL is defined in FINANCIAL_NEWS_CONFIG but duplicated here to avoid circular import.
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Generate cache key from language and region
const getCacheKey = (language, region) => `${language}-${region}`;

// Clear all cached news data
const clearCache = () => {
  newsCache.clear();
};

// Fetch financial news from GNews API with caching and batch logic
const fetchFinancialNews = async (language, region, batchNumber = 1, signal) => {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
  console.log("[financial-news] fetchFinancialNews called", {
    hasKey: Boolean(apiKey),
    language,
    region,
    batchNumber,
  });

  // Check for API key
  if (!apiKey || apiKey === "your_api_key_here") {
    return {
      error: "API_KEY_MISSING",
      newsItems: [],
      hasMore: false,
    };
  }

  const cacheKey = getCacheKey(language, region);
  const cached = newsCache.get(cacheKey);

  // Validate cache freshness (per language-region)
  const isFresh =
    cached && cached.timestamp && Date.now() - cached.timestamp < CACHE_TTL_MS;

  // Check if we already have data for this batch and cache is fresh
  if (isFresh && cached.lastBatch >= batchNumber) {
    return {
      newsItems: cached.newsItems,
      hasMore: cached.hasMore,
      error: null,
    };
  }

  try {
    // Build GNews API URL
    const baseUrl = "https://gnews.io/api/v4/search";
    const params = new URLSearchParams({
      q: "financial OR economy OR market OR business",
      lang: language,
      max: "27",
      page: batchNumber.toString(),
      apikey: apiKey,
    });

    // Add country parameter for Israel region
    if (region === "israel") {
      params.append("country", "il");
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log("[financial-news] requesting URL", url);
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform API response to normalized structure
    const freshItems = (data.articles || []).map((article) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source?.name || "Unknown",
      image: article.image,
    }));

    // Deduplicate within this batch and against existing cache
    const existingItems = cached?.newsItems || [];
    const existingKeys = new Set(
      existingItems.map(
        (item) =>
          `${(item.title || "").toLowerCase()}|${item.publishedAt || ""}|${item.url}`,
      ),
    );
    const uniqueNewItems = [];
    for (const item of freshItems) {
      const key = `${(item.title || "").toLowerCase()}|${item.publishedAt || ""}|${item.url}`;
      if (existingKeys.has(key)) continue;
      existingKeys.add(key);
      uniqueNewItems.push(item);
    }

    // Merge with existing items
    const allItems = [...existingItems, ...uniqueNewItems];

    // Determine if more data is available
    const hasMore = freshItems.length >= 27;

    // Update cache with timestamp
    newsCache.set(cacheKey, {
      newsItems: allItems,
      hasMore,
      lastBatch: batchNumber,
      timestamp: Date.now(),
    });

    return {
      newsItems: allItems,
      hasMore,
      error: null,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("[financial-news] fetch aborted");
      return {
        newsItems: cached?.newsItems || [],
        hasMore: cached?.hasMore ?? false,
        error: null,
      };
    }

    console.error("Failed to fetch financial news:", error);

    // Return cached data if available, otherwise error
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
