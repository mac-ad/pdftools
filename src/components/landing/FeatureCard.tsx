import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-2xl border border-secondary/20 dark:border-secondary/10 bg-white dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300 relative group h-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex gap-4">
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              rotate: {
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
              }
            }}
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
         
        </div>
        
        <motion.div 
          className="text-foreground/80 dark:text-foreground/70 leading-relaxed text-left flex flex-col gap-2" 
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold text-foreground dark:text-foreground/90 text-left">{title}</h3>
          <p className="text-sm text-foreground/60 dark:text-foreground/70">{description}</p>
        </motion.div>

        <motion.div 
          className="h-1 w-0 bg-gradient-to-r from-primary/50 to-secondary/50 mt-4 rounded-full group-hover:w-full transition-all duration-700"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
}