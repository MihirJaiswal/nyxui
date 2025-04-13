import React from 'react';
import type { Metadata} from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://nyx-ui.com'),
    title: 'Components | Nyx UI',
    description: 'Explore Nyx UI\'s comprehensive component library featuring responsive, accessible, and customizable UI elements built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.',
    keywords: [
      'React components',
      'UI components',
      'Next.js components',
      'Tailwind UI',
      'TypeScript components',
      'Animation components',
      'Framer Motion',
      'UI library',
      'Nyx UI',
      'Design system',
      'Frontend components'
    ],
    authors: [
      { name: 'Mihir', url: 'https://x.com/nyx_ui' },
    ],
    creator: 'Mihir',
    publisher: 'Mihir',
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
      canonical: 'https://nyx-ui.com/components',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://nyx-ui.com/components',
      siteName: 'Nyx UI Components',
      title: 'Nyx UI - Stunning React Components for Next.js Applications',
      description: 'Browse our collection of premium UI components built with Tailwind CSS, Framer Motion, and TypeScript. Create beautiful user interfaces with minimal effort.',
      images: [
        {
          url: '/docs/docs-cover.png',
          width: 1200,
          height: 630,
          alt: 'Nyx UI Components Preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nyx UI - Modern React Components Library',
      description: 'Discover beautiful UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript.',
      images: ['/docs/docs-cover.png'],
      creator: '@nyx_ui',
      site: '@nyx_ui',
    },
    category: 'Technology',
    classification: 'Web Development',
    applicationName: 'Nyx UI',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    }
  };

export default function ComponentsLayout({
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
