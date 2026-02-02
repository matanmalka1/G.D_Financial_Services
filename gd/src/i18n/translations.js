import { globalTranslations } from "./locales/global";
import { homeTranslations } from "./locales/home";
import { companyProfileTranslations } from "./locales/companyProfile";
import { sectorsTranslations } from "./locales/sectors";
import { sectorDetailTranslations } from "./locales/sectorDetail";
import { newsTranslations } from "./locales/news";
import { contactTranslations } from "./locales/contact";

export const translations = {
  en: {
    ...globalTranslations.en,
    home: homeTranslations.en,
    companyProfile: companyProfileTranslations.en,
    sectors: sectorsTranslations.en,
    sectorDetail: sectorDetailTranslations.en,
    news: newsTranslations.en,
    contact: contactTranslations.en,
  },
  he: {
    ...globalTranslations.he,
    home: homeTranslations.he,
    companyProfile: companyProfileTranslations.he,
    sectors: sectorsTranslations.he,
    sectorDetail: sectorDetailTranslations.he,
    news: newsTranslations.he,
    contact: contactTranslations.he,
  },
};
