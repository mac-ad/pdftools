import { Metadata } from 'next';
import PasswordProtectForm from '@/components/protect/PasswordProtectForm';
import { Shield, Lock, Eye, Key } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Password Protect PDF | Secure PDF Files Online',
  description: 'Add password protection to your PDF files. Encrypt sensitive documents with strong passwords. Free, secure, and no registration required.',
  keywords: 'pdf password, protect pdf, encrypt pdf, secure pdf, add password to pdf, pdf security',
  openGraph: {
    title: 'Password Protect PDF Files Online',
    description: 'Secure your PDF documents with password protection. Easy to use, no registration needed.',
    images: [
      {
        url: '/og-protect.png', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'PDF Password Protection Tool'
      }
    ]
  }
};

const features = [
  {
    icon: Shield,
    title: "Strong Encryption",
    description: "256-bit AES encryption to keep your documents secure"
  },
  {
    icon: Lock,
    title: "Owner Password",
    description: "Set permissions for printing, editing, and copying"
  },
  {
    icon: Eye,
    title: "User Password",
    description: "Require password to open and view the document"
  },
  {
    icon: Key,
    title: "Custom Permissions",
    description: "Control what users can do with your PDF"
  }
];

export default function ProtectPDFPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground dark:text-foreground/90 mb-4">
            Password Protect Your PDF
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Add secure password protection to your PDF files. Control who can view, 
            edit, print, or copy your sensitive documents.
          </p>
        </section>

        {/* Features Grid - Static */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
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
              </div>
            );
          })}
        </section>

        {/* Interactive Form Section - Client Component */}
        <PasswordProtectForm />

        {/* SEO Content - Static */}
        <section className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            Secure Your PDF Documents with Password Protection
          </h2>
          <p className="text-foreground/70 dark:text-foreground/60 mb-4">
            Our PDF password protection tool offers a secure way to add encryption to your 
            sensitive documents. Using industry-standard 256-bit AES encryption, you can ensure 
            your PDFs are only accessible to authorized users.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">
            Why Password Protect Your PDFs?
          </h3>
          <ul className="list-disc pl-6 text-foreground/70 dark:text-foreground/60 space-y-2">
            <li>Protect sensitive business documents from unauthorized access</li>
            <li>Secure personal information and confidential data</li>
            <li>Control who can view, edit, print, or copy your PDFs</li>
            <li>Comply with data protection regulations</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            How It Works
          </h3>
          <ol className="list-decimal pl-6 text-foreground/70 dark:text-foreground/60 space-y-2">
            <li>Upload your PDF file</li>
            <li>Set your desired passwords and permissions</li>
            <li>Click "Protect PDF" to encrypt your document</li>
            <li>Download your password-protected PDF</li>
          </ol>
        </section>
      </div>
    </main>
  );
} 