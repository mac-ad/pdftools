import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

export function Card({ 
  id,
  icon, 
  title, 
  description, 
  action,
  className,
  ...props 
}: CardProps) {
  return (
    <div 
      id={id}
      className={cn(
        "group p-8 rounded-2xl bg-foreground/[0.02] dark:bg-foreground/[0.01] backdrop-blur-sm",
        "border border-foreground/[0.06] dark:border-foreground/[0.04]",
        "hover:border-primary/40 dark:hover:border-primary/30",
        "flex flex-col gap-6 transition-colors",
        className
      )}
      {...props}
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-foreground dark:text-foreground/90">{title}</h2>
      </div>
      <p className="text-secondary-light/80 dark:text-secondary-light/70 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-auto">
        {action}
      </div>
    </div>
  );
} 