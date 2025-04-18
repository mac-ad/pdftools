"use client"

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import MixpanelProvider from './MixpanelProvider';
import UserProvider from './UserProvider';

const Providers = ({children}: {children: React.JSX.Element}) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    handleRouteChange();
  }, [pathname]);


  return (
   <>
    <UserProvider> 
      <MixpanelProvider>
        {children}
      </MixpanelProvider>
    </UserProvider>
   </>
  )
}

export default Providers
