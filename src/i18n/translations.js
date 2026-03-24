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
  ...globalTranslations,
  home: homeTranslations,
  companyProfile: companyProfileTranslations,
  sectors: sectorsTranslations,
  sectorDetail: sectorDetailTranslations,
  news: newsTranslations,
  financialNews: financialNewsTranslations,
  contact: contactTranslations,
  modalForm: modalFormTranslations,
};
