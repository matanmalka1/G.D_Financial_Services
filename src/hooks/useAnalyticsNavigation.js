import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../services/analyticsService";

export const useAnalyticsNavigation = () => {
  const navigate = useNavigate();

  return useCallback(
    (path, eventName, eventData) => {
      analyticsService.trackEvent(eventName, eventData);
      navigate(path);
    },
    [navigate],
  );
};
