import { Metadata } from 'next';
import { componentsData } from "@/nuvyxui/resgistry";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ component: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ component: string }> }): Promise<Metadata> {
  const { component } = await params;
  
  if (!component) {
    return {
      title: 'nuvyx UI Components',
      description: 'Modern UI components for building beautiful Next.js applications',
      openGraph: {
        title: 'nuvyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
        url: 'https://nuvyx-ui.com/components',
      },
      twitter: {
        title: 'nuvyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
      },
      alternates: {
        canonical: 'https://nuvyx-ui.com/components',
      },
    };
  }
  
  const formattedName = component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  if (!componentsData || !(component in componentsData)) {
    return {
      title: 'Component Not Found | nuvyx UI',
      description: 'The requested component could not be found in the nuvyx UI library.',
    };
  }
  
  const componentData = componentsData[component as keyof typeof componentsData];
  const componentName = componentData?.name || formattedName;
  const componentDescription = componentData?.description || 
    `Learn how to use the ${formattedName} component from nuvyx UI. API references, examples, and customization options for building beautiful Next.js applications.`;
  
  return {
    title: `${componentName} | nuvyx UI`,
    description: componentDescription,
    openGraph: {
      title: `${componentName} - nuvyx UI`,
      description: componentDescription,
      url: `https://nuvyx-ui.com/components/${component}`,
    },
    twitter: {
      title: `${componentName} - nuvyx UI`,
      description: componentDescription,
    },
    alternates: {
      canonical: `https://nuvyx-ui.com/components/${component}`,
    },
  };
}

export default async function ComponentLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}