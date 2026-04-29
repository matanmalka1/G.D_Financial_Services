import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { useContent } from "../hooks/useContent";
import { routes } from "../routes/paths";
import { BusinessPlansPage } from "./sectors/BusinessPlansPage";
import { BusinessPresentationsPage } from "./sectors/BusinessPresentationsPage";
import { BusinessConsultingPage } from "./sectors/BusinessConsultingPage";
import { SellSideAdvisoryPage } from "./sectors/SellSideAdvisoryPage";
import {
  LoadBoundary,
  PageError,
  PageLoading,
} from "../components/common/LoadBoundary";
import { ITEMS_PER_PAGE } from "../constants.js";

const NotFound = ({ t }) => (
  <main className="min-h-screen bg-slate-50/30 px-4 py-24">
    <div className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {t.sectorDetail.notFound}
        </h2>
        <Link
          to={routes.sectorDetail("business-plan")}
          className="text-slate-600 underline hover:text-slate-900"
        >
          {t.sectorDetail.backToSectors}
        </Link>
      </div>
    </div>
  </main>
);

export const SectorDetail = () => {
  const { id } = useParams();
  const { t, isRtl } = useSiteContent();
  const { getSectorById, getRelatedArticles, error, refreshContent, loading } =
    useContent();

  const sector = getSectorById(id);
  const sectorTitle = sector ? t.nav[sector.titleKey] : "";

  useSeo({
    title: sectorTitle || t.nav.sectors,
    ogImage: sector?.image,
  });

  const relatedArticles = useMemo(() => {
    if (!id) return [];
    return getRelatedArticles(id).slice(0, ITEMS_PER_PAGE.RELATED_ARTICLES);
  }, [id, getRelatedArticles]);

  const page = (() => {
    if (!sector) return <NotFound t={t} />;

    const pageProps = { relatedArticles, t, isRtl };

    switch (sector.id) {
      case "business-plan":
        return <BusinessPlansPage {...pageProps} />;
      case "business-presentations":
        return <BusinessPresentationsPage {...pageProps} />;
      case "business-consulting":
        return <BusinessConsultingPage {...pageProps} />;
      case "sell-side-advisory":
        return <SellSideAdvisoryPage {...pageProps} />;
      default:
        return <NotFound t={t} />;
    }
  })();

  return (
    <LoadBoundary
      error={error}
      loading={loading}
      onRetry={refreshContent}
      errorFallback={
        <PageError
          title={t.sectorDetail.errorTitle || "Unable to load this sector"}
          message={t.sectorDetail.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onRetry={refreshContent}
        />
      }
      loadingFallback={<PageLoading count={3} />}
    >
      {page}
    </LoadBoundary>
  );
};
