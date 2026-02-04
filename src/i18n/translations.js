import globalTranslations from "./locales/global.json";
import homeTranslations from "./locales/home.json";
import companyProfileTranslations from "./locales/companyProfile.json";
import sectorsTranslations from "./locales/sectors.json";
import { sectorDetailTranslations } from "./locales/sectorDetail";
import newsTranslations from "./locales/news.json";
import financialNewsTranslations from "./locales/financialNews.json";
import contactTranslations from "./locales/contact.json";
import modalFormTranslations from "./locales/modalForm.json";

export const translations = {
  en: {
    ...globalTranslations.en,
    home: homeTranslations.en,
    companyProfile: companyProfileTranslations.en,
    sectors: sectorsTranslations.en,
    sectorDetail: sectorDetailTranslations.en,
    news: newsTranslations.en,
    financialNews: financialNewsTranslations.en,
    contact: contactTranslations.en,
    modalForm: modalFormTranslations.en,
  },
  he: {
    ...globalTranslations.he,
    home: homeTranslations.he,
    companyProfile: companyProfileTranslations.he,
    sectors: sectorsTranslations.he,
    sectorDetail: sectorDetailTranslations.he,
    news: newsTranslations.he,
    financialNews: financialNewsTranslations.he,
    contact: contactTranslations.he,
    modalForm: modalFormTranslations.he,
  },
};
