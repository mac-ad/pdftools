"use client"

import { Bug, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Header = () => {

  return (
    <header>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <Link href="/" className="text-2xl font-bold text-foreground flex items-center gap-2">
                    
                    <img src="/favicon.ico" alt="PDF Toolbox" className="w-5 h-5" />
                    <span className="text-sm font-medium">Yet Another PDF Tool</span>
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

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-6">
                  {/* <Link 
                    href="https://github.com/yourusername" 
                    target="_blank"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Star this useless repo</span>
                  </Link> */}

                  {/* <Link 
                    href="https://twitter.com/_macad"
                    target="_blank" 
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-sm"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Follow me on Twitter</span>
                  </Link> */}

                  {/* <Link
                    href="https://www.buymeacoffee.com/yourusername"
                    target="_blank"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 text-sm"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Buy me a coffee</span>
                  </Link> */}

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-red-500 flex items-center gap-1"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
