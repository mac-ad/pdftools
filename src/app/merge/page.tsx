import { Metadata } from 'next';
import { FileText, Lock, Zap, Shield } from 'lucide-react';
import MergePDFForm from '@/components/merge/MergePDFForm';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Merge PDF Files | Free Online PDF Combiner Tool',
  description: 'Combine multiple PDF files into one document securely in your browser. Free online PDF merger with drag and drop support. No registration required, no file upload to servers.',
  keywords: 'merge pdf, combine pdf, join pdf, pdf merger, pdf combiner, merge pdf files, combine pdf files, pdf joiner, free pdf merger',
  alternates: {
    canonical: 'https://tools.macad.dev/merge'
  },
  openGraph: {
    title: 'Free Online PDF Merger - Combine PDFs Securely',
    description: 'Merge multiple PDF files into one document. Free, secure, and works directly in your browser. No registration or software installation needed.',
    type: 'website',
    url: 'https://tools.macad.dev/merge',
    images: [
      {
        url: '/og-merge.png',
        width: 1200,
        height: 630,
        alt: 'PDF Merger Tool Interface'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online PDF Merger - Combine PDFs Securely',
    description: 'Merge multiple PDF files into one document. Free, secure, and works directly in your browser.',
    images: ['/og-merge.png'],
  }
};

const features = [
  {
    title: "Easy Drag & Drop",
    description: "Simply drag your PDF files into the browser to start merging",
    icon: FileText,
    id: "drag-drop"
  },
  {
    title: "Local Processing",
    description: "Files never leave your device - 100% secure and private",
    icon: Lock,
    id: "security"
  },
  {
    title: "Lightning Fast",
    description: "Merge PDFs in seconds with our optimized processing",
    icon: Zap,
    id: "speed"
  },
  {
    title: "Free & Unlimited",
    description: "No file size limits, no registration required",
    icon: Shield,
    id: "unlimited"
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PDF Merger Tool",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Drag and drop interface",
    "Local file processing",
    "No file size limits",
    "No registration required",
    "Secure PDF merging",
    "Preview before merging"
  ]
};

export default function MergePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-background/50 pb-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Merge PDF Files Online
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Combine multiple PDF files into a single document securely in your browser. 
              No upload to servers, everything happens right here on your device.
            </p>
          </section>

          {/* Interactive Form Section */}
          <section aria-label="PDF Merger Tool" className="mb-16">
            <MergePDFForm />
          </section>

          {/* Features Grid */}
          <section aria-label="Features" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={feature.id}
                  id={feature.id}
                  className="p-6 rounded-xl border border-secondary/20 dark:border-secondary/10 bg-white/50 dark:bg-black/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground/90">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* SEO Content */}
          <section className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">
              Free Online PDF Merger - Combine PDFs with Ease
            </h2>
            <p className="text-foreground/70 dark:text-foreground/60 mb-4">
              Our PDF merger tool provides a secure and efficient way to combine multiple PDF documents 
              into a single file. Unlike other online tools, our merger processes everything locally in 
              your browser, ensuring complete privacy and security of your documents.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">
              How to Merge PDF Files
            </h3>
            <ol className="list-decimal pl-6 text-foreground/70 dark:text-foreground/60 space-y-2 mb-6">
              <li>Upload your PDF files using drag & drop or file picker</li>
              <li>Arrange the files in your desired order</li>
              <li>Click "Merge" to combine the files</li>
              <li>Download your merged PDF document</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3">
              Why Choose Our PDF Merger?
            </h3>
            <ul className="list-disc pl-6 text-foreground/70 dark:text-foreground/60 space-y-2 mb-6">
              <li>100% free with no hidden fees or registration required</li>
              <li>Secure local processing - files never leave your device</li>
              <li>No file size limits or restrictions</li>
              <li>Fast and efficient merging process</li>
              <li>Works on all devices and browsers</li>
              <li>Preview merged files before downloading</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              Privacy & Security
            </h3>
            <p className="text-foreground/70 dark:text-foreground/60">
              We take your privacy seriously. All PDF processing happens directly in your browser - 
              your files are never uploaded to any server. This ensures maximum security for your 
              sensitive documents while providing fast and efficient merging capabilities.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
