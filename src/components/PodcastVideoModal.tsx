import React, { useEffect } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import { PodcastCardItem } from '../types';

export function extractYoutubeId(urlOrId?: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  // Standard full or short YouTube URLs
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

interface PodcastVideoModalProps {
  item: PodcastCardItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PodcastVideoModal: React.FC<PodcastVideoModalProps> = ({ item, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const youtubeId = extractYoutubeId(item.youtubeUrl);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`;
  const directWatchUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : (item.youtubeUrl || searchUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#09131f] border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 bg-[#081220]">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            {/* YouTube Red Icon Badge */}
            <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <Play className="w-4 h-4 fill-red-500 ml-0.5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  YouTube Video
                </span>
                {item.badgeText && (
                  <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium truncate">
                    {item.badgeText}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate mt-0.5">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={directWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-colors"
              title="Open on YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              <span>Watch on YouTube</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-800"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Embed Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {youtubeId ? (
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center">
                <Play className="w-6 h-6 fill-red-500 ml-0.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">YouTube Link Ready</p>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  "{item.title}" can be watched directly on YouTube, or you can paste a specific YouTube video URL in the CMS.
                </p>
              </div>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Search and Watch on YouTube</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#081220] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            {item.headlinePrimary && (
              <span className="text-amber-300 font-semibold truncate">{item.headlinePrimary}</span>
            )}
            {item.headlineSecondary && (
              <span className="text-slate-300 font-medium truncate">{item.headlineSecondary}</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer shrink-0 ml-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
