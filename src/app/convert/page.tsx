"use client";

import { motion } from "framer-motion";
import { FileDown, Upload, AlertCircle, Eye, FileType, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JSX, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ConversionFormat = 'word' | 'excel' | 'powerpoint' | 'image' | 'html' | 'text';

interface FormatOption {
  id: ConversionFormat;
  title: string;
  description: string;
  icon: JSX.Element;
  extensions: string[];
}

export default function ConvertPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ConversionFormat | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  useEffect(() => {
  //  router.push("/")
  }, []);

  const formatOptions: FormatOption[] = [
    {
      id: 'word',
      title: 'Word Document',
      description: 'Convert to editable DOCX format',
      icon: <FileType className="w-6 h-6" />,
      extensions: ['.docx', '.doc']
    },
    {
      id: 'excel',
      title: 'Excel Spreadsheet',
      description: 'Convert tables to XLSX format',
      icon: <FileType className="w-6 h-6" />,
      extensions: ['.xlsx', '.xls']
    },
    {
      id: 'powerpoint',
      title: 'PowerPoint',
      description: 'Convert to presentation format',
      icon: <FileType className="w-6 h-6" />,
      extensions: ['.pptx', '.ppt']
    },
    // {
    //   id: 'image',
    //   title: 'Image',
    //   description: 'Convert to JPG or PNG format',
    //   icon: <FileType className="w-6 h-6" />,
    //   extensions: ['.jpg', '.png']
    // },
    // {
    //   id: 'html',
    //   title: 'HTML',
    //   description: 'Convert to web page format',
    //   icon: <FileType className="w-6 h-6" />,
    //   extensions: ['.html']
    // },
    // {
    //   id: 'text',
    //   title: 'Plain Text',
    //   description: 'Extract text content',
    //   icon: <FileType className="w-6 h-6" />,
    //   extensions: ['.txt']
    // }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const previewPDF = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  const convertPDF = async () => {
    if (!file || !selectedFormat) return;

    try {
      setIsProcessing(true);
      // Here you would implement the actual conversion logic
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `converted_file${formatOptions.find(f => f.id === selectedFormat)?.extensions[0]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error converting PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground dark:text-foreground/90 mb-4">
            Convert PDF
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70">
            Transform your PDF into various formats with just a few clicks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 h-full",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-secondary/20 dark:border-secondary/10 hover:border-primary/50",
                file && "border-solid border-primary/50 bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 dark:bg-secondary/5 flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-secondary-light" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground dark:text-foreground/90">
                      Upload PDF
                    </p>
                    <p className="text-sm text-foreground/60 dark:text-foreground/70 mt-1">
                      Drag & drop or click to browse
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                    id="fileInput"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="mx-auto"
                  >
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <FileDown className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground dark:text-foreground/90">
                    {file.name}
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setFile(null)}
                    >
                      Choose Different File
                    </Button>
                    <Button
                      variant="outline"
                      onClick={previewPDF}
                      icon={<Eye className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Format Selection Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="border-2 border-secondary/20 dark:border-secondary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Select Output Format</h3>
              <div className="grid grid-cols-1 gap-3">
                {formatOptions.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={cn(
                      "rounded-lg text-left transition-all p-3 border cursor-pointer",
                      selectedFormat === format.id
                        ? "border-primary bg-primary/5"
                        : "border-secondary/20 hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className=" text-lg  flex">
                        {format.icon}
                      </div>
                      <div className = "">
                        <p className="font-medium">{format.title}</p>
                        <p className="text-xs text-foreground/60">{format.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {file && selectedFormat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              variant="primary"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={convertPDF}
              disabled={isProcessing}
            >
              {isProcessing ? 'Converting...' : 'Convert Now'}
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-secondary/5 dark:bg-secondary/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">About PDF Conversion</h3>
              <p className="text-sm text-foreground/70 dark:text-foreground/60">
                Convert your PDFs to various formats while maintaining the original formatting.
                Perfect for editing, sharing, or repurposing your PDF content. Choose from multiple
                output formats including Word, Excel, PowerPoint, and more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 