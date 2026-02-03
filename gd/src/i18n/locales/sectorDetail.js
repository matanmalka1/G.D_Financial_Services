import { sectorBusinessPresentations } from "./sectorBusinessPresentations";
import { sectorSellSide } from "./sectorSellSide";
import { sectorBusinessConsulting } from "./sectorBusinessConsulting";
import { sectorOngoingAdvisory } from "./sectorOngoingAdvisory";
import { sectorBusinessPlan } from "./sectorBusinessPlan";

const commonEn = {
  notFound: "Sector not found",
  backToSectors: "Back to Sectors",
  viewAllNews: "View All News",
  mainDescription:
    "At G.D Financial Services, our {sector} division focuses on delivering high-impact results through data-driven insights. We work closely with our clients to understand their unique constraints and opportunities, ensuring every recommendation is actionable and strategic.",
  aboutDescription:
    "Navigating the complexities of {sector} requires more than just standard templates; it demands a deep immersion into the business's core DNA. Our approach combines rigorous analytical methods with a creative touch, ensuring that every {sector} we lead stands out for its precision, relevance, and long-term value.",
  expertAnalysis: "Expert Analysis",
  customizedStrategy: "Customized Strategy",
  executiveSupport: "Executive Support",
};

const commonHe = {
  notFound: "מגזר לא נמצא",
  backToSectors: "חזור למגזרים",
  viewAllNews: "לכל המאמרים",
  mainDescription:
    "ב-G.D שירותים פיננסיים, חטיבת {sector} שלנו מתמקדת באספקת תוצאות בעלות השפעה גבוהה באמצעות תובנות מונחות נתונים. אנו עובדים בשיתוף פעולה הדוק עם לקוחותינו כדי להבין את המגבלות וההזדמנויות הייחודיות שלהם, ומבטיחים שכל המלצה תהיה ניתנת לביצוע ואסטרטגית.",
  aboutDescription:
    "ניווט במורכבויות של sector דורש יותר מסתם תבניות סטנדרטיות הוא דורש טבילה עמוקה ב-DNA המרכזי של העסק. הגישה שלנו משלבת שיטות אנליטיות קפדניות עם מגע יצירתי, ומבטיחה שכל {sector} שאנו מובילים יבלוט בזכות הדיוק, הרלוונטיות והערך לטווח הארוך שלו.",
  expertAnalysis: "ניתוח מומחה",
  customizedStrategy: "אסטרטגיה מותאמת",
  executiveSupport: "תמיכה ניהולית",
};

const sectorDetailsEn = {
  ...sectorBusinessPresentations.en,
  ...sectorSellSide.en,
  ...sectorBusinessConsulting.en,
  ...sectorOngoingAdvisory.en,
  ...sectorBusinessPlan.en,
};

const sectorDetailsHe = {
  ...sectorBusinessPresentations.he,
  ...sectorSellSide.he,
  ...sectorBusinessConsulting.he,
  ...sectorOngoingAdvisory.he,
  ...sectorBusinessPlan.he,
};

export const sectorDetailTranslations = {
  en: {
    ...commonEn,
    sectorDetails: sectorDetailsEn,
  },
  he: {
    ...commonHe,
    sectorDetails: sectorDetailsHe,
  },
};
