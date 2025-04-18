"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { useMixpanel } from "@/Context/MixpanelProvider";
import { MIXPANEL_EVENTS } from "@/constants/mixpanel";
import { degrees, PDFDocument, StandardFonts } from "pdf-lib";

type WatermarkType = "text" | "image";
type WatermarkPosition = "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface WatermarkFormData {
  type: WatermarkType;
  text?: string;
  image?: File;
  position: WatermarkPosition;
  opacity: number;
  rotation: number;
  fontSize?: number;
  fontWeight?: number;
  imageSize?: number;
}

const DEFAULT_FORM_DATA: WatermarkFormData = {
  type: "text",
  text: "",
  position: "center", 
  opacity: 50,
  rotation: 0,
  fontSize: 48,
  imageSize: 100,
  fontWeight: 400
};

const CANVAS_DIMENSIONS = {
  width: 600,
  height: 800
};

export default function WatermarkPdfForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { sendEvent } = useMixpanel();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<WatermarkFormData>(DEFAULT_FORM_DATA);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setSelectedFile(file);
      sendEvent(MIXPANEL_EVENTS.FILE_SELECTED, { 
        type: "pdf", 
        size: file.size ,
        name: file.name
      });
    }
  };

  const handleWatermarkTypeChange = (type: WatermarkType) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const getPreviewPosition = (position: WatermarkPosition, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas;
    const positions = {
      center: { x: width/2, y: height/2 },
      topLeft: { x: 50, y: 50 },
      topRight: { x: width - 50, y: 50 },
      bottomLeft: { x: 50, y: height - 50 },
      bottomRight: { x: width - 50, y: height - 50 }
    };
    return positions[position];
  };

  const renderPreview = async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !selectedFile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get position
    const { x, y } = getPreviewPosition(formData.position, canvas);

    // Apply transformations
    ctx.globalAlpha = formData.opacity / 100;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((formData.rotation * Math.PI) / 180);

    // Draw watermark
    if (formData.type === "text" && formData.text) {
      ctx.font = `${formData.fontWeight} ${formData.fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(formData.text, 0, 0);
    }

    ctx.restore();
  };

//   const drawImageWatermark = async (ctx: CanvasRenderingContext2D, image: File, size?: number) => {
//     const img = new Image();
//     img.src = URL.createObjectURL(image);
    
//     await new Promise<void>((resolve) => {
//       img.onload = () => {
//         const scale = size ? size / 100 : 1;
//         const width = img.width * scale;
//         const height = img.height * scale;
//         ctx.drawImage(img, -width/2, -height/2, width, height);
//         URL.revokeObjectURL(img.src);
//         resolve();
//       };
//     });
//   };

  useEffect(() => {
    renderPreview();
  }, [formData, selectedFile]);

  const rotatePoint = (x: number, y: number, angleInDegrees: number) => {
    const angle = angleInDegrees * (Math.PI / 180);
    return {
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle)
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);
    sendEvent(MIXPANEL_EVENTS.TOOL_START, { 
      tool: "watermark",
      type: formData.type
    });
    try {
      const pdfDoc = await PDFDocument.load(await selectedFile.arrayBuffer());
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        await processPage(page, width, height);
      }

      await saveAndDownloadPdf(pdfDoc);
      
      sendEvent(MIXPANEL_EVENTS.TOOL_COMPLETE, { 
        tool: "watermark",
        type: formData.type
      });
    } catch (error) {
      console.error("Error processing watermark:", error);
      sendEvent(MIXPANEL_EVENTS.TOOL_ERROR, { 
        tool: "watermark",
        type: formData.type,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processPage = async (page: any, width: number, height: number) => {
    if (formData.type === "text" && formData.text) {
      const font = await page.doc.embedFont(StandardFonts.Helvetica);
      const textWidth = formData.fontSize ? font.widthOfTextAtSize(formData.text, formData.fontSize) : 0;
      const textHeight = formData.fontSize ? font.heightAtSize(formData.fontSize) : 0;

      const position = calculateTextPosition(width, height, textWidth, textHeight);
      const rotatedCoords = rotatePoint(-textWidth/2, -textHeight/2, -formData.rotation);

      page.drawText(formData.text, {
        x: position.x + rotatedCoords.x,
        y: position.y + rotatedCoords.y,
        size: formData.fontSize,
        opacity: formData.opacity / 100,
        rotate: degrees(-formData.rotation),
        font: font,
        xSkew: degrees(0),
        ySkew: degrees(0),
        weight: formData.fontWeight
      });
    }
  };

  const calculateTextPosition = (pageWidth: number, pageHeight: number, textWidth: number, textHeight: number) => {
    const positions = {
      center: { x: pageWidth/2, y: pageHeight/2 },
      topLeft: { x: 50 + textWidth/2, y: pageHeight - 50 - textHeight/2 },
      topRight: { x: pageWidth - 50 - textWidth/2, y: pageHeight - 50 - textHeight/2 },
      bottomLeft: { x: 50 + textWidth/2, y: 50 + textHeight/2 },
      bottomRight: { x: pageWidth - 50 - textWidth/2, y: 50 + textHeight/2 }
    };
    return positions[formData.position];
  };

  const saveAndDownloadPdf = async (pdfDoc: PDFDocument) => {
    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    sendEvent(MIXPANEL_EVENTS.FILE_DOWNLOADED, { 
      tool: "watermark",
      type: formData.type,
      fileSize: selectedFile?.size
    });
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `watermarked-${selectedFile?.name}`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-foreground/20 dark:border-foreground/10 rounded-lg p-8 text-center col-span-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer block"
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-foreground/90 font-medium">
                {selectedFile ? selectedFile.name : "Drop your PDF here or click to upload"}
              </div>
              <div className="text-sm text-foreground/60">
                Maximum file size: 10MB
              </div>
            </div>
          </label>
        </div>

        {/* Watermark Options */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={formData.type === "text" ? "default" : "outline"}
              onClick={() => handleWatermarkTypeChange("text")}
            >
              Text Watermark
            </Button>
          </div>

            {formData.type === "text" && (
                <>
                    <input
                        type="text"
                        placeholder="Enter watermark text"
                        className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background"
                        value={formData.text}
                        onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                        disabled = {selectedFile === null}
                    />
                    <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <input
                        type="range"
                        min="12"
                        max="120"
                        value={formData.fontSize}
                        onChange={(e) => setFormData(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                        className="w-full"
                        disabled = {selectedFile === null}
                    />
                    </div>
                </>
            )}

            {formData.type === "image" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData(prev => ({ ...prev, image: file }));
                    }
                  }}
                  className="w-full"
                />
              </motion.div>
            )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Opacity ({formData.opacity}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.opacity}
                onChange={(e) => setFormData(prev => ({ ...prev, opacity: Number(e.target.value) }))}
                className="w-full"
                disabled = {selectedFile === null}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rotation ({formData.rotation}°)</label>
              <input
                type="range"
                min="-180"
                max="180"
                value={formData.rotation}
                onChange={(e) => setFormData(prev => ({ ...prev, rotation: Number(e.target.value) }))}
                className="w-full"
                disabled = {selectedFile === null}
              />
            </div>


            {/* <div>
              <label className="block text-sm font-medium mb-2">Font Width</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background"
                disabled={selectedFile === null}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFormData(prev => ({ ...prev, fontWeight: value }));
                }}
                value={formData.fontWeight || 400}
              >
                <option value={400}>Normal</option>
                <option value={900}>Bold</option>
              </select>
            </div> */}
          </div>
        </div>
        <Button
            type="submit"
            className="w-full mt-10"
            disabled={!selectedFile || isProcessing}
            variant="primary"
        >
            {isProcessing ? "Processing..." : "Download Watermarked PDF"}
        </Button>
       
      </form>

      {/* Preview Canvas */}
      {selectedFile && (
        <div className="border rounded-lg p-4 mt-8">
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <canvas 
            ref={previewCanvasRef}
            width={CANVAS_DIMENSIONS.width}
            height={CANVAS_DIMENSIONS.height}
            className="w-full border rounded bg-white"
          />
        </div>

        
      )}

    
    </div>
  );
}
