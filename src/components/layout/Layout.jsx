import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "../common/ScrollToTop";
import { LeadCaptureModal } from "../ui/LeadCaptureModal";

export const Layout = ({ children }) => {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLeadModalOpen(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  const handleLeadClose = () => setLeadModalOpen(false);
  const handleLeadSubmit = (data) => {
    // Hook up to backend/analytics as needed
    console.log("lead modal submission", data);
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
