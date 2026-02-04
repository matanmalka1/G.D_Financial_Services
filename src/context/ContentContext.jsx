import { createContext } from "react";
import { useContentData } from "../hooks/useContentData";

export const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const value = useContentData();

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
