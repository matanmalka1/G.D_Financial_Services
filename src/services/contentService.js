import { mockArticles, sectors } from "../data/mockData";
import { sectorKeywords } from "../constants.js";

export const getArticleSearchValues = (article) => [
  article.title?.en,
  article.title?.he,
  article.excerpt?.en,
  article.excerpt?.he,
  article.content?.en?.join(" "),
  article.content?.he?.join(" "),
];

export const getRelatedArticlesForSector = (articles, sectorId) => {
  const keywords = sectorKeywords[sectorId];
  if (!keywords) {
    return [];
  }

  return articles.filter((article) => {
    const haystack = getArticleSearchValues(article).join(" ").toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
  });
};

export const contentService = {
  getArticles: () => Promise.resolve(mockArticles.slice()),
  getSectors: () => Promise.resolve(sectors.slice()),
};
