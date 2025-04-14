import { ComponentCard } from './ComponentCard';
import { componentsData } from '../../nuvyxui/data/Data';

export default function ComponentGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative z-40 grid grid-cols-1 items-start gap-20 pb-12 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
        {Object.entries(componentsData.components).map(([slug, component]) => (
          <ComponentCard 
            key={slug}
            slug={slug}
            title={component.title}
            description={component.description}
            imageSrc={component.image}
          />
        ))}
      </div>
    </div>
  );
}
