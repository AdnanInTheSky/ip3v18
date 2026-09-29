import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  isLoaded: boolean;
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoaded,
  onFinished,
}) => {
  // When loaded, trigger smooth completion with slight delay
  useEffect(() => {
    if (isLoaded) {
      const exitTimer = setTimeout(() => {
        onFinished();
      }, 300);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoaded, onFinished]);

  // Safety fallback: allow exit after 3 seconds if network stalled
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      onFinished();
    }, 3000);
    return () => clearTimeout(safetyTimer);
  }, [onFinished]);

  return (
    <motion.div
      id="ip3-loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050a12] text-slate-100 select-none"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Professional Minimalist Circular Spinner */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Subtle background track */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
          
          {/* Rotating active circle segment */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff7e67] animate-spin"
            style={{ animationDuration: '0.85s' }}
          />

          {/* Core dot indicator */}
          <div className="w-2 h-2 rounded-full bg-[#ff7e67]/80" />
        </div>

        {/* Minimal clean label */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-wider uppercase text-slate-200 font-sans">
            IP3
          </p>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Loading…
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
