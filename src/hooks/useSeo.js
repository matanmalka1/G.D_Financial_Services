import { useEffect } from "react";

const SITE_NAME = "G.D Financial Services";

const setMeta = (name, content, isProperty = false) => {
  if (!content) return;
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Sets document title and meta tags for SEO and Open Graph.
 * @param {object} params
 * @param {string} [params.title] - Page title (appended with site name)
 * @param {string} [params.description] - Meta description
 * @param {string} [params.ogImage] - OG image URL
 * @param {string} [params.ogUrl] - Canonical URL (defaults to current URL)
 */
export const useSeo = ({ title, description, ogImage, ogUrl } = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:url", ogUrl || window.location.href, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", SITE_NAME, true);
  }, [title, description, ogImage, ogUrl]);
};
