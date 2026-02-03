
import { createContext, useState, useEffect } from "react";
import { translations } from "./translations";
import { setDocumentMetadata } from "../utils/helpers/dom";
import { LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEYS } from "../constants";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    return (
      window.localStorage.getItem(STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE
    );
  });

  const isRtl = language === LANGUAGES.HE;

  useEffect(() => {
    setDocumentMetadata(isRtl, language);
  }, [isRtl, language]);

  const setLanguage = (newLanguage) => {
    if (Object.values(LANGUAGES).includes(newLanguage)) {
      setLanguageState(newLanguage);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
