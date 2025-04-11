"use client"

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

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
    {children}
   </>
  )
}

export default Providers
