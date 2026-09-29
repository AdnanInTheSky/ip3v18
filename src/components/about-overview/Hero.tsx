import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden py-16 md:py-24 bg-[#0E1A22] text-[#F3F0E8] border-b border-[#3C3F45]"
    >
      {/* Dummy Background Image with Atmospheric Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Architectural Policy Institution Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 filter saturate-50 contrast-125 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1A22]/95 via-[#0E1A22]/85 to-[#0E1A22]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1A22] via-transparent to-[#0E1A22] opacity-80" />
      </div>

      {/* Background Graphic Grid / Ambient Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-[#EF715A]/20 via-[#F59E0B]/08 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        {/* Editorial Title matching institutional branding in image */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="editorial-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-serif font-normal text-[#F3F0E8] leading-[1.08] tracking-tight"
        >
          <span className="block mb-1 sm:mb-2">About IP3 Consulting:</span>
          <span className="block mb-1 sm:mb-2">
            <span className="serif-italic italic text-[#EF715A] font-serif pr-2 sm:pr-3">Translational</span>
            <span>Policy</span>
          </span>
          <span className="block">
            <span className="serif-italic italic text-[#F3F0E8] font-serif pr-2 sm:pr-3">&amp;</span>
            <span>Systems Advisory</span>
          </span>
        </motion.h1>

        {/* Subtitle / Descriptive Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-3xl text-slate-300 sm:text-[#AEB0AE] text-base sm:text-lg md:text-xl font-sans font-normal leading-relaxed"
        >
          We understand interconnected complexity, translate intelligence into actionable architecture, and work alongside institutions to carry solutions from policy vision through implementation, learning and scale.
        </motion.p>
      </div>
    </section>
  );
};
