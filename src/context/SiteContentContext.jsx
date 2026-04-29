import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { siteContent } from "../content/siteContent";
import { STORAGE_KEYS } from "../constants.js";
import { applyFlatOverrides, flattenStringLeaves } from "../utils/contentAdmin";
import { setDocumentMetadata } from "../utils/helpers/dom";

const SiteContentContext = createContext();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim();
const IS_ADMIN_ENABLED = Boolean(ADMIN_PASSWORD) || import.meta.env.DEV;
const SITE_LANGUAGE = "he";
const IS_RTL = true;

export const SiteContentProvider = ({ children }) => {
  const [overrides, setOverrides] = useState({});
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setDocumentMetadata(IS_RTL, SITE_LANGUAGE);
  }, []);

  useEffect(() => {
    try {
      const savedOverrides = window.localStorage.getItem(
        STORAGE_KEYS.CONTENT_OVERRIDES,
      );
      setOverrides(savedOverrides ? JSON.parse(savedOverrides) : {});
    } catch (error) {
      console.warn("Failed to hydrate content overrides", error);
    }

    try {
      const savedSession = window.localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      setIsAdminAuthenticated(IS_ADMIN_ENABLED && savedSession === "true");
    } catch (error) {
      console.warn("Failed to hydrate admin session", error);
    }
  }, []);

  const persistOverrides = useCallback((updater) => {
    setOverrides((currentOverrides) => {
      const nextOverrides =
        typeof updater === "function" ? updater(currentOverrides) : updater;

      try {
        window.localStorage.setItem(
          STORAGE_KEYS.CONTENT_OVERRIDES,
          JSON.stringify(nextOverrides),
        );
      } catch (error) {
        console.warn("Failed to persist content overrides", error);
      }

      return nextOverrides;
    });
  }, []);

  const updateContentEntry = useCallback(
    (path, value) => {
      persistOverrides((currentOverrides) => ({
        ...currentOverrides,
        [path]: value,
      }));
    },
    [persistOverrides],
  );

  const resetContentEntry = useCallback(
    (path) => {
      persistOverrides((currentOverrides) => {
        const nextOverrides = { ...currentOverrides };
        delete nextOverrides[path];
        return nextOverrides;
      });
    },
    [persistOverrides],
  );

  const resetAllContent = useCallback(() => {
    persistOverrides({});
  }, [persistOverrides]);

  const authenticateAdmin = useCallback((password) => {
    const isAllowed = ADMIN_PASSWORD ? password === ADMIN_PASSWORD : import.meta.env.DEV;
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

  const adminEntries = useMemo(() => flattenStringLeaves(siteContent), []);
  const t = useMemo(() => applyFlatOverrides(siteContent, overrides), [overrides]);

  const value = useMemo(
    () => ({
      t,
      isRtl: IS_RTL,
      adminEntries,
      adminOverrides: overrides,
      isAdminEnabled: IS_ADMIN_ENABLED,
      isAdminAuthenticated,
      authenticateAdmin,
      logoutAdmin,
      updateContentEntry,
      resetContentEntry,
      resetAllContent,
    }),
    [
      adminEntries,
      authenticateAdmin,
      isAdminAuthenticated,
      logoutAdmin,
      overrides,
      resetAllContent,
      resetContentEntry,
      t,
      updateContentEntry,
    ],
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
};

export { SiteContentContext };
