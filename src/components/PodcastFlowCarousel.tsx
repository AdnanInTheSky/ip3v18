import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { PodcastCardItem } from '../types';

export type { PodcastCardItem };

// Default items matching the exact design and thumbnails
export const DEFAULT_PODCAST_ITEMS: PodcastCardItem[] = [
  {
    id: 'ep-1',
    title: 'Problem Solving কি বাস্তব জীবনে প্রভাব ফেলে?',
    imageSrc: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Problem Solving কি',
    headlinePrimary: 'বাস্তব জীবনে',
    headlineSecondary: 'প্রভাব ফেলে?',
    questionMark: true,
  },
  {
    id: 'ep-2',
    title: 'PHITRON এর STUDENT PODCAST স্ক্রিপ্টেড হয়?',
    imageSrc: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    badgeText: 'PHITRON এর',
    headlinePrimary: 'STUDENT PODCAST',
    headlineSecondary: 'স্ক্রিপ্টেড হয়?',
    questionMark: true,
  },
  {
    id: 'ep-3',
    title: 'ডিপ্লোমা স্টুডেন্টদের ভবিষ্যৎ!',
    imageSrc: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    badgeText: 'ডিপ্লোমা স্টুডেন্টদের',
    headlinePrimary: 'ভবিষ্যৎ!',
    headlineSecondary: '',
  },
  {
    id: 'ep-4',
    title: 'প্রোগ্রামিং-এর জন্য স্বপ্নের পাবলিক ভার্সিটি ছেড়ে দিলাম!',
    imageSrc: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80',
    badgeText: 'প্রোগ্রামিং-এর জন্য',
    headlinePrimary: 'স্বপ্নের পাবলিক ভার্সিটি',
    headlineSecondary: 'ছেড়ে দিলাম!',
  },
];

interface PodcastFlowCarouselProps {
  items?: PodcastCardItem[];
  onItemClick?: (item: PodcastCardItem) => void;
  speed?: number; // pixels per second (default: 38)
}

export const PodcastFlowCarousel: React.FC<PodcastFlowCarouselProps> = ({
  items = DEFAULT_PODCAST_ITEMS,
  onItemClick,
  speed = 38,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef<number>(0);

  // Drag tracking
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  // Smooth button nudge animation
  const targetOffsetRef = useRef<number | null>(null);

  // Replicated 3 times to achieve an imperceptible, seamless infinite loop
  const repeatedItems = [...items, ...items, ...items];

  // Measure one full loop set width
  const measureWidths = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.flow-carousel-card');
    if (cards.length === 0) return;

    let width = 0;
    for (let i = 0; i < items.length; i++) {
      const card = cards[i];
      if (card) {
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 20;
        width += card.offsetWidth + marginRight;
      }
    }

    if (width > 0) {
      singleSetWidthRef.current = width;
    }
  }, [items.length]);

  useEffect(() => {
    measureWidths();
    window.addEventListener('resize', measureWidths);
    return () => window.removeEventListener('resize', measureWidths);
  }, [measureWidths]);

  // Continuous flowing animation loop via GPU-accelerated translate3d
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const singleWidth = singleSetWidthRef.current;

      // Smooth navigation nudge interpolation
      if (targetOffsetRef.current != null) {
        const diff = targetOffsetRef.current - offsetRef.current;
        if (Math.abs(diff) > 0.5) {
          offsetRef.current += diff * Math.min(1, deltaTime * 8);
        } else {
          offsetRef.current = targetOffsetRef.current;
          targetOffsetRef.current = null;
        }
      }
      // Continuous auto-flow when not hovered/dragged
      else if (!isHovered && !isDragging && singleWidth > 0) {
        offsetRef.current += speed * deltaTime;
      }

      // Seamless infinite wrapping
      if (singleWidth > 0) {
        if (offsetRef.current >= singleWidth) {
          offsetRef.current -= singleWidth;
          if (targetOffsetRef.current != null) targetOffsetRef.current -= singleWidth;
        } else if (offsetRef.current < 0) {
          offsetRef.current += singleWidth;
          if (targetOffsetRef.current != null) targetOffsetRef.current += singleWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHovered, isDragging, speed]);

  const handleManualNudge = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.flow-carousel-card');
    const step = card ? card.offsetWidth + 20 : 360;
    const current = targetOffsetRef.current ?? offsetRef.current;
    targetOffsetRef.current = direction === 'right' ? current + step : current - step;
  };

  // Drag & Swipe handling
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartXRef.current = clientX;
    dragStartOffsetRef.current = offsetRef.current;
    targetOffsetRef.current = null;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) {
      hasMovedRef.current = true;
    }
    const singleWidth = singleSetWidthRef.current;
    let newOffset = dragStartOffsetRef.current - delta;

    if (singleWidth > 0) {
      if (newOffset >= singleWidth) newOffset -= singleWidth;
      else if (newOffset < 0) newOffset += singleWidth;
    }

    offsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${newOffset}px, 0, 0)`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative w-full py-6 sm:py-10 overflow-hidden select-none bg-transparent">
      <div className="w-full relative px-0 bg-transparent">
        {/* Carousel Outer Wrapper */}
        <div
          ref={containerRef}
          className="relative group/carousel w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleDragEnd();
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {/* Left Arrow Floating Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleManualNudge('left');
            }}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0a1220]/90 hover:bg-[#121f33] text-white border border-slate-600/70 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Floating Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleManualNudge('right');
            }}
            aria-label="Next"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0a1220]/90 hover:bg-[#121f33] text-white border border-slate-600/70 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Smooth Continuous Flow Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-5 py-4 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={`${item.id}-flow-${idx}`}
                className="flow-carousel-card shrink-0"
              >
                <div
                  onClick={() => {
                    if (!hasMovedRef.current && onItemClick) {
                      onItemClick(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative flex-shrink-0 cursor-pointer select-none rounded-2xl p-2.5 sm:p-3 bg-[#131d2b] border border-[#1e2a3c] hover:border-slate-500/80 shadow-md shadow-black/40 hover:-translate-y-1 transition-all duration-300"
                  style={{ width: 'clamp(280px, 31vw, 410px)' }}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0a111c]">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Dark Studio Ambient Scrim */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />

                    {/* Top Branding Badge */}
                    <div className="absolute top-2.5 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10 text-[11px] font-bold text-slate-200">
                        <span className="text-red-500 font-black">▶</span>
                        <span>PHICAST+</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10">
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center text-[9px] font-black text-slate-950">
                          P
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-yellow-300/90 tracking-tight">
                          Phitron
                        </span>
                      </div>
                    </div>

                    {/* Text Graphics Overlay */}
                    <div className="absolute inset-x-2.5 bottom-2 sm:bottom-3 z-10 flex flex-col items-center text-center pointer-events-none">
                      {item.badgeText && (
                        <div className="inline-block bg-[#dc2626] text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-sm shadow-md">
                          {item.badgeText}
                        </div>
                      )}
                      {item.headlinePrimary && (
                        <div className="text-amber-300 font-extrabold text-sm sm:text-base leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {item.headlinePrimary}
                        </div>
                      )}
                      {item.headlineSecondary && (
                        <div className="text-white font-extrabold text-sm sm:text-base leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1">
                          <span>{item.headlineSecondary}</span>
                          {item.questionMark && (
                            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 inline" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Exact Circular White Play Button with Blue Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl shadow-black/70 flex items-center justify-center transform transition-all duration-300 group-hover:scale-115">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#1d4ed8] fill-[#1d4ed8] ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
