import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App";
import { ContentProvider } from "./context/ContentContext";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { SiteContentProvider } from "./context/SiteContentContext";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

createRoot(rootElement).render(
  <StrictMode>
    <Toaster richColors position="top-right" closeButton />
    <ErrorBoundary>
      <SiteContentProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </SiteContentProvider>
    </ErrorBoundary>
  </StrictMode>,
);
