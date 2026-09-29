import React from 'react';
import { DeliveryCyclePipeline } from './DeliveryCyclePipeline';

export interface DeliveryCyclePipelineSectionProps {
  className?: string;
  onExplorePage?: (slug: string) => void;
}

export const DeliveryCyclePipelineSection: React.FC<DeliveryCyclePipelineSectionProps> = ({
  className = '',
  onExplorePage,
}) => {
  return (
    <div
      id="delivery-cycle-pipeline-wrapper"
      className={`w-full px-0 mx-0 mt-10 pt-4 border-0 relative z-10 ${className}`}
    >
      <DeliveryCyclePipeline onExplorePage={onExplorePage} showDetailCard={false} />
    </div>
  );
};

export default DeliveryCyclePipelineSection;
