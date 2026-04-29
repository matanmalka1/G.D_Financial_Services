export const routePaths = {
  home: "/",
  sectorDetail: "/sectors/:id",
  news: "/news",
  newsDetail: "/news/:id",
  contact: "/contact",
  contentAdmin: "/admin/content",
};

// Helper builders to avoid manual string concatenation in components.
export const routes = {
  home: () => routePaths.home,
  sectorDetail: (id) => `/sectors/${id}`,
  news: () => routePaths.news,
  newsDetail: (id) => `/news/${id}`,
  contact: () => routePaths.contact,
  contentAdmin: () => routePaths.contentAdmin,
};
