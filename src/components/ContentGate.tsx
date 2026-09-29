import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { LoadingScreen } from './LoadingScreen';

/**
 * Gating screen that displays an institutional loading screen while fetching
 * published content and models from the backend.
 */
export const ContentGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, syncStatus } = useCMS();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isLoaderFinished && (
          <LoadingScreen
            isLoaded={isLoaded}
            onFinished={() => setIsLoaderFinished(true)}
          />
        )}
      </AnimatePresence>

      {/* Mount children once backend responds or loader finishes */}
      {(isLoaded || isLoaderFinished) && children}
    </>
  );
};

export default ContentGate;


