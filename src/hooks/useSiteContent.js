import { useContext } from "react";
import { SiteContentContext } from "../context/SiteContentContext";

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
};
