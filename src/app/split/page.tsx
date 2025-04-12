"use client";

import { motion } from "framer-motion";
import { Scissors, Upload, AlertCircle, ChevronDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import JSZip from 'jszip';

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [splitMode, setSplitMode] = useState<'all' | 'range' | 'custom'>('all');
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    
    // Open in new tab
    window.open(url, '_blank');
    
    // Clean up object URL
    URL.revokeObjectURL(url);
  };

  const splitPDF = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      
      // Read the PDF file
      const fileBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);
      const pageCount = pdfDoc.getPageCount();

      let pageRanges: number[][] = [];

      if (splitMode === 'all') {
        // Create ranges for each individual page
        pageRanges = Array.from({ length: pageCount }, (_, i) => [i, i]);
      } else if (splitMode === 'range') {
        // Parse page ranges from input (e.g., "1-3, 4-8")
        pageRanges = pageRange
          .split(',')
          .map(range => range.trim())
          .filter(range => range.match(/^\d+(-\d+)?$/))
          .map(range => {
            const [start, end] = range.split('-').map(num => parseInt(num) - 1);
            return end !== undefined ? [start, end] : [start, start];
          })
          .filter(([start, end]) => 
            start >= 0 && end >= 0 && start < pageCount && end < pageCount
          );
      }

      // Create zip file
      const zip = new JSZip();

      // Add split PDFs to zip
      for (const [start, end] of pageRanges) {
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => start + i));
        pages.forEach(page => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        zip.file(`split_${start + 1}_${end + 1}.pdf`, pdfBytes);
      }
      
      // Generate and download zip file
      const zipContent = await zip.generateAsync({type: 'blob'});
      const url = URL.createObjectURL(zipContent);
      const link = document.createElement('a');
      link.href = url;
      link.download = `split_pdfs.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error splitting PDF:', error);
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
            Split PDF
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70">
            Separate your PDF into individual pages or custom ranges
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200",
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
                    Drag & Drop your PDF here
                  </p>
                  <p className="text-sm text-foreground/60 dark:text-foreground/70 mt-1">
                    or click to browse files
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
                  className = "mx-auto"
                >
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Scissors className="w-8 h-8 text-primary" />
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
                    Preview PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {file && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-6"
          >
            <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Split Options</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={splitMode === 'all'}
                    onChange={() => setSplitMode('all')}
                    className="form-radio text-primary"
                  />
                  <span>Split into individual pages</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={splitMode === 'range'}
                    onChange={() => setSplitMode('range')}
                    className="form-radio text-primary"
                  />
                  <span>Split by page range</span>
                </label>
              </div>

              {splitMode === 'range' && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="e.g., 1-3, 4-8"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    className="w-full p-2 rounded-lg border border-secondary/20 dark:border-secondary/10 bg-white dark:bg-black"
                  />
                  <p className="text-sm text-foreground/60 mt-2">
                    Enter page ranges separated by commas (e.g., 1-3, 4-8)
                  </p>
                </div>
              )}
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                icon={<Scissors className="w-4 h-4" />}
                onClick={splitPDF}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Split PDF'}
              </Button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-secondary/5 dark:bg-secondary/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">About PDF Splitting</h3>
              <p className="text-sm text-foreground/70 dark:text-foreground/60">
                Split your PDF document into separate files. You can either split into individual pages
                or specify custom page ranges. Perfect for extracting specific sections or breaking down
                large documents into smaller ones.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}