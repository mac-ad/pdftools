import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { pdfTools } from "@/constants/tools";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

interface FeaturesProps {
  isFeaturesInView: boolean; // Because apparently we need to track if you can see things now
}

export function Features({ isFeaturesInView }: FeaturesProps) {
  return (
    <motion.section 
      initial={{ opacity: 0 }} // Start invisible, how original
      animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
      className="mt-32 relative text-center mx-auto"
    >
      <motion.h2 
        initial={{ y: 20 }}
        animate={isFeaturesInView ? { y: 0 } : { y: 20 }}
        className="text-3xl sm:text-4xl font-bold mb-16 text-foreground dark:text-foreground/90 max-w-[30ch] mx-auto"
      >
        Yet Another Collection of PDF Tools (Like You Needed More)
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfTools.map((feature, index) => (
          <div key={feature.title} className={
            cn(
                "relative",
                !feature.active && "opacity-80 pointer-events-none"
            )
          }>
           
            <Link 
              href={feature.active ? feature.link : '#'} 
              key={feature.title} 
              className={cn(
                "block h-full aspect-[16/9]",
                !feature.active && "cursor-not-allowed"
              )}
            >
              
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={feature.active ? { 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                } : {}}
                className="h-full"
              >
                {!feature.active && (
                    <Button variant="primary" className="absolute bottom-2 right-2 z-10 text-xs p-2 px-4 bg-primary/90">
                        Coming Soon
                    </Button>
              )}
                <FeatureCard {...feature} delay={0} />
              </motion.div>
            </Link>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
