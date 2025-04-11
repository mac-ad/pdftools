import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="text-center space-y-6 max-w-4xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="overflow-hidden">
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground dark:text-foreground/90 text-center mx-auto"
          variants={item}
        >
          Yet Another{" "}
          <motion.span
            className="text-primary dark:text-primary/90 inline-block"
            variants={item}
          >
            PDF Toolkit
          </motion.span>
        </motion.h1>
      </motion.div>
      <motion.p 
        className="text-lg sm:text-xl text-secondary-light/90 dark:text-secondary-light/80 max-w-2xl mx-auto leading-relaxed"
        variants={item}
      >
        Because apparently the world needed another PDF tool. 
        Do all your PDF stuff here - merge, squish, twist them into submission. No signup required (shocking, we know).
      </motion.p>
      <motion.div
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-fit mx-auto"
      >
        <Link href="/merge"> 
          <Button 
            variant="primary"
            icon={<Zap className="w-4 h-4" />}
            iconPosition="left"
          >
            Lets merge some PDFs!
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}