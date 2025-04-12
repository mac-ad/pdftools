import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { footer } from "framer-motion/client";

interface SimpleFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  smallDescription: string;
  delay?: number;
  className?: string;
  footer?: React.ReactNode;
}

export function SimpleFeatureCard({ icon: Icon, title, smallDescription, delay = 0, className, footer }: SimpleFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "p-6 rounded-xl border border-secondary/20 dark:border-secondary/10 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center shadow-inner"
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-foreground dark:text-foreground/90 mb-1 text-left">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 dark:text-foreground/80 line-clamp-1 text-left">
            {smallDescription}
          </p>
          {footer && <div className="mt-4">
            {footer}
          </div>}
        </div>
      </div>
    </motion.div>
  );
} 