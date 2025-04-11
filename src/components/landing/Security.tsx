import { motion } from "framer-motion";
import { Lock, Brain, FileText } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

interface SecurityProps {
  isSecurityInView: boolean;
}

export function Security({ isSecurityInView }: SecurityProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={isSecurityInView ? { opacity: 1 } : { opacity: 0 }}
      className="mt-32 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl" />
      <div className="relative p-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground dark:text-foreground/90">
          We Promise We&apos;re Not Stealing Your Files
        </h2>
        <p className="text-lg text-foreground/70 dark:text-foreground/60 max-w-2xl mb-16 mx-auto">
          Look, we could&apos;ve built this the easy way and stored your files on some sketchy server in who-knows-where, but we&apos;re too lazy for that. Everything happens in your browser - because that&apos;s actually less work for us.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05,transition:{duration:0.2} }} 
            initial={{ opacity: 0, y: 50 }}
            animate={isSecurityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.1 }}
            className="transform -rotate-3"
          >
            <FeatureCard
              icon={Lock}
              title="Fort Knox Level Security*"
              description="*By which we mean we literally can&apos;t access your files even if we wanted to. Your browser does all the work. We&apos;re just here looking pretty."
              delay={0}
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05,transition:{duration:0.2} }}
            initial={{ opacity: 0, y: 50 }}
            animate={isSecurityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.3 }}
            className="md:transform md:translate-y-12"
          >
            <FeatureCard
              icon={Brain}
              title="Unnecessarily Smart Tech" 
              description="We spent way too much time optimizing algorithms that could probably just be a for-loop. But hey, it sounds impressive, right?"
              delay={0}
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05,transition:{duration:0.2} }}
            initial={{ opacity: 0, y: 50 }}
            animate={isSecurityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.5 }}
            className="transform rotate-3"
          >
            <FeatureCard
              icon={FileText}
              title="PDF Whisperer"
              description="We speak fluent PDF. Actually, it&apos;s the only language we know. We tried learning JSON once, but it didn&apos;t work out."
              delay={0}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
