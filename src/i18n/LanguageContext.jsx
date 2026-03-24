
import { createContext, useEffect } from "react";
import { translations } from "./translations";
import { setDocumentMetadata } from "../utils/helpers/dom";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const isRtl = true;
  const language = "he";

  useEffect(() => {
    setDocumentMetadata(isRtl, language);
  }, []);

  const t = translations;

  return (
    <LanguageContext.Provider value={{ language, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
