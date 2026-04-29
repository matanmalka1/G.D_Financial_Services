import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { routePaths } from "./routes/paths";
import { Home } from "./pages/Home";
import { SectorDetail } from "./pages/SectorDetail";
import { News } from "./pages/News";
import { Article } from "./pages/Article";
import { Contact } from "./pages/Contact";
import { ContentAdmin } from "./pages/admin/content-admin";

export const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.sectorDetail} element={<SectorDetail />} />
        <Route path={routePaths.news} element={<News />} />
        <Route path={routePaths.newsDetail} element={<Article />} />
        <Route path={routePaths.contact} element={<Contact />} />
        <Route path={routePaths.contentAdmin} element={<ContentAdmin />} />
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
      </Routes>
    </Layout>
  </Router>
);
