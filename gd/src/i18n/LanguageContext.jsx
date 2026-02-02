
import { createContext, useState, useEffect } from "react";
import { translations } from './translations';
import { setDocumentMetadata } from '../utils/helpers/dom';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../constants';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  const isRtl = language === LANGUAGES.HE;

  useEffect(() => {
    setDocumentMetadata(isRtl, language);
  }, [isRtl, language]);

  const setLanguage = (newLanguage) => {
    if (Object.values(LANGUAGES).includes(newLanguage)) {
      setLanguageState(newLanguage);
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
