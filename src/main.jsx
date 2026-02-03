import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

createRoot(rootElement).render(
  <StrictMode>
    <Toaster richColors position="top-right" closeButton />
    <ErrorBoundary>
      <LanguageProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
);
