import { useState, useEffect, useCallback } from "react";
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

  // Load a batch of news from API
  const loadBatch = useCallback(
    async (batchNumber, signal, targetPage = null) => {
      let shouldLoad = false;
      setIsLoading((current) => {
        if (current) return true;
        shouldLoad = true;
        return true;
      });

      if (!shouldLoad) return;

      setError(null);

      const result = await newsApiService.fetchFinancialNews(
        language,
        region,
        batchNumber,
        signal,
      );

      try {
        if (signal?.aborted) return;

        if (result.error) {
          setError(result.error);
          setHasMore(false);
        } else {
          setNewsItems(result.newsItems);
          setHasMore(result.hasMore);
          setLoadedBatches(batchNumber);
          if (targetPage !== null) {
            setCurrentPage(targetPage);
          }
        }
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [language, region],
  );

  // Reset and fetch initial data when language or region changes
  useEffect(() => {
    const abortController = new AbortController();

    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setError(null);
    setHasMore(true);
    loadBatch(1, abortController.signal, 1);

    return () => abortController.abort();
  }, [language, region, loadBatch]);

  // Change region handler
  const changeRegion = useCallback((newRegion) => {
    setRegion(newRegion);
  }, []);

  const retry = useCallback(() => {
    setError(null);
    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setHasMore(true);
    loadBatch(1);
  }, [loadBatch]);

  // Page change handler with smart fetch triggering
  const goToPage = useCallback(
    (page) => {
      // Calculate required batches for this page
      const requiredBatches = Math.ceil((page * ITEMS_PER_PAGE) / API_BATCH_SIZE);

      // Trigger fetch if we need more data, using functional state to avoid stale closures
      setLoadedBatches((current) => {
        if (requiredBatches > current && hasMore && !isLoading) {
          loadBatch(requiredBatches, undefined, page);
        }
        return current;
      });

      // If we already have the data, move to the page immediately
      if (requiredBatches <= loadedBatches) {
        setCurrentPage(page);
      }
      window.scrollTo({ top: 400, behavior: "smooth" });
    },
    [hasMore, isLoading, loadBatch, ITEMS_PER_PAGE, API_BATCH_SIZE, loadedBatches],
  );

  // Compute paginated items for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = newsItems.slice(startIndex, endIndex);

  // Calculate total pages based on loaded items
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
