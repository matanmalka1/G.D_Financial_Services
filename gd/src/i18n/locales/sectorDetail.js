import common from "./sectorDetailCommon.json";
import sectorBusinessPresentations from "./sectorBusinessPresentations.json";
import sectorSellSide from "./sectorSellSide.json";
import sectorBusinessConsulting from "./sectorBusinessConsulting.json";
import sectorOngoingAdvisory from "./sectorOngoingAdvisory.json";
import sectorBusinessPlan from "./sectorBusinessPlan.json";

const sectorDetailsEn = {
  ...sectorBusinessPresentations.en,
  ...sectorSellSide.en,
  ...sectorBusinessConsulting.en,
  ...sectorOngoingAdvisory.en,
  ...sectorBusinessPlan.en,
};

const sectorDetailsHe = {
  ...sectorBusinessPresentations.he,
  ...sectorSellSide.he,
  ...sectorBusinessConsulting.he,
  ...sectorOngoingAdvisory.he,
  ...sectorBusinessPlan.he,
};

export const sectorDetailTranslations = {
  en: {
    ...common.en,
    sectorDetails: sectorDetailsEn,
  },
  he: {
    ...common.he,
    sectorDetails: sectorDetailsHe,
  },
};
