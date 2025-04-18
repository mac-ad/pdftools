import { Metadata } from 'next';
import { FileText, Zap, Lock, Scale } from 'lucide-react';
import CompressPDFForm from '@/components/compress/CompressPDFForm';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Compress PDF Files | Reduce PDF Size Online',
  description: 'Reduce PDF file size without losing quality. Free online PDF compressor with smart compression technology. No registration required, process files locally.',
  keywords: 'compress pdf, reduce pdf size, pdf compressor, shrink pdf, optimize pdf, pdf compression tool',
  alternates: {
    canonical: 'https://tools.macad.dev/compress'
  },
  openGraph: {
    title: 'Free PDF Compressor - Reduce PDF File Size Online',
    description: 'Compress PDF files while maintaining quality. Fast, secure, and works directly in your browser.',
    type: 'website',
    url: 'https://tools.macad.dev/compress',
    images: [
      {
        url: '/og-compress.png',
        width: 1200,
        height: 630,
        alt: 'PDF Compression Tool Interface'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Compressor - Reduce PDF File Size Online',
    description: 'Compress PDF files while maintaining quality. Fast, secure, and works in your browser.',
    images: ['/og-compress.png'],
  }
};

const features = [
  {
    icon: Scale,
    title: "Smart Compression",
    description: "Optimize file size while maintaining document quality",
    id: "smart-compression"
  },
  {
    icon: FileText,
    title: "Quality Options",
    description: "Choose compression level based on your needs",
    id: "quality-options"
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Compress PDFs in seconds with local processing",
    id: "fast-processing"
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Files never leave your device - 100% secure",
    id: "security"
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PDF Compressor Tool",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Smart compression technology",
    "Multiple quality options",
    "Local file processing",
    "No file size limits",
    "No registration required",
    "Preview before downloading"
  ]
};

export default function CompressPage() {

    return(
      <ComingSoon 
        title="PDF Compressor"
        description="Compress PDF files while maintaining quality. Fast, secure, and works directly in your browser."
      />
    )

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-background/50 pb-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Compress PDF Files
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Reduce PDF file size while maintaining quality. Fast, free, and secure - 
              all processing happens right in your browser.
            </p>
          </section>

          {/* Interactive Form Section */}
          <section aria-label="PDF Compressor Tool" className="mb-16">
            <CompressPDFForm />
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
              Free PDF Compression Tool - Reduce File Size Online
            </h2>
            <p className="text-foreground/70 dark:text-foreground/60 mb-4">
              Our PDF compression tool uses advanced algorithms to reduce file size while 
              maintaining document quality. Unlike other online tools, our compressor works 
              entirely in your browser, ensuring complete privacy and security.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">
              How to Compress PDF Files
            </h3>
            <ol className="list-decimal pl-6 text-foreground/70 dark:text-foreground/60 space-y-2 mb-6">
              <li>Upload your PDF file using drag & drop or file picker</li>
              <li>Choose your preferred compression level</li>
              <li>Click "Compress" to reduce file size</li>
              <li>Download your compressed PDF</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3">
              Why Choose Our PDF Compressor?
            </h3>
            <ul className="list-disc pl-6 text-foreground/70 dark:text-foreground/60 space-y-2 mb-6">
              <li>Smart compression technology that preserves quality</li>
              <li>Multiple compression levels for different needs</li>
              <li>Secure local processing - files never leave your device</li>
              <li>No file size limits or restrictions</li>
              <li>No registration or software installation required</li>
              <li>Preview compressed files before downloading</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              About Our Compression Technology
            </h3>
            <p className="text-foreground/70 dark:text-foreground/60">
              Our compression algorithm intelligently analyzes your PDF content to apply 
              optimal compression settings. We use various techniques including image 
              optimization, font subsetting, and content streamlining to achieve the best 
              possible compression while maintaining document quality.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
