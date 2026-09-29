import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SlideItem } from '../types';
import { VideoModal } from './VideoModal';
import { GetStartedModal } from './GetStartedModal';
import { useCMS } from '../context/CMSContext';

const FALLBACK_SLIDE_IMAGES: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop',
  4: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  5: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop',
  6: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop',
  7: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
};

interface PresentationSliderProps {
  slides?: SlideItem[];
  currentSlideId: number;
  onChangeSlide: (id: number) => void;
  autoplayInterval?: number;
}

export const PresentationSlider: React.FC<PresentationSliderProps> = ({
  slides: slidesProp,
  currentSlideId,
  onChangeSlide,
  autoplayInterval = 5000,
}) => {
  const { data } = useCMS();
  // Slides come from MongoDB; the prop is only an explicit override.
  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : data.slides;
  const theme = data.themeConfig || {
    primaryColor: '#ff7e67',
    accentColor: '#2dd4bf',
    heroTitleColor: '#f8fafc',
    heroSubtitleColor: '#94a3b8',
    heroTagColor: '#ff7e67',
    heroButtonBgColor: '#ff7e67',
    heroButtonTextColor: '#070d18',
    heroOverlayStyle: 'none',
  };

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Modal states
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const currentIndex = slides.findIndex((s) => s.id === currentSlideId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentSlide = slides[safeIndex] || slides[0];

  // Dynamic colors resolved from slide-level overrides or global CMS theme settings
  const activeTitleColor = currentSlide.titleColor || theme.heroTitleColor || '#f8fafc';
  const activeSubtitleColor = currentSlide.subtitleColor || theme.heroSubtitleColor || '#94a3b8';
  const activeButtonBg = currentSlide.ctaBgColor || currentSlide.accentColor || theme.heroButtonBgColor || '#ff7e67';
  const activeButtonText = currentSlide.ctaTextColor || theme.heroButtonTextColor || '#070d18';

  const displayImage = currentSlide?.bgImage || FALLBACK_SLIDE_IMAGES[currentSlide?.id] || FALLBACK_SLIDE_IMAGES[1];

  const handleNext = () => {
    setIsAnimating(true);
    const idx = slides.findIndex((s) => s.id === currentSlideId);
    const nxtIdx = (idx + 1) % slides.length;
    onChangeSlide(slides[nxtIdx].id);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    const idx = slides.findIndex((s) => s.id === currentSlideId);
    const prvIdx = (idx - 1 + slides.length) % slides.length;
    onChangeSlide(slides[prvIdx].id);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Autoplay timer with visual progress
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    let stepTimer: ReturnType<typeof setInterval>;

    if (isPlaying && !isVideoOpen && !isGetStartedOpen) {
      const stepMs = 50;
      const increment = (stepMs / autoplayInterval) * 100;

      stepTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + increment;
        });
      }, stepMs);

      timer = setInterval(() => {
        handleNext();
      }, autoplayInterval);
    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [isPlaying, currentSlideId, isVideoOpen, isGetStartedOpen, autoplayInterval, slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideId, slides]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050a12] overflow-hidden select-none font-sans text-slate-100 flex flex-col justify-between">
      
      {/* Slide Image as Section Background - Clean, no overlays or shadows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={currentSlide.id}
          src={displayImage}
          alt={currentSlide.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${
            isAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
          }`}
        />
      </div>

      {/* Main Section Content Area (Container Fluid: Full Width) */}
      <div 
        id="hero-content-area"
        className="relative z-10 w-full flex-1 flex items-end justify-start pt-24"
        style={{ padding: 0 }}
      >
        {/* Content Card (Flush to left & bottom with margin 0, clean with no shadow) */}
        <div 
          id="hero-content-card"
          className={`w-[586.8px] max-w-full text-left ml-0 mb-0 p-5 sm:p-6 lg:p-7 rounded-tr-2xl rounded-br-2xl bg-[#081220]/90 backdrop-blur-xl border-y border-r border-slate-700/60 space-y-5 transition-all duration-500 ease-out transform ${
            isAnimating ? 'scale-[0.98] opacity-0 translate-y-3' : 'scale-100 opacity-100 translate-y-0'
          }`}
          style={{ width: '586.8px', marginLeft: '0px', marginBottom: '0px' }}
        >
          {/* Hero Title */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-[1.2] transition-colors duration-300"
            style={{
              color: activeTitleColor,
              ...(currentSlide.titleFontSize ? { fontSize: currentSlide.titleFontSize } : {}),
              ...(currentSlide.fontFamily ? { fontFamily: `'${currentSlide.fontFamily}', sans-serif` } : {}),
            }}
          >
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          {currentSlide.subtitle && (
            <p
              className="text-sm sm:text-base font-sans font-normal text-slate-300 leading-relaxed max-w-lg transition-colors duration-300"
              style={{
                color: activeSubtitleColor,
                ...(currentSlide.subtitleFontSize ? { fontSize: currentSlide.subtitleFontSize } : {}),
              }}
            >
              {currentSlide.subtitle}
            </p>
          )}

          {/* Action Button */}
          <div className="pt-2 flex flex-wrap items-center justify-start gap-3">
            <button
              onClick={() => setIsGetStartedOpen(true)}
              style={{
                backgroundColor: activeButtonBg,
                color: activeButtonText,
              }}
              className="group px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:brightness-105 active:translate-y-0 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer border border-[#ff7e67]/50 shadow-lg shadow-black/30"
            >
              <span>{currentSlide.ctaText || 'Get Started'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        slide={currentSlide}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* Get Started Modal */}
      <GetStartedModal
        slide={currentSlide}
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

    </div>
  );
};

export default PresentationSlider;

