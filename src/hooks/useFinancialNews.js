import { useState, useEffect, useCallback, useRef } from "react";
import { newsApiService } from "../services/newsApiService";
import { FINANCIAL_NEWS_CONFIG } from "../constants/financialNews";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_REGION = "global";

export const useFinancialNews = () => {
  const language = DEFAULT_LANGUAGE;
  const region = DEFAULT_REGION;
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState([]);
  const [loadedBatches, setLoadedBatches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { ITEMS_PER_PAGE, API_BATCH_SIZE, MAX_BATCHES, MAX_TOTAL_ITEMS } =
    FINANCIAL_NEWS_CONFIG;

  const isMountedRef = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    isMountedRef.current = true;

    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setError(null);
    setHasMore(true);

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

        if (!isMountedRef.current || abortController.signal.aborted) {
          return;
        }

        if (result.error) {
          setError(result.error);
          setHasMore(false);
        } else {
          setNewsItems(result.newsItems);
          setHasMore(
            result.hasMore && result.newsItems.length < MAX_TOTAL_ITEMS,
          );
          setLoadedBatches(1);
          setCurrentPage(1);
        }

        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
        }
      }
    };

    fetchInitialBatch();

    return () => {
      isMountedRef.current = false;
      abortController.abort();
    };
  }, []);

  const loadBatch = useCallback(
    async (batchNumber) => {
      if (isLoading || !isMountedRef.current || batchNumber > MAX_BATCHES) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await newsApiService.fetchFinancialNews(
          language,
          region,
          batchNumber,
          null,
        );

        if (!isMountedRef.current) return;

        if (result.error) {
          setError(result.error);
          setHasMore(false);
        } else {
          setNewsItems(result.newsItems);
          setHasMore(
            result.hasMore && result.newsItems.length < MAX_TOTAL_ITEMS,
          );
          setLoadedBatches(batchNumber);
        }

        setIsLoading(false);
      } catch (err) {
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
        }
      }
    },
    [isLoading, MAX_BATCHES, MAX_TOTAL_ITEMS],
  );

  const retry = useCallback(async () => {
    if (!isMountedRef.current) return;

    setError(null);
    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setHasMore(true);
    setIsLoading(true);

    try {
      const result = await newsApiService.fetchFinancialNews(
        language,
        region,
        1,
        null,
      );

      if (!isMountedRef.current) return;

      if (result.error) {
        setError(result.error);
        setHasMore(false);
      } else {
        setNewsItems(result.newsItems);
        setHasMore(result.hasMore && result.newsItems.length < MAX_TOTAL_ITEMS);
        setLoadedBatches(1);
      }

      setIsLoading(false);
    } catch (err) {
      if (isMountedRef.current) {
        setError("FETCH_FAILED");
        setHasMore(false);
        setIsLoading(false);
      }
    }
  }, [MAX_TOTAL_ITEMS]);

  const goToPage = useCallback(
    (page) => {
      if (page < 1 || page > 9) {
        return;
      }

      const triggerPages = [3, 6];
      const shouldFetch = triggerPages.includes(page);

      if (shouldFetch) {
        const batchNumber = page === 3 ? 2 : 3;
        if (batchNumber > loadedBatches && hasMore && !isLoading) {
          loadBatch(batchNumber);
        }
      }

      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: "smooth" });
    },
    [hasMore, isLoading, loadBatch, loadedBatches],
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = newsItems.slice(startIndex, endIndex);

  const calculatedPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const totalPages =
    loadedBatches < MAX_BATCHES ? 9 : Math.min(9, calculatedPages);

  return {
    region,
    currentPage,
    newsItems: paginatedItems,
    allNewsItems: newsItems,
    totalPages,
    isLoading,
    hasMore,
    error,
    goToPage,
    retry,
  };
};
