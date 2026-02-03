import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ParallaxHeader } from '../components/common/ParallaxHeader';
import { routePaths } from '../routes/paths';
import { FeatureBubble } from '../components/ui/FeatureBubble';
import { OwnerSpotlight } from '../components/ui/OwnerSpotlight';
import { analyticsService } from '../services/analyticsService';
import { Button } from '../components/ui/primitives/Button';
import { translations } from '../i18n/translations';
import { ClientsSection } from '../components/sections/ClientsSection';

const Home = () => {
  const { t, isRtl } = useLanguage();
  const navigate = useNavigate();

  const bubbles = [
    { title: t.home.bubbles.exitStrategy, icon: '🎯' },
    { title: t.home.bubbles.businessConsulting, icon: '💼' },
    { title: t.home.bubbles.businessPlans, icon: '📋' },
    { title: t.home.bubbles.investorPresentations, icon: '📈' },
  ];
  const handleContact = () => {
    analyticsService.trackEvent('owner_contact_click', { source: 'home' });
    navigate(routePaths.contact);
  };
  const handleBubbleClick = (title) => {
    analyticsService.trackEvent('home_bubble_click', { title });
  };

  return (
    <main className="relative">
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
        title={translations.en.home.hero.title}
        subtitle={translations.en.home.hero.subtitle}
        height="h-[75vh]"
      />

      {/* Bubbles Section */}
      <section className="relative -mt-16 md:-mt-24 z-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bubbles.map((bubble, idx) => (
            <FeatureBubble
              key={bubble.title + idx}
              icon={bubble.icon}
              title={bubble.title}
              onClick={() => handleBubbleClick(bubble.title)}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.home.about.title}</h2>
          <div className="w-20 h-1 bg-slate-900 mx-auto rounded-full" />
        </div>
        <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-justify">
          <p>{t.home.about.p1}</p>
          <p>{t.home.about.p2}</p>
          <p>{t.home.about.p3}</p>
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate(routePaths.companyProfile)}
            variant="ghost"
            className="px-8 py-3 bg-slate-100 text-slate-900 font-semibold rounded-full hover:bg-slate-200 transition-colors"
          >
            {t.home.about.moreInfo}
          </Button>
        </div>
      </section>

      <OwnerSpotlight
        title={t.home.owner.title}
        bio={t.home.owner.bio}
        buttonLabel={t.home.owner.contact}
        onContact={handleContact}
      />

      {/* Clients Section */}
      <ClientsSection />
    </main>
  );
};

export default Home;
