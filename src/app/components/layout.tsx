import React from 'react';
import type { Metadata} from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://nuvyx-ui.com'),
    title: 'Components | nuvyx UI',
    description: 'Explore nuvyx UI\'s comprehensive component library featuring responsive, accessible, and customizable UI elements built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.',
    keywords: [
      'React components',
      'UI components',
      'Next.js components',
      'Tailwind UI',
      'TypeScript components',
      'Animation components',
      'Framer Motion',
      'UI library',
      'nuvyx UI',
      'Design system',
      'Frontend components'
    ],
    authors: [
      { name: 'Mihir', url: 'https://x.com/nuvyx_ui' },
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
      canonical: 'https://nuvyx-ui.com/components',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://nuvyx-ui.com/components',
      siteName: 'nuvyx UI Components',
      title: 'nuvyx UI - Stunning React Components for Next.js Applications',
      description: 'Browse our collection of premium UI components built with Tailwind CSS, Framer Motion, and TypeScript. Create beautiful user interfaces with minimal effort.',
      images: [
        {
          url: '/docs/docs-cover.png',
          width: 1200,
          height: 630,
          alt: 'nuvyx UI Components Preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'nuvyx UI - Modern React Components Library',
      description: 'Discover beautiful UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript.',
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
