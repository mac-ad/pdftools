"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import mixpanel from "mixpanel-browser";
import { MIXPANEL_EVENTS } from "@/constants/mixpanel";

interface GlobalContextType {
  showSuggestFeatureForm: boolean;
  setShowSuggestFeatureForm: (show: boolean) => void;
  trackEvent: (event: keyof typeof MIXPANEL_EVENTS, properties?: Record<string, any>) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [showSuggestFeatureForm, setShowSuggestFeatureForm] = useState(false);

  // Initialize mixpanel if key exists
  if (process.env.NEXT_PUBLIC_MIXPANEL_KEY) {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY);
  }

  const trackEvent = (event: keyof typeof MIXPANEL_EVENTS, properties?: Record<string, any>) => {
    if (process.env.NEXT_PUBLIC_MIXPANEL_KEY) {
      mixpanel.track(MIXPANEL_EVENTS[event], properties);
    }
  };

  return (
    <GlobalContext.Provider 
      value={{ 
        showSuggestFeatureForm, 
        setShowSuggestFeatureForm,
        trackEvent
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
