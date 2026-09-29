import React from 'react';
import { DeliveryCyclePipeline } from './DeliveryCyclePipeline';

export function ExamplePage() {
  return (
    <section className="min-h-screen bg-[#050a12] text-white py-16 px-6">
      <DeliveryCyclePipeline
        onExplorePage={(slug) => {
          // If using Next.js / React Router:
          // router.push(`/services/${slug}`);
          window.location.href = `/services/${slug}`;
        }}
      />
    </section>
  );
}

export default ExamplePage;
export const OrbitalSystemCloneSection = ExamplePage;

