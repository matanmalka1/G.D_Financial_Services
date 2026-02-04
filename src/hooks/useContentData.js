import { useCallback, useEffect, useMemo, useState } from "react";
import { contentService } from "../services/contentService";
import { STORAGE_KEYS } from "../constants.js";
import { toast } from "sonner";

const initialState = {
  articles: [],
  sectors: [],
  loading: true,
  error: null,
};

export const useContentData = () => {
  const [state, setState] = useState(initialState);

  const readCachedContent = useCallback(() => {
    try {
      const raw = window?.localStorage?.getItem(STORAGE_KEYS.CONTENT);
      return raw ? JSON.parse(raw) : null;
    } catch (storageError) {
      console.warn("Failed to read cached content", storageError);
      return null;
    }
  }, []);

  const writeCachedContent = useCallback((payload) => {
    try {
      window?.localStorage?.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(payload));
    } catch (storageError) {
      console.warn("Failed to write cached content", storageError);
    }
  }, []);

  const cacheIfFresh = useCallback(
    (nextArticles, nextSectors, cached) => {
      const isFresh =
        !cached ||
        JSON.stringify(cached.articles) !== JSON.stringify(nextArticles) ||
        JSON.stringify(cached.sectors) !== JSON.stringify(nextSectors);

      if (isFresh) {
        writeCachedContent({
          articles: nextArticles,
          sectors: nextSectors,
        });
      }
    },
    [writeCachedContent],
  );

  const hydrateFromCache = useCallback(() => {
    const cached = readCachedContent();
    if (cached) {
      setState((prev) => ({
        ...prev,
        ...cached,
        loading: false,
      }));
    }
    return cached;
  }, [readCachedContent]);

  const loadContent = useCallback(
    async ({ hydrateCache = true, showToastOnError = true } = {}) => {
      const cached = hydrateCache ? hydrateFromCache() : null;

      try {
        const [nextArticles, nextSectors] = await Promise.all([
          contentService.getArticles(),
          contentService.getSectors(),
        ]);

        setState({
          articles: nextArticles,
          sectors: nextSectors,
          loading: false,
          error: null,
        });

        cacheIfFresh(nextArticles, nextSectors, cached);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            "We couldn't refresh the latest content. Showing saved data if available.",
        }));
        if (showToastOnError) {
          toast.error("Unable to refresh content. Showing cached data.");
        }
      }
    },
    [cacheIfFresh, hydrateFromCache],
  );

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const refreshContent = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    await loadContent({ hydrateCache: false });
  }, [loadContent]);

  const featuredArticles = useMemo(
    () => state.articles.slice(0, 4),
    [state.articles],
  );

  const searchArticles = contentService.filterArticles;

  const getSectorById = useCallback(
    (id) => state.sectors.find((sector) => sector.id === id) || null,
    [state.sectors],
  );

  const getArticleById = useCallback(
    (id) => state.articles.find((article) => article.id === id) || null,
    [state.articles],
  );

  const getRelatedArticles = useCallback(
    (sectorId) => contentService.getRelatedArticles(sectorId),
    [],
  );

  return {
    ...state,
    featuredArticles,
    searchArticles,
    getSectorById,
    getArticleById,
    getRelatedArticles,
    refreshContent,
  };
};
