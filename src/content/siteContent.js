import globalTranslations from "./locales/global.json";
import homeTranslations from "./locales/home.json";
import companyProfileTranslations from "./locales/companyProfile.json";
import sectorsTranslations from "./locales/sectors.json";
import { sectorDetailContent } from "./sectorDetailContent";
import newsTranslations from "./locales/news.json";
import financialNewsTranslations from "./locales/financialNews.json";
import contactTranslations from "./locales/contact.json";
import modalFormTranslations from "./locales/modalForm.json";

export const siteContent = {
  ...globalTranslations,
  home: homeTranslations,
  companyProfile: companyProfileTranslations,
  sectors: sectorsTranslations,
  sectorDetail: sectorDetailContent,
  news: newsTranslations,
  financialNews: financialNewsTranslations,
  contact: contactTranslations,
  modalForm: modalFormTranslations,
};
