import { Metadata } from 'next';
import { componentsData } from "@/nyxui/resgistry";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ component: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ component: string }> }): Promise<Metadata> {
  const { component } = await params;
  
  if (!component) {
    return {
      title: 'Nyx UI Components',
      description: 'Modern UI components for building beautiful Next.js applications',
      openGraph: {
        title: 'Nyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
        url: 'https://nyx-ui.com/components',
      },
      twitter: {
        title: 'Nyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
      },
      alternates: {
        canonical: 'https://nyx-ui.com/components',
      },
    };
  }
  
  const formattedName = component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  if (!componentsData || !(component in componentsData)) {
    return {
      title: 'Component Not Found | Nyx UI',
      description: 'The requested component could not be found in the Nyx UI library.',
    };
  }
  
  const componentData = componentsData[component as keyof typeof componentsData];
  const componentName = componentData?.name || formattedName;
  const componentDescription = componentData?.description || 
    `Learn how to use the ${formattedName} component from Nyx UI. API references, examples, and customization options for building beautiful Next.js applications.`;
  
  return {
    title: `${componentName} | Nyx UI`,
    description: componentDescription,
    openGraph: {
      title: `${componentName} - Nyx UI`,
      description: componentDescription,
      url: `https://nyx-ui.com/components/${component}`,
    },
    twitter: {
      title: `${componentName} - Nyx UI`,
      description: componentDescription,
    },
    alternates: {
      canonical: `https://nyx-ui.com/components/${component}`,
    },
  };
}

export default async function ComponentLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}