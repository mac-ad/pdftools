"use client";

import { FeatureCard } from "@/components/landing/FeatureCard";
import { motion } from "framer-motion";
import { toolsCategories, pdfTools } from "@/constants/tools";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMixpanel } from "@/Context/MixpanelProvider";
import { MIXPANEL_EVENTS } from "@/constants/mixpanel";

export default function FeaturesPage() {

  const router = useRouter();

  const {sendEvent} = useMixpanel();

  return (
    <main className="bg-white dark:bg-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-foreground/90 mb-6">
            PDF Tools & Features
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Discover our comprehensive suite of PDF tools designed to handle all your document needs.
            From basic operations to advanced features, we&apos;ve got you covered.
          </p>
        </motion.div>

        {toolsCategories.map((category, categoryIndex) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground dark:text-foreground/90 mb-8">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
              pdfTools?.filter((tool) => tool.category === category.id)
                ?.sort((a, b) => a.active ? -1 : b.active ? 1 : 0)
                ?.map((tool, index) => (
                  <FeatureCard
                    key={tool.title}
                    {...tool}
                    delay={index * 0.1}
                    className={tool.active ? "" : "opacity-70"}
                    footer={
                        <Button 
                          variant={tool.active ? "outline" : "default"} 
                          className="group ml-auto mt-10 z-20" 
                          disabled={!tool.active} 
                          onClick={() => {
                            router.push(tool.link);
                            sendEvent(MIXPANEL_EVENTS.FEATURE_CLICK, { tool: tool.title });
                          }}
                        >
                            {tool.active ? tool?.action?.text : "Coming soon"}
                        </Button>
                    }
                  />
                ))
              }
              {/* {pdfTools
                .filter(tool => tool.category === category.id)
                .map((tool, index) => (
                  <FeatureCard
                    key={tool.title}
                    {...tool}
                    delay={index * 0.1}
                    footer={
                      <motion.div 
                        className="mt-4 text-sm text-primary dark:text-primary/90 font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Learn more →
                      </motion.div>
                    }
                  />
                ))} */}
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  );
} 