import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { SimpleFeatureCard } from "./SimpleFeatureCard";
import { FileText, FilePlus, FileDown, Scissors, Lock, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { pdfTools } from "@/constants/tools";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FeaturesProps {
  isFeaturesInView: boolean;
}


const FEATURES_LIMIT = 6;

export function Features({ isFeaturesInView }: FeaturesProps) {
  
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

  const router = useRouter();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
      className="mt-32 relative text-center mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-foreground/90">
          Quick Tools
        </h2>
        <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
          Essential PDF tools at your fingertips
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate={isFeaturesInView ? "show" : "hidden"}
      >
        {pdfTools?.slice(0, FEATURES_LIMIT)?.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
          >
            <SimpleFeatureCard
              {...feature}
              delay={0}
              footer={
                <Button variant={feature.active ? "outline" : "default"} 
                  disabled = {!feature.active }
                className={
                  cn(
                    "group   py-1",
                    feature.active ? "hover:bg-primary/10 dark:hover:bg-primary/10" : "hover:bg-transparent dark:hover:bg-transparent"
                  )
                } onClick={() =>  feature.active ? router.push(feature.link) : null}>
                  {
                    feature.active ? feature.action?.text : "Coming soon"
                  }
                </Button>
              }
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isFeaturesInView ? { 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 0.3 + (FEATURES_LIMIT * 0.2) // Delay = initial delay + stagger time for all cards
          }
        } : { opacity: 0, y: 20 }}
      >
        <Link href="/features">
          <Button variant="outline" className="group">
            View All Features
            <motion.span
              className="inline-block ml-2"
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
