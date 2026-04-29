import { routePaths, routes } from "../../../routes/paths";
import {
  PAGE_META,
  SECTION_LABELS,
  SEGMENT_LABELS,
} from "./config";

export const getPageKey = (path) => {
  if (path.startsWith("home.")) return "home";
  if (path.startsWith("sectors.") || path.startsWith("sectorDetail.")) return "services";
  if (path.startsWith("news.")) return "news";
  if (path.startsWith("contact.") || path.startsWith("modalForm.")) return "contact";
  if (
    path.startsWith("footer.") ||
    path.startsWith("nav.") ||
    path.startsWith("global.")
  ) {
    return "global";
  }

  return "all";
};

export const getItemHref = (path) => {
  if (path.startsWith("sectorDetail.sectorDetails.")) {
    const sectorId = path.split(".")[2];
    return routes.sectorDetail(sectorId);
  }
  if (path.startsWith("sectors.") || path.startsWith("sectorDetail.")) {
    return routes.sectorDetail("business-plan");
  }
  if (path.startsWith("news.")) return routePaths.news;
  if (path.startsWith("contact.") || path.startsWith("modalForm.")) {
    return routePaths.contact;
  }
  return routePaths.home;
};

export const getSectionMeta = (path) => {
  const parts = path.split(".");

  if (path.startsWith("sectors.")) {
    return {
      key: "sectors",
      ...SECTION_LABELS.sectors,
    };
  }

  const sectionKey = parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0];
  if (SECTION_LABELS[sectionKey]) {
    return { key: sectionKey, ...SECTION_LABELS[sectionKey] };
  }

  if (SECTION_LABELS[parts[0]]) {
    return { key: parts[0], ...SECTION_LABELS[parts[0]] };
  }

  return {
    key: sectionKey,
    label: "אזור תוכן נוסף",
    description: "אזור כללי של תוכן באתר.",
  };
};

export const inferInputType = (path, value) => {
  if (path.endsWith(".icon")) return "input";
  if (path.toLowerCase().includes("placeholder")) return "input";
  if (typeof value === "string" && value.length <= 70 && !value.includes("\n")) {
    return "input";
  }
  return "textarea";
};

export const inferMaxLength = (path, value) => {
  if (path.endsWith(".icon")) return 4;
  if (path.toLowerCase().includes("placeholder")) return 45;
  if (/title|label|submit|contact|view|back|clear/i.test(path)) return 80;
  if (typeof value === "string" && value.length <= 80) return 90;
  return 400;
};

export const getFieldHelpText = (path) => {
  if (path.endsWith(".icon")) {
    return "האייקון שמופיע לצד הטקסט. מומלץ להשאיר קצר מאוד.";
  }

  if (path.includes(".q")) {
    return "השאלה שהלקוח רואה באתר.";
  }

  if (path.includes(".a")) {
    return "התשובה שמופיעה מתחת לשאלה באתר.";
  }

  if (path.includes(".placeholder")) {
    return "טקסט עזר שמופיע בתוך שדה לפני שמקלידים.";
  }

  if (path.includes(".submit") || path.includes(".contact") || path.includes(".view")) {
    return "הכיתוב שמופיע על כפתור או קישור באתר.";
  }

  if (path.includes(".success") || path.includes(".error") || path.includes(".sending")) {
    return "הודעת מערכת שהמבקר רואה בזמן פעולה או אחריה.";
  }

  return "הטקסט הזה מוצג ללקוחות באתר. מומלץ לשמור על ניסוח ברור וקצר.";
};

