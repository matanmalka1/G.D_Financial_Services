export const routePaths = {
  home: "/",
  companyProfile: "/company-profile",
  sectors: "/sectors",
  sectorDetail: "/sectors/:id",
  news: "/news",
  newsDetail: "/news/:id",
  financialNews: "/financial-news",
  contact: "/contact",
};

// Helper builders to avoid manual string concatenation in components.
export const routes = {
  home: () => routePaths.home,
  companyProfile: () => routePaths.companyProfile,
  sectors: () => routePaths.sectors,
  sectorDetail: (id) => `/sectors/${id}`,
  news: () => routePaths.news,
  newsDetail: (id) => `/news/${id}`,
  financialNews: () => routePaths.financialNews,
  contact: () => routePaths.contact,
};
