import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "../common/ScrollToTop";
import { LeadCaptureModal } from "../ui/LeadCaptureModal";
import { STORAGE_KEYS } from "../../constants.js";
import { submitContactForm } from "../../services/contactService.js";

export const Layout = ({ children }) => {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.LEAD_DISMISSED)) return;
    const timer = setTimeout(() => setLeadModalOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleLeadClose = () => {
    localStorage.setItem(STORAGE_KEYS.LEAD_DISMISSED, "1");
    setLeadModalOpen(false);
  };

  const handleLeadSubmit = async (data) => {
    localStorage.setItem(STORAGE_KEYS.LEAD_DISMISSED, "1");
    try {
      await submitContactForm(data, "Lead Capture Modal - G.D Financial Services");
    } catch (error) {
      console.warn("Lead form submission failed:", error);
    }
    setLeadModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-slate-900 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      <LeadCaptureModal
        open={leadModalOpen}
        onClose={handleLeadClose}
        onSubmit={handleLeadSubmit}
      />
    </div>
  );
};
