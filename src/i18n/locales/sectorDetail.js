const modules = import.meta.glob('./sector*.json', { eager: true });

let common = { en: {}, he: {} };
let sectorCommon = { en: { services: {}, benefits: {} }, he: { services: {}, benefits: {} } };
const sectorDetailsEn = {};
const sectorDetailsHe = {};

Object.entries(modules).forEach(([path, mod]) => {
  const data = mod.default || mod;
  if (path.includes('sectorDetailCommon')) {
    common = data;
    return;
  }
  if (path.includes('sectorCommon')) {
    sectorCommon = data;
    return;
  }
  // Merge sector-specific entries
  if (data.en) Object.assign(sectorDetailsEn, data.en);
  if (data.he) Object.assign(sectorDetailsHe, data.he);
});

const mergeCommonLists = (details, lang) => {
  const servicesById = sectorCommon?.[lang]?.services || {};
  const benefitsById = sectorCommon?.[lang]?.benefits || {};

  Object.entries(details).forEach(([id, value]) => {
    if (!value || typeof value !== 'object') return;
    if (servicesById[id]) value.services = servicesById[id];
    if (benefitsById[id]) value.benefits = benefitsById[id];
  });

  return details;
};

export const sectorDetailTranslations = {
  en: {
    ...common.en,
    sectorDetails: mergeCommonLists(sectorDetailsEn, 'en'),
  },
  he: {
    ...common.he,
    sectorDetails: mergeCommonLists(sectorDetailsHe, 'he'),
  },
};
