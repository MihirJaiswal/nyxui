import { MorphingButton } from '@/nyxui/components/MorphingButton';
import { ArrowRight, Plus, Trash } from 'lucide-react';

export const MorphingButtonDemo = () => {
  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-4 flex-wrap">
        <MorphingButton variant="expand" color="primary">
          Expand Button
        </MorphingButton>
        
        <MorphingButton variant="collapse" color="secondary" icon={<ArrowRight />} iconPosition="right">
          Collapse Button
        </MorphingButton>
        
        <MorphingButton variant="rotate" color="success" icon={<Plus />} iconPosition="left">
          Rotate Button
        </MorphingButton>
        
        <MorphingButton variant="skew" color="danger" icon={<Trash />} iconPosition="only">
          Skew Button
        </MorphingButton>
        
        <MorphingButton variant="liquid" color="warning" size="lg">
          Liquid Button
        </MorphingButton>
      </div>
    </div>
  );
}