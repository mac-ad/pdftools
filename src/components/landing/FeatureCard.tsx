import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
  footer?: React.ReactNode;
}

export function FeatureCard({ icon: Icon, title, description, className, footer }: FeatureCardProps) {
  return (
    <div
      className={cn("p-6 rounded-2xl border border-secondary/20 dark:border-secondary/10 bg-gray-50 dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 relative group h-full overflow-hidden flex flex-col", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex gap-4">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
          >
            <Icon className="w-6 h-6 text-primary" />
          </div>
         
        </div>
        
        <div 
          className="text-foreground/80 dark:text-foreground/70 leading-relaxed text-left flex flex-col gap-2" 
        >
          <h3 className="text-xl font-bold text-foreground dark:text-foreground/90 text-left">{title}</h3>
          <p className="text-sm text-foreground/60 dark:text-foreground/70">{description}</p>
        </div>
      </div>
      {footer && (
      < div 
          className="mt-auto"
        >
          {footer}
        </div>
      )}
    </div>
  );
}