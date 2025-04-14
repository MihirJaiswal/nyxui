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
      title: 'Nuvyx UI Components',
      description: 'Modern UI components for building beautiful Next.js applications',
      openGraph: {
        title: 'Nuvyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
        url: 'https://nuvyxui.vercel.app/components',
      },
      twitter: {
        title: 'Nuvyx UI Components',
        description: 'Modern UI components for building beautiful Next.js applications',
      },
      alternates: {
        canonical: 'https://nuvyxui.vercel.app/components',
      },
    };
  }
  
  const formattedName = component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  if (!componentsData || !(component in componentsData)) {
    return {
      title: 'Component Not Found | Nuvyx UI',
      description: 'The requested component could not be found in the Nuvyx UI library.',
    };
  }
  
  const componentData = componentsData[component as keyof typeof componentsData];
  const componentName = componentData?.name || formattedName;
  const componentDescription = componentData?.description || 
    `Learn how to use the ${formattedName} component from Nuvyx UI. API references, examples, and customization options for building beautiful Next.js applications.`;
  
  return {
    title: `${componentName} | Nuvyx UI`,
    description: componentDescription,
    openGraph: {
      title: `${componentName} - Nuvyx UI`,
      description: componentDescription,
      url: `https://nuvyxui.vercel.app/components/${component}`,
    },
    twitter: {
      title: `${componentName} - Nuvyx UI`,
      description: componentDescription,
    },
    alternates: {
      canonical: `https://nuvyxui.vercel.app/components/${component}`,
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