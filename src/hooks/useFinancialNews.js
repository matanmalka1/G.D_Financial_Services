import { useState, useEffect, useCallback, useRef } from "react";
import { newsApiService } from "../services/newsApiService";
import { FINANCIAL_NEWS_CONFIG } from "../constants/financialNews";

export const useFinancialNews = (language) => {
  const [region, setRegion] = useState("global");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState([]);
  const [loadedBatches, setLoadedBatches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { ITEMS_PER_PAGE, API_BATCH_SIZE } = FINANCIAL_NEWS_CONFIG;
  
  // Track if component is mounted
  const isMountedRef = useRef(true);

  // Initial fetch when language or region changes
  useEffect(() => {
    const abortController = new AbortController();
    isMountedRef.current = true;

    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setError(null);
    setHasMore(true);
    console.log("[financial-news] effect trigger", { language, region });

    const fetchInitialBatch = async () => {
      if (!isMountedRef.current) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const result = await newsApiService.fetchFinancialNews(
          language,
          region,
          1,
          abortController.signal,
        );

        // Only update state if still mounted and not aborted
        if (!isMountedRef.current || abortController.signal.aborted) {
          return;
        }

        if (result.error) {
          console.warn("[financial-news] fetch returned error", result.error);
          setError(result.error);
          setHasMore(false);
        } else {
          console.log("[financial-news] fetch returned items", {
            count: result.newsItems.length,
            hasMore: result.hasMore,
          });
          setNewsItems(result.newsItems);
          setHasMore(result.hasMore);
          setLoadedBatches(1);
          setCurrentPage(1);
        }

        setIsLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log("[financial-news] fetch aborted (expected during cleanup)");
          return;
        }
        console.error("[financial-news] fetch error", err);
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
        }
      }
    };

    fetchInitialBatch();

    return () => {
      console.log("[financial-news] cleanup - aborting fetch");
      isMountedRef.current = false;
      abortController.abort();
    };
  }, [language, region]);

  // Load additional batches
  const loadBatch = useCallback(
    async (batchNumber) => {
      console.log("[financial-news] loadBatch start", { batchNumber, language, region });
      
      if (isLoading || !isMountedRef.current) {
        console.log("[financial-news] skipping batch load", { isLoading, mounted: isMountedRef.current });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await newsApiService.fetchFinancialNews(
          language,
          region,
          batchNumber,
          null, // No abort signal for pagination fetches
        );

        if (!isMountedRef.current) return;

        if (result.error) {
          console.warn("[financial-news] fetch returned error", result.error);
          setError(result.error);
          setHasMore(false);
        } else {
          console.log("[financial-news] fetch returned items", {
            count: result.newsItems.length,
            hasMore: result.hasMore,
          });
          setNewsItems(result.newsItems);
          setHasMore(result.hasMore);
          setLoadedBatches(batchNumber);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("[financial-news] loadBatch error", err);
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
        }
      }
    },
    [language, region, isLoading],
  );

  // Retry function
  const retry = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setError(null);
    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setHasMore(true);
    setIsLoading(true);

    try {
      const result = await newsApiService.fetchFinancialNews(language, region, 1, null);

      if (!isMountedRef.current) return;

      if (result.error) {
        setError(result.error);
        setHasMore(false);
      } else {
        setNewsItems(result.newsItems);
        setHasMore(result.hasMore);
        setLoadedBatches(1);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("[financial-news] retry error", err);
      if (isMountedRef.current) {
        setError("FETCH_FAILED");
        setHasMore(false);
        setIsLoading(false);
      }
    }
  }, [language, region]);

  // Change region handler
  const changeRegion = useCallback((newRegion) => {
    setRegion(newRegion);
  }, []);

  // Page change handler
  const goToPage = useCallback(
    (page) => {
      const requiredBatches = Math.ceil((page * ITEMS_PER_PAGE) / API_BATCH_SIZE);

      if (requiredBatches > loadedBatches && hasMore && !isLoading) {
        loadBatch(requiredBatches);
      }

      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: "smooth" });
    },
    [hasMore, isLoading, loadBatch, ITEMS_PER_PAGE, API_BATCH_SIZE, loadedBatches],
  );

  // Compute paginated items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = newsItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  return {
    region,
    currentPage,
    newsItems: paginatedItems,
    allNewsItems: newsItems,
    totalPages,
    isLoading,
    hasMore,
    error,
    changeRegion,
    goToPage,
    retry,
  };
};
