"use client"

import { Bug } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <header>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div 
                  className="flex items-center"
                >
                  <Link href="/" className="text-xl font-bold text-foreground">
                  <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <Bug className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>

                {/* <div
                  className="hidden sm:flex items-center space-x-8"
                >
                  <Link href="/merge" className="text-foreground/80 hover:text-foreground transition-colors">
                    Merge PDFs
                  </Link>
                  <Link href="/split" className="text-foreground/80 hover:text-foreground transition-colors">
                    Split PDF
                  </Link>
                  <Link href="/compress" className="text-foreground/80 hover:text-foreground transition-colors">
                    Compress PDF
                  </Link>
                </div> */}
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
