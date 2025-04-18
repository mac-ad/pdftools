"use client"

import { Bug, Heart, MessageSquarePlus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useGlobal } from "@/Context/GlobalContext";
import { Button } from "./ui/Button";

const Header = () => {

  const { setShowSuggestFeatureForm } = useGlobal();

  return (
    <header>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-row gap-4 items-center justify-between py-3 h-16">
                <div className="flex items-center gap-2">
                  <Link href="/" className="text-2xl font-bold text-foreground flex items-center gap-2">
                    
                    <img src="/favicon.ico" alt="PDF Toolbox" className="w-5 h-5" />
                    {/* <span className="text-sm font-medium">Yet Another PDF Tool</span> */}
                    <motion.div
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Bug className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </div>


                <Link href="https://forms.gle/amegaQbkFyGLv6tb9" target="_blank">
                  <Button 
                      variant="primary"
                      icon={<MessageSquarePlus className="w-4 h-4" />}
                      iconPosition="left"
                  >
                    Suggest feature
                  </Button>
                </Link>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
