"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { CTASection } from "@/components/landing/CTASection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Security } from "@/components/landing/Security";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import BgDecorativeBalls from "@/components/landing/BgDecorativeBalls";
import Footer from "@/components/Footer";

export default function Home() {
  // Refs to spy on sections like a creepy neighbor
  const featuresRef = useRef(null);
  const securityRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);

  // Magic viewport detection (it's actually just math, but shhh...)
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-200px" });
  const isSecurityInView = useInView(securityRef, { once: true, margin: "-200px" });
  const isHowItWorksInView = useInView(howItWorksRef, { once: true, margin: "-200px" });

  const containerRef = useRef(null);

  return (
    <main className="bg-white dark:bg-black min-h-screen overflow-hidden">
      <div className="relative" ref={containerRef}>

        {/* Sprinkle some magic floating balls because why not? ✨ */}
        <BgDecorativeBalls />

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 relative"
        >
         
          {/* Hero section - where dreams come true (or at least PDFs get fixed) */}
          <motion.div 
            className="mb-30"
          >
            <HeroSection />
          </motion.div>

          {/* Features that'll knock your socks off (please keep your socks on) */}
          <motion.div 
            ref={featuresRef} 
            className="mb-48"
            transition={{ duration: 0.2 }}
          >
            <Features isFeaturesInView={isFeaturesInView} />
          </motion.div>
          
          {/* Security so tight, even we can't break in (not that we've tried... much) */}
          <motion.div 
            ref={securityRef} 
            className="mb-48"
            transition={{ duration: 0.2 }}
          >
            <Security isSecurityInView={isSecurityInView} />
          </motion.div>
        
          {/* How It Works - Because apparently three steps is too many for some people */}
          <motion.div 
            ref={howItWorksRef} 
            className="mb-48"
            transition={{ duration: 0.2 }}
          >
            <HowItWorks isHowItWorksInView={isHowItWorksInView} />
          </motion.div>

          {/* CTA that floats like a butterfly, converts like a... well, we're working on it */}
          <motion.div 
            ref={ctaRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              scale: {
                duration: 0.2
              }
            }}
            className="mb-48"
          >
            <CTASection
              title="Get Started — Because You Clearly Need Another PDF Tool"
              description="No registration, no hidden fees, just another PDF tool in the sea of PDF tools. We're not special, but hey, we're here!"
              buttonText="Click Here (You Know You Want To)"
            />
          </motion.div>

          {/* The footer - where dreams go to die (just kidding, they just take a nap) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
