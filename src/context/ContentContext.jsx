import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { contentService } from "../services/contentService";
import { STORAGE_KEYS } from "../constants";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const { getItem, setItem } = useLocalStorage();
  const [articles, setArticles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    try {
      const [nextArticles, nextSectors] = await Promise.all([
        contentService.getArticles(),
        contentService.getSectors(),
      ]);
      setArticles(nextArticles);
      setSectors(nextSectors);

      const cached = getItem(STORAGE_KEYS.CONTENT);
      const isFresh =
        !cached ||
        JSON.stringify(cached.articles) !== JSON.stringify(nextArticles) ||
        JSON.stringify(cached.sectors) !== JSON.stringify(nextSectors);

      if (isFresh) {
        setItem(STORAGE_KEYS.CONTENT, {
          articles: nextArticles,
          sectors: nextSectors,
        });
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
      setError(error?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (!isMounted) return;

      const stored = getItem(STORAGE_KEYS.CONTENT);
      if (stored) {
        setArticles(stored?.articles ?? []);
        setSectors(stored?.sectors ?? []);
        setLoading(false);
      }

      try {
        const [nextArticles, nextSectors] = await Promise.all([
          contentService.getArticles(),
          contentService.getSectors(),
        ]);
        if (!isMounted) return;

        setArticles(nextArticles);
        setSectors(nextSectors);

        const cached = getFromStorage(STORAGE_KEYS.CONTENT);
        const isFresh =
          !cached ||
          JSON.stringify(cached.articles) !== JSON.stringify(nextArticles) ||
          JSON.stringify(cached.sectors) !== JSON.stringify(nextSectors);

        if (isFresh) {
          setToStorage(STORAGE_KEYS.CONTENT, {
            articles: nextArticles,
            sectors: nextSectors,
          });
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
        if (isMounted) {
          setError(
            "We couldn't refresh the latest content. Showing saved data if available.",
          );
          toast.error("Unable to refresh content. Showing cached data.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    await fetchContent();
  }, [fetchContent]);

  const featuredArticles = useMemo(() => articles.slice(0, 4), [articles]);

  const searchArticles = useCallback(
    (query) => contentService.filterArticles(query),
    [],
  );

  const getSectorById = useCallback(
    (id) => sectors.find((sector) => sector.id === id) || null,
    [sectors],
  );

  const getRelatedArticles = useCallback(
    (sectorId) => contentService.getRelatedArticles(sectorId),
    [],
  );

  const value = useMemo(
    () => ({
      articles,
      sectors,
      loading,
      error,
      featuredArticles,
      getSectorById,
      searchArticles,
      getRelatedArticles,
      refreshContent,
    }),
    [
      articles,
      sectors,
      loading,
      error,
      featuredArticles,
      refreshContent,
      searchArticles,
      getSectorById,
      getRelatedArticles,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
