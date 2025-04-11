import { Plus, ArrowLeftRight, ChevronDown } from "lucide-react";

export const pdfTools = [
  {
    id: 'merge',
    icon: Plus,
    title: 'Merge PDFs',
    description: 'Because apparently having 47 separate PDF files isn\'t chaotic enough. Smoosh them all together into one magnificent document that your colleagues will definitely read all the way through.',
    action: {
      text: 'Get Started',
      loadingText: 'Processing...'
    },
    link: '/merge',
    active: true
  },
  {
    id: 'convert',
    icon: ArrowLeftRight,
    title: 'Convert PDFs',
    description: 'Transform your PDFs into other formats, then back again, then wonder why you did that in the first place. Perfect for when you just can\'t decide which file format you prefer today.',
    action: {
      text: 'Convert Now'
    },
    link: '/convert',
    active: false
  },
  {
    id: 'compress',
    icon: ChevronDown,
    title: 'Compress PDFs',
    description: 'Squeeze your massive PDF files until they\'re small enough to actually email without getting that passive-aggressive "mailbox full" response. Warning: May cause slight pixel claustrophobia.',
    action: {
      text: 'Optimize Now'
    },
    link: '/compress',
    active: false
  }
  ,
  {
    id: 'split',
    icon: ArrowLeftRight,
    title: 'Split PDFs',
    description: 'For when your 400-page manifesto needs to become 400 separate files. Because nothing says "I respect your time" like sending multiple PDFs instead of just one.',
    action: {
      text: 'Split Now'
    },
    link: '/split',
    active: false
  },
  {
    id: 'protect',
    icon: ChevronDown, 
    title: 'Protect PDFs',
    description: 'Add military-grade encryption to your cookie recipe PDF. Because someone might steal your grandmother\'s secret ingredient (it\'s love, by the way). Includes a password you\'ll definitely forget in 3 days.',
    action: {
      text: 'Secure Now'
    },
    link: '/protect',
    active: false
  },
  {
    id: 'rotate',
    icon: ArrowLeftRight,
    title: 'Rotate PDFs',
    description: 'For those special moments when your scanner decides everything should be sideways. Now you can fix it without having to tilt your head 90 degrees to read. Your chiropractor will thank you.',
    action: {
      text: 'Rotate Now'
    },
    link: '/rotate',
    active: false
  },
  {
    id: 'extract',
    icon: Plus,
    title: 'Extract Pages',
    description: 'Perform precise PDF surgery to remove those three pages your boss definitely shouldn\'t see. Like a document witness protection program, but without the fake mustaches.',
    action: {
      text: 'Extract Now'
    },
    link: '/extract', 
    active: false
  }
] as const;

export type PdfTool = typeof pdfTools[number]; 