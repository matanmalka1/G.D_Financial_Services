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

  const { ITEMS_PER_PAGE, MAX_BATCHES, MAX_TOTAL_ITEMS } =
    FINANCIAL_NEWS_CONFIG;

  const isMountedRef = useRef(true);
  const loadingBatchRef = useRef(0);

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
      loadingBatchRef.current = 1;

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
        loadingBatchRef.current = 0;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
          loadingBatchRef.current = 0;
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
      if (
        loadingBatchRef.current === batchNumber ||
        !isMountedRef.current ||
        batchNumber > MAX_BATCHES ||
        batchNumber <= loadedBatches
      ) {
        return;
      }

      setIsLoading(true);
      setError(null);
      loadingBatchRef.current = batchNumber;

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
        loadingBatchRef.current = 0;
      } catch (err) {
        if (isMountedRef.current) {
          setError("FETCH_FAILED");
          setHasMore(false);
          setIsLoading(false);
          loadingBatchRef.current = 0;
        }
      }
    },
    [loadedBatches, MAX_BATCHES, MAX_TOTAL_ITEMS],
  );

  const retry = useCallback(async () => {
    if (!isMountedRef.current) return;

    setError(null);
    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(1);
    setHasMore(true);
    setIsLoading(true);
    loadingBatchRef.current = 1;

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
      loadingBatchRef.current = 0;
    } catch (err) {
      if (isMountedRef.current) {
        setError("FETCH_FAILED");
        setHasMore(false);
        setIsLoading(false);
        loadingBatchRef.current = 0;
      }
    }
  }, [MAX_TOTAL_ITEMS]);

  const goToPage = useCallback(
    (page) => {
      if (page < 1 || page > 5) {
        return;
      }

      setCurrentPage(page);

      if (page === 2 && loadedBatches < 2) {
        loadBatch(2);
      } else if (page === 3 && loadedBatches < 3) {
        loadBatch(3);
      } else if (page === 4 && loadedBatches < 4) {
        loadBatch(4);
      } else if (page === 5 && loadedBatches < 5) {
        loadBatch(5);
      }

      window.scrollTo({ top: 400, behavior: "smooth" });
    },
    [loadBatch, loadedBatches],
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = newsItems.slice(startIndex, endIndex);

  const totalPages = 5;

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
