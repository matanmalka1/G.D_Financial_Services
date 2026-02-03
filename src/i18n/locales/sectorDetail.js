const modules = import.meta.glob('./sector*.json', { eager: true });

let common = { en: {}, he: {} };
const sectorDetailsEn = {};
const sectorDetailsHe = {};

Object.entries(modules).forEach(([path, mod]) => {
  const data = mod.default || mod;
  if (path.includes('sectorDetailCommon')) {
    common = data;
    return;
  }
  // Merge sector-specific entries
  if (data.en) Object.assign(sectorDetailsEn, data.en);
  if (data.he) Object.assign(sectorDetailsHe, data.he);
});

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
