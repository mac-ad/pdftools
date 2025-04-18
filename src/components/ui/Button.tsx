import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "link";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right"; 
  isLoading?: boolean;
  loadingText?: string;
  href?: string;
}

export function Button({ 
  variant = "default", 
  className, 
  children,
  icon,
  iconPosition = "right",
  isLoading = false,
  loadingText,
  disabled,
  href,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "text-sm font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:cursor-pointer text-center flex justify-center",
        // Default variant
        variant === "default" && "text-foreground dark:text-foreground/90 hover:text-primary dark:hover:text-primary",
        // Primary variant
        variant === "primary" && 
          "px-8 py-4 bg-primary hover:bg-primary-light dark:hover:bg-primary/90 text-primary-text shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20",
        // Secondary variant  
        variant === "secondary" &&
          "px-6 py-3 bg-secondary hover:bg-secondary/90 dark:bg-secondary/80 dark:hover:bg-secondary/70 text-secondary-text",
        // Outline variant
        variant === "outline" &&
          "px-6 py-3 border-2 border-foreground/20 dark:border-foreground/10 hover:border-primary dark:hover:border-primary/80 hover:text-primary dark:hover:text-primary/90",
        // Ghost variant  
        variant === "ghost" &&
          "px-4 py-2 hover:bg-foreground/10 dark:hover:bg-foreground/5",
        // Link variant
        variant === "link" &&
          "px-2 py-1 text-foreground dark:text-foreground/90 underline-offset-4 hover:underline",
        className,
        disabled && "hover:border-transparent"
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin w-4 h-4">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      
      {!isLoading && iconPosition === "left" && icon}
      
      <span>
        {isLoading ? loadingText || children : children}
      </span>
      
      {!isLoading && iconPosition === "right" && icon}
    </button>
  );
} 