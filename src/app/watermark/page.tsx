import WatermarkPdfForm from "@/components/watermark/WatermarkPdfForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Watermark to PDF - PDF Watermarking Tool',
  description: 'Add custom text or image watermarks to your PDF documents. Easily protect your PDFs with professional watermarks using our free online tool.',
  keywords: 'PDF watermark, add watermark to PDF, PDF watermarking tool, watermark PDF online, PDF protection',
  openGraph: {
    title: 'Add Watermark to PDF - PDF Watermarking Tool',
    description: 'Add custom text or image watermarks to your PDF documents. Easily protect your PDFs with professional watermarks using our free online tool.',
    type: 'website',
  }
};

export default function WatermarkPage() {
  return (
    <main className="bg-white dark:bg-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-foreground/90 mb-6">
            Add Watermark to PDF
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Protect your PDF documents by adding custom text or image watermarks. 
            Our tool makes it easy to add professional watermarks to your PDFs.
          </p>
        </div>
        {/* Add Watermark component here */}
        <WatermarkPdfForm />
      </div>
    </main>
  );
}
