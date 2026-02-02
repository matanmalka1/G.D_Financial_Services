import { useLanguage } from "../hooks/useLanguage";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { translations } from "../i18n/translations";

const CompanyProfile = () => {
  const { t } = useLanguage();

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
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=2000"
        title={translations.en.nav.profile}
      />

      <section className="py-24 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          {t.companyProfile.missionTitle}
        </h2>
        <p className="text-lg text-slate-600 leading-loose mb-12 text-center italic">
          "{t.companyProfile.missionStatement}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-8 border border-slate-100 rounded-2xl bg-slate-50 text-center shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-slate-900">
                {v.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-slate-600">
            <h2 className="text-2xl font-bold text-slate-900">
              {t.companyProfile.storyTitle}
            </h2>
            <p>{t.companyProfile.storyP1}</p>
            <p>{t.companyProfile.storyP2}</p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://picsum.photos/seed/company/600/400"
              className="rounded-2xl shadow-lg"
              alt="Company office"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompanyProfile;