const getArrayBasedLabel = (parts) => {
  if (parts.includes("faq") && parts.includes("items")) {
    const itemIndex = Number(parts[parts.indexOf("items") + 1]) + 1;
    const last = parts.at(-1);
    if (last === "q") return `שאלה ${itemIndex}`;
    if (last === "a") return `תשובה ${itemIndex}`;
  }

  if (parts.includes("highlights")) {
    const itemIndex = Number(parts.at(-1)) + 1;
    return `נקודה מרכזית ${itemIndex}`;
  }

  if (parts.includes("body")) {
    const bodyIndex = Number(parts.at(-1));
    if (!Number.isNaN(bodyIndex)) {
      const sectionIndex = parts.includes("sections")
        ? Number(parts[parts.indexOf("sections") + 1]) + 1
        : null;

      return sectionIndex
        ? `פסקה ${bodyIndex + 1} במקטע ${sectionIndex}`
        : `פסקה ${bodyIndex + 1}`;
    }
  }

  if (parts.includes("bubbles")) {
    const bubbleIndex = Number(parts[parts.indexOf("bubbles") + 1]) + 1;
    const last = parts.at(-1);
    if (last === "title") return `כותרת בועה ${bubbleIndex}`;
    if (last === "description") return `תיאור בועה ${bubbleIndex}`;
    if (last === "icon") return `אייקון בועה ${bubbleIndex}`;
  }

  if (parts.includes("sections")) {
    const sectionIndex = Number(parts[parts.indexOf("sections") + 1]) + 1;
    const last = parts.at(-1);
    if (last === "title") return `כותרת מקטע ${sectionIndex}`;
  }

  if (parts.includes("services")) {
    const itemIndex = Number(parts.at(-1)) + 1;
    if (!Number.isNaN(itemIndex - 1)) {
      return `שירות ${itemIndex}`;
    }
  }

  if (parts.includes("benefits")) {
    const itemIndex = Number(parts.at(-1)) + 1;
    if (!Number.isNaN(itemIndex - 1)) {
      return `יתרון ${itemIndex}`;
    }
  }

  if (parts.includes("sectors")) {
    const itemIndex = Number(parts[parts.indexOf("sectors") + 1]) + 1;
    if (parts.at(-1) === "label") {
      return `שם תחום ${itemIndex}`;
    }
  }

  return null;
};

export const getFieldLabel = (path) => {
  const parts = path.split(".");
  const arrayBasedLabel = getArrayBasedLabel(parts);

  if (arrayBasedLabel) {
    return arrayBasedLabel;
  }

  const last = parts.at(-1);
  return SEGMENT_LABELS[last] ?? "טקסט";
};

export const getFocusArea = (path, value) => {
  if (/submit|contact|view|back|clear|read/i.test(path)) {
    return "buttons";
  }

  if (
    /contact|modalForm|placeholder|success|error|sending|fullName|email|phone|message|service/i.test(
      path,
    )
  ) {
    return "forms";
  }

  if (/faq|highlights|services|benefits|body\.\d+|bubbles\.\d+|sections\.\d+/i.test(path)) {
    return "lists";
  }

  if (/title|subtitle|missionTitle|coreValuesTitle|storyTitle|bubbleTitle/i.test(path)) {
    return "headlines";
  }

  if (typeof value === "string" && (value.length > 120 || value.includes("\n"))) {
    return "longText";
  }

  return "all";
};

export const getCharacterTone = (valueLength, maxLength) => {
  if (!maxLength) return "text-slate-400";
  if (valueLength > maxLength) return "text-rose-600";
  if (valueLength >= maxLength * 0.85) return "text-amber-600";
  return "text-slate-400";
};

export const buildAdminEntry = (item) => {
  const pageKey = getPageKey(item.path);
  const pageMeta = PAGE_META[pageKey] ?? PAGE_META.home;
  const sectionMeta = getSectionMeta(item.path);

  return {
    ...item,
    pageKey,
    pageLabel: pageMeta.label,
    href: getItemHref(item.path) ?? pageMeta.href,
    sectionKey: sectionMeta.key,
    sectionLabel: sectionMeta.label,
    sectionDescription: sectionMeta.description,
    label: getFieldLabel(item.path),
    helpText: getFieldHelpText(item.path),
    inputType: inferInputType(item.path, item.value),
    maxLength: inferMaxLength(item.path, item.value),
    focusArea: getFocusArea(item.path, item.value),
  };
};
