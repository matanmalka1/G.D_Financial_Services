import { mockArticles, sectors } from "../data/mockData";
import { sectorKeywords } from "../constants/sectorKeywords";

const relatedArticlesCache = new Map();

export const contentService = {
  getArticles: () => Promise.resolve(mockArticles.slice()),
  getSectors: () => Promise.resolve(sectors.slice()),
  filterArticles: (query = "") => {
    if (!query.trim()) return mockArticles.slice();
    const normalized = query.toLowerCase();
    return mockArticles.filter((article) => {
      const haystack = `${article.title.en} ${article.title.he} ${article.excerpt.en} ${article.excerpt.he}`;
      return haystack.toLowerCase().includes(normalized);
    });
  },
  getSectorById: (id) => sectors.find((sector) => sector.id === id) || null,
  getRelatedArticles: (sectorId) => {
    if (relatedArticlesCache.has(sectorId)) {
      return relatedArticlesCache.get(sectorId);
    }

    const keywords = sectorKeywords[sectorId];
    if (!keywords) return [];

    const results = mockArticles.filter((article) => {
      const haystack =
        `${article.title.en} ${article.title.he} ${article.excerpt.en} ${article.excerpt.he}`.toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
    });

    relatedArticlesCache.set(sectorId, results);
    return results;
  },
};
