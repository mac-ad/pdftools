import {  FileText, FilePlus, FileDown, Scissors, Lock, Brain, FileSearch, FileSignature, FileImage, FileCode, FileCheck, Settings, LucideIcon } from "lucide-react";

const categoryIds = {
  essential: 'essential',
  security: 'security',
  advanced: 'advanced',
  content: 'content',
  utilities: 'utilities'
}

export type PdfTool = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  smallDescription: string;
  action: {
    text: string;
  };
  link: string;
  active: boolean;
  category: string;
};


export const pdfTools: PdfTool[] = [
  {
    id: 'merge',
    icon: FileText,
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document. Perfect for creating reports, portfolios, or consolidating documents.',
    smallDescription: 'Merge multiple PDFs into one',
    action: {
      text: 'Merge Now',
    },
    link: '/merge',
    active: true,
    category: categoryIds.essential
  },
  {
    id: 'convert',
    icon: FilePlus,
    title: 'Convert Files',
    description: 'Transform PDFs to and from Word, Excel, PowerPoint, and images. Maintain formatting and layout with high accuracy.',
    smallDescription: 'Convert PDFs to other formats',
    action: {
      text: 'Convert Now'
    },
    link: '/convert',
    active: true,
    category: categoryIds.essential
  },
  {
    id: 'compress',
    icon: FileDown,
    title: 'Compress PDFs',
    description: 'Reduce PDF file size without compromising quality. Ideal for email attachments and saving storage space.',
    smallDescription: 'Compress PDF files',
    action: {
      text: 'Optimize Now'
    },
    link: '/compress',
    active: false,
    category: categoryIds.essential
  },
  {
    id: 'split',
    icon: Scissors,
    title: 'Split PDFs',
    description: 'Extract specific pages or split large PDFs into smaller documents. Create custom page ranges with ease.',
    smallDescription: 'Split PDFs into multiple files',
    action: {
      text: 'Split Now'
    },
    link: '/split',
    active: true,
    category: categoryIds.essential
  },
  {
    id: 'protect',
    icon: Lock,
    title: 'Secure PDFs',
    description: 'Add password protection, encrypt sensitive documents, and control access permissions to your PDFs.',
    smallDescription: 'Protect PDFs with a password',
    action: {
      text: 'Secure Now'
    },
    link: '/protect',
    active: true,
    category: categoryIds.security
  },
  {
    id: 'smart',
    icon: Brain,
    title: 'Smart Tools',
    description: 'AI-powered features for automatic formatting detection and layout preservation during conversions.',
    smallDescription: 'AI-powered PDF tools',
    action: {
      text: 'Try Now'
    },
    link: '/smart',
    active: false,
    category: categoryIds.advanced
  },
  {
    id: 'ocr',
    icon: FileSearch,
    title: 'OCR Technology',
    description: 'Convert scanned documents into searchable, editable PDFs with our advanced OCR technology.',
    smallDescription: 'Make PDFs searchable',
    action: {
      text: 'Convert Now'
    },
    link: '/ocr',
    active: false,
    category: categoryIds.advanced
  },
  {
    id: 'sign',
    icon: FileSignature,
    title: 'E-Signatures',
    description: 'Add electronic signatures to your PDFs. Create, manage, and track document signatures securely.',
    smallDescription: 'Sign PDFs electronically',
    action: {
      text: 'Sign Now'
    },
    link: '/sign',
    active: false,
    category: categoryIds.advanced
  },
  {
    id: 'extract-images',
    icon: FileImage,
    title: 'Image Extraction',
    description: 'Extract images from PDFs while maintaining original quality. Save as PNG, JPEG, or other formats.',
    smallDescription: 'Extract images from PDFs',
    action: {
      text: 'Extract Now'
    },
    link: '/extract-images',
    active: false,
    category: categoryIds.content
  },
  {
    id: 'metadata',
    icon: FileCode,
    title: 'Metadata Editor',
    description: 'View and edit PDF metadata, including title, author, keywords, and custom properties.',
    smallDescription: 'Edit PDF metadata',
    action: {
      text: 'Edit Now'
    },
    link: '/metadata',
    active: false,
    category: categoryIds.content
  },
  {
    id: 'repair',
    icon: FileCheck,
    title: 'PDF Repair',
    description: 'Fix corrupted PDFs and recover content from damaged files. Restore accessibility and functionality.',
    smallDescription: 'Fix corrupted PDFs',
    action: {
      text: 'Repair Now'
    },
    link: '/repair',
    active: false,
    category: categoryIds.utilities
  },
  {
    id: 'batch',
    icon: Settings,
    title: 'Batch Processing',
    description: 'Process multiple PDFs simultaneously. Apply operations to hundreds of files with one click.',
    smallDescription: 'Process multiple PDFs',
    action: {
      text: 'Start Batch'
    },
    link: '/batch',
    active: false,
    category: categoryIds.utilities
  }
] as const;

export type PdfToolCategory = {
  id: string;
  title: string;
  description: string;
  tools: string[];
};


export const toolsCategories: PdfToolCategory[] = [
  {
    id: categoryIds.essential,
    title: 'Essential Tools',
    description: 'Basic PDF operations for everyday use',
    tools: ['merge', 'convert', 'compress', 'split']
  },
  {
    id: categoryIds.security,
    title: 'Security & Privacy',
    description: 'Tools to protect and secure your documents',
    tools: ['protect']
  },
  {
    id: categoryIds.advanced,
    title: 'Advanced Features',
    description: 'Professional PDF manipulation tools',
    tools: ['smart', 'ocr', 'sign']
  },
  {
    id: categoryIds.content,
    title: 'Content Management',
    description: 'Extract and manage PDF content',
    tools: ['extract-images', 'metadata']
  },
  {
    id: categoryIds.utilities,
    title: 'Utilities',
    description: 'Additional PDF utilities and tools',
    tools: ['repair', 'batch']
  }
]



