import { useState, useEffect, useCallback, useRef } from "react";
import { newsApiService } from "../services/newsApiService";
import { FINANCIAL_NEWS_CONFIG } from "../constants/financialNews";

const INITIAL_PAGE = 1;

export const useFinancialNews = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [newsItems, setNewsItems] = useState([]);
  const [loadedBatches, setLoadedBatches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { ITEMS_PER_PAGE, API_BATCH_SIZE, MAX_BATCHES, MAX_TOTAL_ITEMS } =
    FINANCIAL_NEWS_CONFIG;
  const totalPages = Math.ceil(MAX_TOTAL_ITEMS / ITEMS_PER_PAGE);

  const isMountedRef = useRef(true);
  const loadingBatchRef = useRef(0);

  const resetState = useCallback(() => {
    setNewsItems([]);
    setLoadedBatches(0);
    setCurrentPage(INITIAL_PAGE);
    setError(null);
  }, []);

  const applyFetchResult = useCallback(
    (result, batchNumber) => {
      if (result.error) {
        setError(result.error);
        return;
      }

      setNewsItems(result.newsItems);
      setLoadedBatches(batchNumber);
      setCurrentPage((page) => page || INITIAL_PAGE);
    },
    [],
  );

  const handleFetchFailure = useCallback(() => {
    setError("FETCH_FAILED");
  }, []);

  const fetchBatch = useCallback(
    async (batchNumber, signal) => {
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
          "en",
          "global",
          batchNumber,
          signal,
        );

        if (!isMountedRef.current || signal?.aborted) {
          return;
        }

        applyFetchResult(result, batchNumber);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        if (isMountedRef.current) {
          handleFetchFailure();
        }
      } finally {
        if (isMountedRef.current && !signal?.aborted) {
          setIsLoading(false);
          loadingBatchRef.current = 0;
        }
      }
    },
    [
      MAX_BATCHES,
      applyFetchResult,
      handleFetchFailure,
      loadedBatches,
    ],
  );

  useEffect(() => {
    const abortController = new AbortController();
    isMountedRef.current = true;

    resetState();
    fetchBatch(INITIAL_PAGE, abortController.signal);

    return () => {
      isMountedRef.current = false;
      abortController.abort();
    };
  }, [fetchBatch, resetState]);

  const retry = useCallback(async () => {
    if (!isMountedRef.current) return;

    resetState();
    await fetchBatch(INITIAL_PAGE);
  }, [fetchBatch, resetState]);

  const goToPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) {
        return;
      }

      setCurrentPage(page);

      const requiredBatch = Math.min(
        MAX_BATCHES,
        Math.ceil((page * ITEMS_PER_PAGE) / API_BATCH_SIZE),
      );

      if (requiredBatch > loadedBatches) {
        fetchBatch(requiredBatch);
      }

      window.scrollTo({ top: 400, behavior: "smooth" });
    },
    [
      API_BATCH_SIZE,
      ITEMS_PER_PAGE,
      MAX_BATCHES,
      fetchBatch,
      loadedBatches,
      totalPages,
    ],
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = newsItems.slice(startIndex, endIndex);

  return {
    currentPage,
    newsItems: paginatedItems,
    totalPages,
    isLoading,
    error,
    goToPage,
    retry,
  };
};
