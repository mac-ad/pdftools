"use client";

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { motion, useInView } from 'framer-motion';
import { FileText, Loader2, Lock, X, MoveDown, MoveUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MergePage = () => {
  const [files, setFiles] = useState<Array<{file: File, insertAt?: number}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const securityRef = useRef(null);
  const isSecurityInView = useInView(securityRef, { once: true, margin: "-100px" });

  // Load files from localStorage on component mount
  useEffect(() => {
    const loadFilesFromStorage = async () => {
      const storedFiles = localStorage.getItem('pdfFiles');
      if (storedFiles) {
        try {
          const fileData = JSON.parse(storedFiles);
          const reconstructedFiles = await Promise.all(
            fileData.map(async (item: {name: string, data: string}) => {
              const response = await fetch(item.data);
              const blob = await response.blob();
              const file = new File([blob], item.name, { type: 'application/pdf' });
              return { file };
            })
          );
          setFiles(reconstructedFiles);

          // Get page count if single file
          if (reconstructedFiles.length === 1) {
            const fileBuffer = await reconstructedFiles[0].file.arrayBuffer();
            const pdf = await PDFDocument.load(fileBuffer);
            setTotalPages(pdf.getPageCount());
          }
        } catch (error) {
          console.error('Error loading files from storage:', error);
        }
      }
    };

    loadFilesFromStorage();
  }, []);

  // Save files to localStorage whenever files change
  useEffect(() => {
    const saveFilesToStorage = async () => {
      try {
        const fileData = await Promise.all(
          files.map(async ({file}) => {
            const reader = new FileReader();
            return new Promise((resolve) => {
              reader.onload = () => {
                resolve({
                  name: file.name,
                  data: reader.result
                });
              };
              reader.readAsDataURL(file);
            });
          })
        );
        localStorage.setItem('pdfFiles', JSON.stringify(fileData));
      } catch (error) {
        console.error('Error saving files to storage:', error);
      }
    };

    saveFilesToStorage();
  }, [files]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.some(file => file.type !== 'application/pdf')) {
        setError('Please select only PDF files');
        return;
      }
      // Get page count of first PDF if it's the only one
      if (selectedFiles.length === 1) {
        const fileBuffer = await selectedFiles[0].arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        setTotalPages(pdf.getPageCount());
      }

      // Append dropped files to existing ones
      setFiles(prevFiles => [...prevFiles, ...selectedFiles.map(file => ({file}))]);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setError(null);
    
    if (e.dataTransfer.files) {
      const pdfFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === 'application/pdf'
      );
      if (pdfFiles.length === 0) {
        setError('Please drop only PDF files');
        return;
      }

      // Get page count of first PDF if it's the only one
      if (pdfFiles.length === 1) {
        const fileBuffer = await pdfFiles[0].arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        setTotalPages(pdf.getPageCount());
      }

      // Append dropped files to existing ones
      setFiles(prevFiles => [...prevFiles, ...pdfFiles.map(file => ({file}))]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (files.length <= 2) {
      setTotalPages(0);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === files.length - 1)) return;

    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePDFs = async (preview: boolean = false) => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    try {
      setIsLoading(true);
      setMergeProgress(0);
      setError(null);
      
      const mergedPdf = await PDFDocument.create();
      let currentPage = 0;

      // First, handle the base PDF if it exists
      const [baseFile, ...additionalFiles] = files;
      const baseBuffer = await baseFile.file.arrayBuffer();
      const basePdf = await PDFDocument.load(baseBuffer);
      const basePages = await mergedPdf.copyPages(basePdf, basePdf.getPageIndices());
      basePages.forEach(page => mergedPdf.addPage(page));
      currentPage = basePages.length;

      // Then handle additional PDFs with their insert positions
      for (const [index, {file, insertAt}] of additionalFiles.entries()) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        if (insertAt !== undefined && insertAt <= currentPage) {
          // Insert pages at specified position
          for (let i = copiedPages.length - 1; i >= 0; i--) {
            mergedPdf.insertPage(insertAt - 1, copiedPages[i]);
          }
        } else {
          // Add pages at the end
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        
        currentPage = mergedPdf.getPageCount();
        setMergeProgress(((index + 1) / additionalFiles.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const mergedPdfFile = await mergedPdf.save();
      
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      if (preview) {
        window.open(url, '_blank');
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `merged_${new Date().toISOString().slice(0,10)}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }

    } catch (error) {
      console.error('Error merging PDFs:', error);
      setError('An error occurred while merging the PDFs. Please try again.');
    } finally {
      setMergeProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setMergeProgress(0);
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-background/50 pb-12 relative mt-[100px] ${dragOver ? 'border-2 border-primary blur-sm' : ''}`}
        onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
    >
      {dragOver && (
        <div className="absolute inset-0 bg-primary/5 border-2 border-primary rounded-lg pointer-events-none z-10 flex items-center justify-center ">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <FileText className="w-12 h-12 text-primary mx-auto mb-2" />
            <p className="text-lg font-medium">Drop PDFs here</p>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Merge PDF Files
          </h1>
          <p className="text-lg text-foreground/70">
            Combine multiple PDF files into a single document securely in your browser. Currently, encrypted PDFs are not supported.
          </p>
          {totalPages > 0 && (
            <p className="text-sm text-foreground/60 mt-2">
              Base PDF has {totalPages} pages. You can insert additional PDFs at specific page numbers.
            </p>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0,y: 20 }}
          animate={{ opacity: 1,y:0}}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              dragOver ? 'border-primary bg-primary/5 scale-102' : 'border-gray-300 hover:border-primary/50'
            }`}
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Drop your PDF files here</h3>
            <p className="mb-6 text-foreground/70">or</p>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
            >
              Choose Files
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 text-destructive p-4 rounded-lg text-center"
            >
              {error}
            </motion.div>
          )}

          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h2>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {files.map(({file}, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 }
                    }}
                    layout
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <motion.div layout className="flex items-center gap-3 flex-1">
                      <motion.div layout>
                        <FileText className="w-5 h-5 text-primary" />
                      </motion.div>
                      <motion.span layout className="text-sm truncate max-w-[200px]">{file.name}</motion.span>
                      {/* {index > 0 && totalPages > 0 && (
                        <motion.input 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          layout
                          type="number"
                          placeholder={`Insert at page (1-${totalPages + 1})`}
                          min="1"
                          max={totalPages + 1}
                          onChange={(e) => updateInsertPage(index, parseInt(e.target.value))}
                          className="ml-2 w-40 px-2 py-1 text-sm border rounded"
                        />
                      )} */}
                    </motion.div>
                    <motion.div layout className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-primary/10 rounded-full disabled:opacity-50"
                      >
                        <MoveUp className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        className="p-1 hover:bg-primary/10 rounded-full disabled:opacity-50"
                      >
                        <MoveDown className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-destructive/10 rounded-full"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </motion.button>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-6 flex gap-4"
              >
                {isLoading ? (
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Merging PDFs...
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${mergeProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => mergePDFs(true)}
                      disabled={files.length < 2}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="primary" 
                      className="flex-1 text-center"
                      onClick={() => mergePDFs(false)}
                      disabled={files.length < 2}
                    >
                      Merge
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          ref={securityRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isSecurityInView ? { opacity: .6, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 bg-card/50 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Secure Processing</h2>
          </div>
          <p className="text-foreground/70">
            Your files are processed entirely in your browser. They never leave your device or get uploaded to any server,
            ensuring complete privacy and security of your documents.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MergePage;
