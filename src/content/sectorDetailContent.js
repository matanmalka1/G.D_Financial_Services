const modules = import.meta.glob("./locales/sector*.json", { eager: true });

let common = {};
let sectorCommon = { services: {}, benefits: {} };
const sectorDetails = {};

Object.entries(modules).forEach(([path, mod]) => {
  const data = mod.default || mod;
  if (path.includes("sectorDetailCommon")) {
    common = data;
    return;
  }
  if (path.includes("sectorCommon")) {
    sectorCommon = data;
    return;
  }
  Object.assign(sectorDetails, data);
});

const mergeCommonLists = (details) => {
  const servicesById = sectorCommon?.services || {};
  const benefitsById = sectorCommon?.benefits || {};

  Object.entries(details).forEach(([id, value]) => {
    if (!value || typeof value !== "object") return;
    if (servicesById[id]) value.services = servicesById[id];
    if (benefitsById[id]) value.benefits = benefitsById[id];
  });

  return details;
};

export const sectorDetailContent = {
  ...common,
  sectorDetails: mergeCommonLists(sectorDetails),
};
