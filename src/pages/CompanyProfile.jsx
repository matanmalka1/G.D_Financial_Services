import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { routePaths } from "../routes/paths";
import { Button } from "../components/ui/primitives/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/primitives/Card";
import { ErrorState } from "../components/ui/ErrorState";

export const CompanyProfile = () => {
  const { t } = useLanguage();
  const { error, refreshContent } = useContent();

  useEffect(() => {
    if (error) {
      toast.error(t?.errors?.contentLoadFailed || "Unable to load content");
    }
  }, [error, t]);

  const values = [
    {
      title: t.companyProfile.integrity,
      desc: t.companyProfile.integrityDesc,
    },
    {
      title: t.companyProfile.reliability,
      desc: t.companyProfile.reliabilityDesc,
    },
    {
      title: t.companyProfile.professionalism,
      desc: t.companyProfile.professionalismDesc,
    },
  ];

  return (
    <main>
      {error ? (
        <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <ErrorState
            title={
              t?.errors?.contentLoadFailed || "Unable to load company profile"
            }
            message={error}
            actionLabel={t?.news?.retry || "Retry"}
            onAction={refreshContent}
          />
        </section>
      ) : null}
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=2000"
        title={t.nav.profile}
        align="center"
      />

      <section className="py-24 max-w-4xl mx-auto px-4">
        <SectionHeading title={t.companyProfile.missionTitle} />
        <p className="text-lg text-slate-600 leading-loose mb-12 text-center italic">
          "{t.companyProfile.missionStatement}"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {values.map((v, i) => (
            <Card key={i} className="p-8 bg-slate-50 text-center">
              <h3 className="text-xl font-bold mb-4 text-slate-900">
                {v.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
        {t.companyProfile.aboutText && (
          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div className="w-full flex justify-center md:justify-start order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80"
                alt="G.D Finance team collaboration"
                className="w-full max-w-md rounded-3xl shadow-lg border border-slate-100 object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3 text-center md:text-left order-1 md:order-2">
              {t.companyProfile.aboutSubtitle && (
                <h3 className="text-xl font-semibold text-slate-900">
                  {t.companyProfile.aboutSubtitle}
                </h3>
              )}
              <p className="text-base text-slate-600 leading-relaxed">
                {t.companyProfile.aboutText}
              </p>
              <div className="pt-4">
                <Link to={routePaths.contact} className="inline-block">
                  <Button size="lg" className="rounded-full">
                    {t.nav.contact}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-slate-600">
            <SectionHeading title={t.companyProfile.storyTitle} />
            <p>{t.companyProfile.storyP1}</p>
            <p>{t.companyProfile.storyP2}</p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://picsum.photos/seed/company/600/400"
              className="rounded-2xl shadow-lg"
              alt="Company office"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
