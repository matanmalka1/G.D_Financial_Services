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

export const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const readCachedContent = () => {
    try {
      const raw = window?.localStorage?.getItem(STORAGE_KEYS.CONTENT);
      return raw ? JSON.parse(raw) : null;
    } catch (storageError) {
      console.warn("Failed to read cached content", storageError);
      return null;
    }
  };

  const writeCachedContent = (payload) => {
    try {
      window?.localStorage?.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(payload));
    } catch (storageError) {
      console.warn("Failed to write cached content", storageError);
    }
  };

  const fetchContent = useCallback(async () => {
    try {
      const [nextArticles, nextSectors] = await Promise.all([
        contentService.getArticles(),
        contentService.getSectors(),
      ]);
      setArticles(nextArticles);
      setSectors(nextSectors);

      const cached = readCachedContent();
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

      const stored = readCachedContent();
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

        const cached = readCachedContent();
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

  const searchArticles = contentService.filterArticles;

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
      getSectorById,
      getRelatedArticles,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
