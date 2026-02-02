import { mockArticles, sectors } from '../data/mockData';

const sectorKeywords = {
  'business-presentations': ['presentation', 'pitch', 'investor', 'deck', 'מצגת', 'משקיעים'],
  'sell-side-advisory': ['sell-side', 'acquisition', 'exit', 'due diligence', 'מכירה', 'רכישה', 'אקזיט'],
  'business-consulting': ['consulting', 'strategy', 'growth', 'milestones', 'innovation', 'ייעוץ', 'אסטרטגיה', 'צמיחה'],
  'ongoing-financial-advisory': ['advisory', 'CFO', 'long-term', 'partner', 'budgeting', 'פיננסי', 'סמנכ"ל', 'תקצוב'],
};

const toLower = (value = '') => value.toLowerCase();
const contains = (value = '', query = '') => value.toLowerCase().includes(query.toLowerCase());

export const contentService = {
  getArticles: () => Promise.resolve(mockArticles.slice()),
  getSectors: () => Promise.resolve(sectors.slice()),
  filterArticles: (query = '') => {
    if (!query.trim()) return mockArticles.slice();
    const normalized = query.toLowerCase();
    return mockArticles.filter((article) => {
      const haystack = `${article.title.en} ${article.title.he} ${article.excerpt.en} ${article.excerpt.he}`;
      return haystack.toLowerCase().includes(normalized);
    });
  },
  getSectorById: (id) => sectors.find((sector) => sector.id === id) || null,
  getRelatedArticles: (sectorId) => {
    const keywords = sectorKeywords[sectorId];
    if (!keywords) return [];
    return mockArticles.filter((article) => {
      const haystack = `${article.title.en} ${article.title.he} ${article.excerpt.en} ${article.excerpt.he}`.toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
    });
  },
};
