import FeaturesList from "@/components/features/FeaturesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'PDF Tools & Features - Complete PDF Management Suite',
  description: 'Explore our comprehensive suite of PDF tools for all your document needs. Convert, merge, split, compress PDFs and more with our easy-to-use features.',
  keywords: 'PDF tools, PDF converter, merge PDF, split PDF, compress PDF, PDF editor, document management',
  openGraph: {
    title: 'PDF Tools & Features - Complete PDF Management Suite',
    description: 'Explore our comprehensive suite of PDF tools for all your document needs. Convert, merge, split, compress PDFs and more with our easy-to-use features.',
    type: 'website',
  }
};

export default function FeaturesPage() {
  return (
    <main className="bg-white dark:bg-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-foreground/90 mb-6">
            PDF Tools & Features
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Discover our comprehensive suite of PDF tools designed to handle all your document needs.
            From basic operations to advanced features, we&apos;ve got you covered.
          </p>
        </div>
        <FeaturesList />
      </div>
    </main>
  );
}