import React, { useCallback, useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { LoadingScreen } from './LoadingScreen';

/**
 * Gating screen that displays an institutional loading screen while fetching
 * published content and models from the backend.
 */
export const ContentGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, syncStatus } = useCMS();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const handleFinished = useCallback(() => setIsLoaderFinished(true), []);

  useEffect(() => {
    const timer = window.setTimeout(handleFinished, isLoaded ? 300 : 3000);
    return () => window.clearTimeout(timer);
  }, [handleFinished, isLoaded]);

  return (
    <>
      {!isLoaderFinished && <LoadingScreen />}

      {/* Mount children once backend responds or loader finishes */}
      {(isLoaded || isLoaderFinished) && children}
    </>
  );
};

export default ContentGate;


