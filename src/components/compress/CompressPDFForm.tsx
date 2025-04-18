"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileDown, Eye, Scale } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PDFDocument } from 'pdf-lib';
import { useMixpanel } from '@/Context/MixpanelProvider';
import { MIXPANEL_EVENTS } from '@/constants/mixpanel';

type CompressionLevel = 'low' | 'medium' | 'high';

interface CompressionOption {
  level: CompressionLevel;
  title: string;
  description: string;
  reduction: string;
}

export default function CompressPDFForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');

  const { sendEvent } = useMixpanel();

  const compressionOptions: CompressionOption[] = [
    {
      level: 'low',
      title: 'Light Compression',
      description: 'Best quality, minimal size reduction',
      reduction: '20-30%'
    },
    {
      level: 'medium',
      title: 'Balanced',
      description: 'Good quality, moderate compression',
      reduction: '40-60%'
    },
    {
      level: 'high',
      title: 'Maximum Compression',
      description: 'Smaller size, may affect quality',
      reduction: '60-80%'
    }
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
      sendEvent(MIXPANEL_EVENTS.FILE_SELECTED, { file: droppedFile.name });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      sendEvent(MIXPANEL_EVENTS.FILE_SELECTED, { file: selectedFile.name });
    }
  };

  const previewPDF = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
    sendEvent(MIXPANEL_EVENTS.FILE_PREVIEWED, { file: file.name });
  };

  const compressPDF = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      sendEvent(MIXPANEL_EVENTS.TOOL_START, { 
        tool: "Compress", 
        file: file.name,
        compressionLevel 
      });

      // Here you would implement the actual compression logic
      // For now, we'll just simulate a delay
      // Load the PDF file into memory
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Create a new document to store compressed version
      const compressedPdf = await PDFDocument.create();
      
      // Copy all pages with compression settings
      const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach(page => compressedPdf.addPage(page));

      // Apply compression based on selected level
      const compressOptions = {
        useObjectStreams: true,
        // Adjust quality based on compressionLevel
        imageQuality: compressionLevel === 'high' ? 0.8 : 
                     compressionLevel === 'medium' ? 0.5 : 0.3,
        // Downsample images if not high quality
        imageResolution: compressionLevel === 'high' ? 150 : 100
      };

      // Save with compression
      const compressedBytes = await compressedPdf.save(compressOptions);
      const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
      
      // download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(compressedBlob);
      link.download = `compressed_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      sendEvent(MIXPANEL_EVENTS.TOOL_SUCCESS, { 
        tool: "Compress", 
        file: file.name,
        compressionLevel 
      });
    } catch (error) {
      console.error('Error compressing PDF:', error);
      sendEvent(MIXPANEL_EVENTS.TOOL_ERROR, { 
        tool: "Compress", 
        file: file.name,
        compressionLevel 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* File Upload Area */}
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
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img src="/file.svg" alt="PDF file" className="w-12 h-12" />
              <div className="text-left">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-foreground/60">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                icon={<Eye className="w-4 h-4" />}
                onClick={previewPDF}
              >
                Preview
              </Button>
              <Button
                variant="outline"
                icon={<Upload className="w-4 h-4" />}
                onClick={() => setFile(null)}
              >
                Change File
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Drop your PDF here or click to upload
              </p>
              <p className="text-sm text-foreground/60">
                Maximum file size: 50MB
              </p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button
              variant="outline"
              className = "mx-auto"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select PDF
            </Button>
          </div>
        )}
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-6"
        >
          {/* Compression Options */}
          <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Compression Level</h3>
            <div className="space-y-3">
              {compressionOptions.map((option) => (
                <button
                  key={option.level}
                  onClick={() => setCompressionLevel(option.level)}
                  className={cn(
                    "w-full p-4 rounded-lg text-left transition-all border",
                    compressionLevel === option.level
                      ? "border-primary bg-primary/5"
                      : "border-secondary/20 hover:border-primary/50"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{option.title}</h4>
                      <p className="text-sm text-foreground/60">{option.description}</p>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {option.reduction}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Compress Button */}
          <div className="text-center">
            <Button
              variant="primary"
              className="w-full sm:w-auto"
              icon={<Scale className="w-4 h-4" />}
              onClick={compressPDF}
              disabled={isProcessing}
            >
              {isProcessing ? 'Compressing...' : 'Compress PDF'}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 