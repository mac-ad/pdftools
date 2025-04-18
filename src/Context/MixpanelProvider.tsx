"use client"

import mixpanel from 'mixpanel-browser';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserProvider';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();

    const [mixpanelInitialized, setMixpanelInitialized] = useState(false);
  
    useEffect(() => {
        if(!mixpanelInitialized){
            mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY as string, {
                debug: process.env.NODE_ENV === 'development',
                track_pageview: true,
                persistence: 'localStorage'
            });
            setMixpanelInitialized(true);
        }
    }, [mixpanelInitialized]);

    useEffect(() => {
        // Track page views on route changes
        const handleRouteChange = (url: string) => {
            try {
                mixpanel.track('page_view', {
                    url,
                    domain: process.env.NEXT_PUBLIC_DOMAIN
                });
            } catch (error) {
                console.error('Error tracking page view:', error);
            }
        };

        if(mixpanelInitialized && pathname){
            handleRouteChange(pathname);
        }
    }, [pathname, mixpanelInitialized]);
    

    useEffect(() => {
        try{
            if (user && mixpanelInitialized) {
                mixpanel.identify(user.name);
            }
        } catch (error) {
            console.error('Error identifying user in Mixpanel:', error);
        }
    }, [user, mixpanelInitialized]);


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