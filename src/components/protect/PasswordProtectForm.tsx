"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';

export default function PasswordProtectForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOpenPassword, setShowOpenPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    openPassword: '',
    ownerPassword: '',
  });

  const [permissions, setPermissions] = useState({
    printing: true,
    modifying: false,
    copying: false,
    annotating: true,
  });

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

  const protectPDF = async () => {

    if (!file || !passwords.openPassword) {
      toast.error("Please upload a file and enter an open password");
      return;
    };

    try{
      setIsProcessing(true);
      
      const reader = new FileReader();
      

      reader.onload = async (e) => {
        const existingPdfBytes = new Uint8Array(reader.result as ArrayBuffer);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // const encryptedPdfBytes = await pdfDoc.save({
        //   useObjectStreams: false,
        //   password: passwords.openPassword,
        //   permissions: {
        //     printing: permissions.printing ? 'highResolution' : 'none',
        //     modifying: permissions.modifying,
        //     copying: permissions.copying,
        //     annotating: permissions.annotating
        //   }
        // })

      }

      reader.readAsArrayBuffer(file);

    }catch(error){
      console.error("Error protecting PDF:", error);
      toast.error("Error protecting PDF");
    }

  //   try {
  //     setIsProcessing(true);
  //     const fileBuffer = await file.arrayBuffer();
  //     const pdfDoc = await PDFDocument.load(fileBuffer);
      
  //     // Set passwords and permissions
  //     if (passwords.openPassword) {
  //       pdfDoc.setPassword(passwords.openPassword);
  //     }
      
  //     // Save the encrypted PDF
  //     const pdfBytes = await pdfDoc.save({
  //       password: passwords.ownerPassword || undefined,
  //       permissions: {
  //         printing: permissions.printing ? 'highResolution' : 'none',
  //         modifying: permissions.modifying,
  //         copying: permissions.copying,
  //         annotating: permissions.annotating,
  //       },
  //     });

  //     // Download the protected PDF
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `protected_${file.name}`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error protecting PDF:', error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
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
        {!file ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 dark:bg-secondary/5 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-secondary-light" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground dark:text-foreground/90">
                Upload PDF to Protect
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
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground dark:text-foreground/90">
              {file.name}
            </p>
            <Button
              variant="outline"
              onClick={() => setFile(null)}
            >
              Choose Different File
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
          {/* Password Settings */}
          <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Password Settings</h3>
            <div className="space-y-4">
              {/* Open Password */}
              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-4">
                  Open Password
                </label>
                <div className="relative group">
                  <input
                    type={showOpenPassword ? "text" : "password"}
                    value={passwords.openPassword}
                    onChange={(e) => setPasswords(prev => ({
                      ...prev,
                      openPassword: e.target.value
                    }))}
                    className="w-full px-4 py-3 rounded-xl border-0 bg-secondary/5 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors outline-none ring-0"
                    placeholder="Enter password to protect PDF"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOpenPassword(!showOpenPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {showOpenPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Owner Password */}
              {/* <div>
                <label className="block text-sm font-medium mb-2">
                  Owner Password (Required for changing permissions)
                </label>
                <div className="relative">
                  <input
                    type={showOwnerPassword ? "text" : "password"}
                    value={passwords.ownerPassword}
                    onChange={(e) => setPasswords(prev => ({
                      ...prev,
                      ownerPassword: e.target.value
                    }))}
                    className="w-full p-2 rounded-lg border border-secondary/20 dark:border-secondary/10 bg-white dark:bg-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showOwnerPassword ? (
                      <EyeOff className="w-4 h-4 text-secondary-light" />
                    ) : (
                      <Eye className="w-4 h-4 text-secondary-light" />
                    )}
                  </button>
                </div>
              </div> */}

              {/* Permissions */}
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">
                  Document Permissions
                </label>
                <div className="space-y-2">
                  {Object.entries(permissions).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setPermissions(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="form-checkbox text-primary"
                      />
                      <span className="text-sm capitalize">
                        Allow {key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Protect Button */}
          <div className="text-center">
            <Button
              variant="primary"
              className="w-full sm:w-auto"
              icon={<Lock className="w-4 h-4" />}
              onClick={protectPDF}
              disabled={isProcessing || !passwords.openPassword}
            >
              {isProcessing ? 'Protecting...' : 'Protect PDF'}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 