import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/Context/Providers";
import { Toaster } from "sonner";
import Script from "next/script";
import Analytics from "@/components/Analytics/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PDF Toolbox – Merge, Convert, Compress PDFs Online",
  description: "All-in-one free online tool to merge, convert, compress, and edit PDFs quickly and securely. No signup required.",
  keywords: ["PDF merge", "PDF convert", "PDF compress", "edit PDF", "free PDF tool", "online PDF editor"],
  authors: [{ name: "Your Name", url: process.env.NEXT_PUBLIC_DOMAIN }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || ""),
  openGraph: {
    title: "PDF Toolbox – All-in-One PDF Editor",
    description: "Fast, secure and free PDF toolkit for merging, compressing, and converting files.",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "PDF Toolbox",
    images: [
      {
        url: "/images/preview.png", // Ideal: 1200x630
        width: 1200,
        height: 630,
        alt: "PDF Toolbox – Merge, Convert, Compress PDFs",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Toolbox – Merge, Convert, Compress PDFs",
    description: "Free and easy PDF tools online. No sign-up needed.",
    images: ["/images/preview.png"],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PDF Toolbox",
              "url": process.env.NEXT_PUBLIC_DOMAIN,
              "description": "Free and powerful PDF tools to merge, convert, compress, and edit PDFs online.",
              "applicationCategory": "Utility",
              "operatingSystem": "All",
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
          })
        }} />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Providers>
            <div className="relative">
              <Toaster richColors/>
              <Header />
              <main className="mt-16">
                {children}
              </main>
            </div>
         </Providers>
      </body>
    </html>
  );
}
