"use client";

import { pdfTools, toolsCategories } from "@/constants/tools";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { FeatureCard } from "../landing/FeatureCard";
import { useMixpanel } from "@/Context/MixpanelProvider";
import { MIXPANEL_EVENTS } from "@/constants/mixpanel";
import { useState } from "react";
import { debounce } from "@/lib/utilFunction";

const FeaturesList = () => {

    const [tools,setTools] = useState(pdfTools);
    const [categories,setCategories] = useState(toolsCategories);

    const router = useRouter();
    const {sendEvent} = useMixpanel();

    const searchHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTools = pdfTools.filter(tool => 
            tool.title.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm) ||
            tool.smallDescription.toLowerCase().includes(searchTerm)
        );
        const filteredCategories = toolsCategories.filter(category => filteredTools.some(tool => tool.category === category.id));
        setTools(filteredTools);
        setCategories(filteredCategories);
    }, 400);

    return (
        <div>
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 dark:border-foreground/10 bg-background dark:bg-background/80 text-foreground dark:text-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              onChange={searchHandler}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        {categories?.map((category, categoryIndex) => (
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
                <AnimatePresence mode="popLayout">
                {
                tools?.filter((tool) => tool.category === category.id)
                    ?.sort((a, b) => a.active ? -1 : b.active ? 1 : 0)
                    ?.map((tool, index) => (
                    <motion.div
                        key={tool.title}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FeatureCard
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
                    </motion.div>
                    ))
                }
                </AnimatePresence>
                </div>
            </motion.section>
            ))}
        </div>
    )
}

export default FeaturesList
