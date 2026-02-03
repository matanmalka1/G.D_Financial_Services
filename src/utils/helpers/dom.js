export const setDocumentDirection = (isRtl) => {
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
};

export const setDocumentLanguage = (lang) => {
  document.documentElement.lang = lang;
};

export const setDocumentMetadata = (isRtl, lang) => {
  setDocumentDirection(isRtl);
  setDocumentLanguage(lang);
};
