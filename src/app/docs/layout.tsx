import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://nuvyx-ui.com'),
  title: 'Docs | nuvyx UI',
  description: 'Comprehensive documentation for nuvyx UI - a premium collection of responsive, accessible React components built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.',
  keywords: [
    'React components',
    'UI library',
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Framer Motion',
    'responsive design',
    'accessible components',
    'nuvyx UI',
    'web development',
    'frontend framework'
  ],
  authors: [
    { name: 'Mihir Jaiswal', url: 'https://x.com/nuvyx_ui' }
  ],
  creator: 'Mihir Jaiswal',
  publisher: 'Mihir Jaiswal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nuvyx-ui.com/docs',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nuvyx-ui.com/docs',
    siteName: 'nuvyx UI Documentation',
    title: 'nuvyx UI - Beautiful React Components for Next.js',
    description: 'Premium UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript. Create stunning user interfaces with ease.',
    images: [
      {
        url: '/docs/docs-cover.png',
        width: 1200,
        height: 630,
        alt: 'nuvyx UI Component Library Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nuvyx UI - React Components for Next.js',
    description: 'Beautiful UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript.',
    images: ['/docs/docs-cover.png'],
    creator: '@nuvyx_ui',
    site: '@nuvyx_ui',
  },
  category: 'Technology',
  classification: 'Web Development',
  applicationName: 'nuvyx UI',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  }
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}