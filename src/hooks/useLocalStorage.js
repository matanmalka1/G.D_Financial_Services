import { useCallback } from "react";

export const useLocalStorage = () => {
  const getItem = useCallback((key) => {
    try {
      const item = window?.localStorage?.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Failed to read from storage: ${key}`, error);
      return null;
    }
  }, []);

  const setItem = useCallback((key, value) => {
    try {
      window?.localStorage?.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to write to storage: ${key}`, error);
      return false;
    }
  }, []);

  const removeItem = useCallback((key) => {
    try {
      window?.localStorage?.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove from storage: ${key}`, error);
      return false;
    }
  }, []);

  const clear = useCallback(() => {
    try {
      window?.localStorage?.clear();
      return true;
    } catch (error) {
      console.warn("Failed to clear storage", error);
      return false;
    }
  }, []);

  return { getItem, setItem, removeItem, clear };
};
