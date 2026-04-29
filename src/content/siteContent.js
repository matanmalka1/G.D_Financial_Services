import globalTranslations from "./locales/global.json";
import homeTranslations from "./locales/home.json";
import { sectorDetailContent } from "./sectorDetailContent";
import newsTranslations from "./locales/news.json";
import contactTranslations from "./locales/contact.json";
import modalFormTranslations from "./locales/modalForm.json";

export const siteContent = {
  ...globalTranslations,
  home: homeTranslations,
  sectorDetail: sectorDetailContent,
  news: newsTranslations,
  contact: contactTranslations,
  modalForm: modalFormTranslations,
};
