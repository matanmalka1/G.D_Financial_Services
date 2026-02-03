import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { contentService } from "../services/contentService";
import { getFromStorage, setToStorage } from "../utils/helpers/storage";
import { STORAGE_KEYS } from "../constants";
import { toast } from "sonner";

export const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    setError(null);
    try {
      const [nextArticles, nextSectors] = await Promise.all([
        contentService.getArticles(),
        contentService.getSectors(),
      ]);
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
      setError("We couldn't refresh the latest content. Showing saved data if available.");
      toast.error("Unable to refresh content. Showing cached data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (!isMounted) return;

      // Hydrate from storage first
      const stored = getFromStorage(STORAGE_KEYS.CONTENT);
      if (stored) {
        setArticles(stored.articles || []);
        setSectors(stored.sectors || []);
        setLoading(false);
      }

      // Fetch fresh content
      await fetchContent();
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [fetchContent]);

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
      getSectorById: (id) => sectors.find((sector) => sector.id === id) || null,
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
      getRelatedArticles,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
