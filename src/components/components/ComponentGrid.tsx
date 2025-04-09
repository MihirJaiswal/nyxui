import { ComponentCard } from './ComponentCard';
import { componentsData } from '../../nyxui/data/Data';

export default function ComponentGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
