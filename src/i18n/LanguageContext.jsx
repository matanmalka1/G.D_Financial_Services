
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";
import { setDocumentMetadata } from "../utils/helpers/dom";
import { STORAGE_KEYS } from "../constants.js";
import {
  applyFlatOverrides,
  flattenStringLeaves,
} from "../utils/contentAdmin";

const LanguageContext = createContext();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const LanguageProvider = ({ children }) => {
  const isRtl = true;
  const language = "he";
  const [overrides, setOverrides] = useState({});
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setDocumentMetadata(isRtl, language);
  }, []);

  useEffect(() => {
    try {
      const savedOverrides = window.localStorage.getItem(
        STORAGE_KEYS.CONTENT_OVERRIDES,
      );
      const nextOverrides = savedOverrides ? JSON.parse(savedOverrides) : {};
      setOverrides(nextOverrides);
    } catch (error) {
      console.warn("Failed to hydrate translation overrides", error);
    }

    try {
      const savedSession = window.localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      setIsAdminAuthenticated(savedSession === "true");
    } catch (error) {
      console.warn("Failed to hydrate admin session", error);
    }
  }, []);

  const persistOverrides = useCallback((nextOverrides) => {
    setOverrides(nextOverrides);

    try {
      window.localStorage.setItem(
        STORAGE_KEYS.CONTENT_OVERRIDES,
        JSON.stringify(nextOverrides),
      );
    } catch (error) {
      console.warn("Failed to persist translation overrides", error);
    }
  }, []);

  const updateTranslation = useCallback(
    (path, value) => {
      const nextOverrides = {
        ...overrides,
        [path]: value,
      };
      persistOverrides(nextOverrides);
    },
    [overrides, persistOverrides],
  );

  const resetTranslation = useCallback(
    (path) => {
      const nextOverrides = { ...overrides };
      delete nextOverrides[path];
      persistOverrides(nextOverrides);
    },
    [overrides, persistOverrides],
  );

  const resetAllTranslations = useCallback(() => {
    persistOverrides({});
  }, [persistOverrides]);

  const authenticateAdmin = useCallback((password) => {
    const isAllowed = !ADMIN_PASSWORD || password === ADMIN_PASSWORD;
    if (!isAllowed) {
      return false;
    }

    setIsAdminAuthenticated(true);

    try {
      window.localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "true");
    } catch (error) {
      console.warn("Failed to persist admin session", error);
    }

    return true;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);

    try {
      window.localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch (error) {
      console.warn("Failed to clear admin session", error);
    }
  }, []);

  const adminEntries = useMemo(
    () => flattenStringLeaves(translations),
    [],
  );

  const t = useMemo(
    () => applyFlatOverrides(translations, overrides),
    [overrides],
  );

  const value = useMemo(
    () => ({
      language,
      t,
      isRtl,
      adminEntries,
      adminOverrides: overrides,
      isAdminAuthenticated,
      authenticateAdmin,
      logoutAdmin,
      updateTranslation,
      resetTranslation,
      resetAllTranslations,
    }),
    [
      adminEntries,
      authenticateAdmin,
      isAdminAuthenticated,
      isRtl,
      language,
      logoutAdmin,
      overrides,
      resetAllTranslations,
      resetTranslation,
      t,
      updateTranslation,
    ],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export { LanguageContext };
