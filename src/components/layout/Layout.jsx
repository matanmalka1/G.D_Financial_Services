import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "../common/ScrollToTop";
import { LeadCaptureModal } from "../ui/LeadCaptureModal";
import { submitContactForm } from "../../services/contactService.js";
import { routePaths } from "../../routes/paths.js";
import { useSiteContent } from "../../hooks/useSiteContent.js";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const { t } = useSiteContent();
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    if (pathname === routePaths.contentAdmin) {
      setLeadModalOpen(false);
      return;
    }

    const timer = setTimeout(() => setLeadModalOpen(true), 10000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLeadClose = () => {
    setLeadModalOpen(false);
  };

  const handleLeadSubmit = async (data) => {
    try {
      await submitContactForm(data, "Lead Capture Modal - G.D Financial Services");
      toast.success(t.modalForm.success);
      setLeadModalOpen(false);
    } catch (error) {
      console.warn("Lead form submission failed:", error);
      toast.error(t.modalForm.submitError);
      throw error;
    }
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
