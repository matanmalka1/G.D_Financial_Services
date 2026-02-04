import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { routePaths } from './routes/paths';
import { Home } from './pages/Home';
import { CompanyProfile } from './pages/CompanyProfile';
import { Sectors } from './pages/Sectors';
import { SectorDetail } from './pages/SectorDetail';
import { News } from './pages/News';
import { Article } from './pages/Article';
import { Contact } from './pages/Contact';

export const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.companyProfile} element={<CompanyProfile />} />
        <Route path={routePaths.sectors} element={<Sectors />} />
        <Route path={routePaths.sectorDetail} element={<SectorDetail />} />
        <Route path={routePaths.news} element={<News />} />
        <Route path={routePaths.newsDetail} element={<Article />} />
        <Route path={routePaths.contact} element={<Contact />} />
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
      </Routes>
    </Layout>
  </Router>
);
