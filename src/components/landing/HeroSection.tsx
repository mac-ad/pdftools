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

  // const bounce = {
  //   initial: { y: 0 },
  //   animate: {
  //     y: [-5, 5],
  //     transition: {
  //       duration: 1.5,
  //       repeat: Infinity,
  //       repeatType: "reverse"
  //     }
  //   }
  // };

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
          Oh Look,{" "}
          <motion.span
            className="text-primary dark:text-primary/90 inline-block"
            variants={item}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            Yet Another
          </motion.span>{" "}
          PDF Tool! 🙄
        </motion.h1>
      </motion.div>
      <motion.p 
        className="text-lg sm:text-xl text-secondary-light/90 dark:text-secondary-light/80 max-w-2xl mx-auto leading-relaxed"
        variants={item}
      >
        🎉 Because the world TOTALLY needed another PDF tool, right? We&apos;re like that friend who shows up 
        uninvited to the party but brings really good snacks. Sure, we&apos;ll merge your PDFs, shrink them down 
        to size (like your ex&apos;s ego), and split them faster than your last relationship. No signup required - 
        because apparently, we hate collecting user data and making money. 🤷‍♂️
      </motion.p>
      <motion.div
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-fit mx-auto"
      >
        <Link href="/features"> 
          <Button 
            variant="primary"
            icon={<Zap className="w-4 h-4" />}
            iconPosition="left"
            className="group"
          >
            <motion.span
              initial="initial"
              animate="animate"
            >
              Click Here to PDF Your Life Away! 🪄
            </motion.span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}