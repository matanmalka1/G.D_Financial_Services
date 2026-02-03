import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "../common/ScrollToTop";

export const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white selection:bg-slate-900 selection:text-white">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);
