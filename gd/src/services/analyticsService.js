const sendToGtag = (eventName, payload) => {
  window.gtag('event', eventName, payload);
};

export const analyticsService = {
  trackEvent(eventName, payload = {}) {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      sendToGtag(eventName, payload);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
      return;
    }

    console.debug('Analytics event:', eventName, payload);
  },
};
