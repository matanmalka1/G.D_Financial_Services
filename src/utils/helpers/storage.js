export const getFromStorage = (key) => {
  try {
    const item = window?.localStorage?.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(`Failed to read from storage: ${key}`, error);
    return null;
  }
};

export const setToStorage = (key, value) => {
  try {
    window?.localStorage?.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to write to storage: ${key}`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    window?.localStorage?.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from storage: ${key}`, error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    window?.localStorage?.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear storage', error);
    return false;
  }
};
