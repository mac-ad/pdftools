"use client";

import { motion } from "framer-motion"
import { useGlobal } from "@/Context/GlobalContext";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SuggestFeatureForm = () => {

  const { setShowSuggestFeatureForm } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    fetch('https://script.google.com/macros/s/AKfycbyXku3OVDdGqz_4GXbHw0QH8s3UzU2-M9zb7yGXNCoyNpPUDDfZp7Mkxx0-_Ek4Bark/exec')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const feature = formData.get('feature');

      const response = await fetch('https://script.google.com/macros/s/AKfycbxqJCqN7HlBssGde0H1tH1aKzl_HpPr2cjQ7BzCdGNmkhYs5LSoAvxnG36LpI4PEd-0/exec', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit feature request');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setShowSuggestFeatureForm(false);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
   <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <motion.div
        id="suggest-feature"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl max-w-lg w-full mx-4 relative">
          <button
            onClick={() => setShowSuggestFeatureForm(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold mb-4">Suggest a Feature</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a brilliant idea? Or just a mediocre one? We&apos;re all ears! 
            (Though we can&apos;t promise we&apos;ll implement it... or even read it)
          </p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email (optional, but how else will we ignore you?)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="feature" className="block text-sm font-medium mb-2">
                Your Amazing Feature Idea
              </label>
              <textarea
                id="feature"
                rows={4}
                name="feature"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="I think it would be cool if..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => setShowSuggestFeatureForm(false)}
              >
                Never mind
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Submit (into the void)
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    
   </div>
  )
}

export default SuggestFeatureForm
