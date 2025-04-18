"use client";

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { motion, useInView } from 'framer-motion';
import { FileText, Loader2, X, MoveDown, MoveUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useMixpanel } from '@/Context/MixpanelProvider';
import { MIXPANEL_EVENTS } from '@/constants/mixpanel';

interface PDFFile {
  file: File;
  insertPage?: number;
}

export default function MergePDFForm() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const {sendEvent} = useMixpanel();

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      setError('Please drop PDF files only');
      return;
    }

    setFiles(prev => [...prev, ...pdfFiles.map(file => ({ file }))]);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      setError('Please select PDF files only');
      return;
    }

    setFiles(prev => [...prev, ...pdfFiles.map(file => ({ file }))]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === files.length - 1)) return;

    setFiles(prev => {
      const newFiles = [...prev];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index + (direction === 'up' ? -1 : 1)];
      newFiles[index + (direction === 'up' ? -1 : 1)] = temp;
      return newFiles;
    });
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge');
      return;
    }

    try {
      setIsLoading(true);
      setMergeProgress(0);
      sendEvent(MIXPANEL_EVENTS.TOOL_START, { tool: "Merge", file: files?.map((file) => file.file.name).join(', ') });

      const mergedPdf = await PDFDocument.create();
      let processedPages = 0;

      for (const pdfFile of files) {
        const fileBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        
        processedPages += pdf.getPageCount();
        setMergeProgress((processedPages / totalPages) * 100);
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      sendEvent(MIXPANEL_EVENTS.TOOL_SUCCESS, { tool: "Merge", file: files?.map((file) => file.file.name).join(', ') });
    } catch (err) {
      setError('Error merging PDFs. Please try again.');
      console.error(err);
      sendEvent(MIXPANEL_EVENTS.TOOL_ERROR, { tool: "Merge", file: files?.map((file) => file.file.name).join(', ') });
    } finally {
      setIsLoading(false);
      setMergeProgress(0);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragOver ? 'border-primary bg-primary/10' : 'border-border'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label 
          htmlFor="file-input"
          className="cursor-pointer text-foreground/80"
        >
          <FileText className="mx-auto h-12 w-12 mb-4" />
          <p className="text-lg mb-2">Drag & drop PDF files here</p>
          <p className="text-sm text-muted-foreground">or click to select files</p>
        </label>
      </div>

      {error && (
        <div className="text-destructive text-center">{error}</div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div 
              key={file.file.name + index}
              className="flex items-center justify-between bg-card p-4 rounded-lg shadow-sm border"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-foreground">{file.file.name}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() => moveFile(index, 'up')}
                  className="p-0"
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  disabled={index === files.length - 1}
                  onClick={() => moveFile(index, 'down')}
                  className="p-0"

                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => removeFile(index)}
                  className="p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            onClick={mergePDFs}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Merging... {Math.round(mergeProgress)}%
              </>
            ) : (
              'Merge PDFs'
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
}