"use client"

import mixpanel from 'mixpanel-browser';
import { createContext, useContext, useEffect } from 'react';
import { useUser } from './UserProvider';

type MixpanelContextType = {
    sendEvent: (event: string, properties?: Record<string, any>) => void;
}

const MixpanelContext = createContext<MixpanelContextType | undefined>(undefined);

export const useMixpanel = () => {
  const context = useContext(MixpanelContext);
  if (!context) {
    throw new Error('useMixpanel must be used within a MixpanelProvider');
  }
  return context;
};

const MixpanelProvider = ({ children }: { children: React.ReactNode }) => {

    const {user} = useUser();
  
    useEffect(() => {
        mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY as string, {
            debug: process.env.NODE_ENV === 'development',
            track_pageview: true,
            persistence: 'localStorage'
        });
    }, []);

    useEffect(() => {
        if (user) {
            mixpanel.identify(user.name);
        }
    }, [user]);


    const sendEvent = (event: string, properties?: Record<string, any>) => {
        try{
            mixpanel.track(event, properties);
        } catch (error) {
            console.error('Error sending event to Mixpanel:', error);
        }
    }

    return (
        <MixpanelContext.Provider value={{sendEvent}}>
            {children}
        </MixpanelContext.Provider>
    );
};

export default MixpanelProvider;