import { motion } from "framer-motion";
import { FilePlus, FileDown, Scissors } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

interface HowItWorksProps {
  isHowItWorksInView: boolean; // Because apparently users need to see things to use them
}

export function HowItWorks({ isHowItWorksInView }: HowItWorksProps) {
  const steps = [
    {
      icon: FilePlus,
      title: "Upload Your Life&apos;s Work",
      description: "Drag those PDFs you&apos;ve been hoarding since 2007 into our fancy drop zone",
      translateY: -6
    },
    {
      icon: Scissors, 
      title: "Play PDF God",
      description: "Twist, merge, or mutilate your PDFs to your heart&apos;s content. We won&apos;t judge (much).",
      translateY: 6
    },
    {
      icon: FileDown,
      title: "Claim Your Prize", 
      description: "Download your masterpiece. Marvel at how it&apos;s exactly what you wanted (or close enough)",
      translateY: -6
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }} // Starting invisible, because suspense is everything
      animate={isHowItWorksInView ? { opacity: 1 } : { opacity: 0 }}
      className="mt-32 relative"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-foreground dark:text-foreground/90 transform rotate-1 text-center mx-auto"
      >
        How It Works (It&apos;s Not Rocket Science)
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-foreground/70 dark:text-foreground/60 max-w-2xl mb-16 text-center mx-auto"
      >
        Look, we made it so simple even your tech-challenged uncle could use it. Three steps. That&apos;s it. No PhD required, though we won&apos;t stop you from adding &quot;PDF Master&quot; to your LinkedIn.
      </motion.p>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 transform " />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }} // Because sliding in from below is *totally* original
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2 }} // Staggered animations, how innovative
              whileHover={{ scale: 1.05,transition:{duration:0.2} }}
              className={`md:transform md:translate-y-${step.translateY}`} // Only apply translation on medium screens and up
            >
              <FeatureCard
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
