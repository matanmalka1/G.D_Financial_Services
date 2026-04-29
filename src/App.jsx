import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PageLoading } from "./components/common/LoadBoundary";
import { routePaths } from "./routes/paths";

const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const SectorDetail = lazy(() =>
  import("./pages/SectorDetail").then((module) => ({ default: module.SectorDetail })),
);
const News = lazy(() =>
  import("./pages/News").then((module) => ({ default: module.News })),
);
const Article = lazy(() =>
  import("./pages/Article").then((module) => ({ default: module.Article })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact })),
);
const ContentAdmin = lazy(() =>
  import("./pages/admin/content-admin").then((module) => ({
    default: module.ContentAdmin,
  })),
);

export const App = () => (
  <Router>
    <Layout>
      <Suspense fallback={<PageLoading count={3} />}>
        <Routes>
          <Route path={routePaths.home} element={<Home />} />
          <Route path={routePaths.sectorDetail} element={<SectorDetail />} />
          <Route path={routePaths.news} element={<News />} />
          <Route path={routePaths.newsDetail} element={<Article />} />
          <Route path={routePaths.contact} element={<Contact />} />
          <Route path={routePaths.contentAdmin} element={<ContentAdmin />} />
          <Route path="*" element={<Navigate to={routePaths.home} replace />} />
        </Routes>
      </Suspense>
    </Layout>
  </Router>
);
