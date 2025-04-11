import { motion } from "framer-motion";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export function CTASection({ title, description }: CTASectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-24 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent rounded-2xl" />

      <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center rounded-2xl border border-foreground/10 dark:border-foreground/20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground dark:text-foreground/90">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-block"
        >
          <Button 
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="px-10 py-5 text-lg"
          >
            {buttonText}
          </Button>
        </motion.div> */}
      </div>
    </motion.section>
  );
}