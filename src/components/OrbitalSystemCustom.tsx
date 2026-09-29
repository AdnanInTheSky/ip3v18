import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

export type SystemNodeId = 'institutions' | 'policy' | 'technology' | 'evidence' | 'finance' | 'delivery' | 'core';

export interface SpectrumCardData {
  id: string;
  themeIndex?: number;
  number: string;
  topAccentColor: string;
  title: string;
  titleBreak?: string;
  description: string;
  actionLabel?: string;
  hoverBorder: string;
  hoverGlow: string;
  lineColor: string;
}

export const defaultFourCards: SpectrumCardData[] = [
  {
    id: 'institutions',
    number: '01',
    topAccentColor: 'bg-[#ff7e67]',
    title: 'From polycrisis to polysolutions',
    description: '"Eight connected sectors. One integrated delivery model."',
    actionLabel: 'Explore sectors',
    hoverBorder: 'hover:border-[#ff7e67]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(255,126,103,0.14)]',
    lineColor: '#ff7e67',
  },
  {
    id: 'policy',
    number: '02',
    topAccentColor: 'bg-[#2dd4bf]',
    title: 'Translation, not theory',
    description: '"Evidence converted into delivery architecture: strategies, project preparation, institutional reform, results systems."',
    actionLabel: 'See deliverables',
    hoverBorder: 'hover:border-[#2dd4bf]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(45,212,191,0.14)]',
    lineColor: '#2dd4bf',
  },
  {
    id: 'technology',
    number: '03',
    topAccentColor: 'bg-[#f59e0b]',
    title: 'Research that changes decisions',
    description: '"Decision-ready diagnostics, business cases and evaluations — not publications for their own sake."',
    actionLabel: 'Read insights',
    hoverBorder: 'hover:border-[#f59e0b]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(245,158,11,0.14)]',
    lineColor: '#f59e0b',
  },
  {
    id: 'evidence',
    number: '04',
    topAccentColor: 'bg-[#a855f7]',
    title: 'A convenor between worlds',
    description: '"Structured policy dialogue, investment forums and technical working groups that align governments, capital and implementers."',
    actionLabel: 'Commission a dialogue',
    hoverBorder: 'hover:border-[#a855f7]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.14)]',
    lineColor: '#a855f7',
  },
];

export const defaultSixCards: SpectrumCardData[] = [
  {
    id: 'institutions',
    number: '01',
    topAccentColor: 'bg-[#ff7e67]',
    title: 'Poly–crises to',
    titleBreak: 'poly–solutions',
    description: 'Eight connected systems become one legible field for action.',
    hoverBorder: 'hover:border-[#ff7e67]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(255,126,103,0.14)]',
    lineColor: '#ff7e67',
  },
  {
    id: 'policy',
    number: '02',
    topAccentColor: 'bg-[#2dd4bf]',
    title: 'Translation, not',
    titleBreak: 'theory',
    description: 'Evidence moves through architecture, delivery and learning.',
    hoverBorder: 'hover:border-[#2dd4bf]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(45,212,191,0.14)]',
    lineColor: '#2dd4bf',
  },
  {
    id: 'technology',
    number: '03',
    topAccentColor: 'bg-[#f59e0b]',
    title: 'Thinking that',
    titleBreak: 'ships',
    description: 'Research and practical intelligence designed to move decisions.',
    hoverBorder: 'hover:border-[#f59e0b]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(245,158,11,0.14)]',
    lineColor: '#f59e0b',
  },
  {
    id: 'evidence',
    number: '04',
    topAccentColor: 'bg-[#a855f7]',
    title: 'A convenor',
    titleBreak: 'between worlds',
    description: 'Authority, evidence, capital and lived experience meet around outcomes.',
    hoverBorder: 'hover:border-[#a855f7]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.14)]',
    lineColor: '#a855f7',
  },
  {
    id: 'finance',
    number: '05',
    topAccentColor: 'bg-[#38bdf8]',
    title: 'Capital that',
    titleBreak: 'unlocks',
    description: 'Blended facilities and green investment pathways derisking private capital.',
    hoverBorder: 'hover:border-[#38bdf8]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(56,189,248,0.14)]',
    lineColor: '#38bdf8',
  },
  {
    id: 'delivery',
    number: '06',
    topAccentColor: 'bg-[#10b981]',
    title: 'Delivery & learning',
    titleBreak: 'at scale',
    description: 'Autonomous delivery units and feedback loops that codify lasting reform.',
    hoverBorder: 'hover:border-[#10b981]/60',
    hoverGlow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.14)]',
    lineColor: '#10b981',
  },
];

export interface OrbitalSystemCustomProps {
  id?: string;
  cardCount?: number;
  orientation?: 'horizontal' | 'vertical';
  cards?: SpectrumCardData[];
  onSelectNode?: (nodeId: string) => void;
  selectedNodeId?: string | null;
  onExploreCapabilities?: () => void;
  className?: string;
  badgeLabel?: string;
  hubTitle?: string;
}

interface ConnectorPath {
  d: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const OrbitalSystemCustom: React.FC<OrbitalSystemCustomProps> = ({
  id = 'orbital-system-container',
  cardCount = 4,
  orientation = 'vertical',
  cards: customCards,
  onSelectNode,
  selectedNodeId,
  onExploreCapabilities,
  className = '',
  badgeLabel = 'BUILT FOR COMPLEXITY',
  hubTitle = 'IP3',
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [connectors, setConnectors] = useState<ConnectorPath[]>([]);

  const cards = useMemo(() => {
    if (customCards) return customCards;
    return cardCount === 4 ? defaultFourCards : defaultSixCards;
  }, [customCards, cardCount]);

  const handleNodeClick = (nodeId: string) => {
    if (onSelectNode) {
      onSelectNode(nodeId);
    }
  };

  useEffect(() => {
    const updateCurves = () => {
      if (!containerRef.current || !hubRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const iRect = hubRef.current.getBoundingClientRect();

      const isDiff = (newArr: ConnectorPath[]) => {
        setConnectors((prev) => {
          if (prev.length === newArr.length && prev.every((p, idx) => p.d === newArr[idx]?.d)) {
            return prev;
          }
          return newArr;
        });
      };

      if (orientation === 'vertical') {
        const firstCard = cardRefs.current[0];
        const fRect = firstCard?.getBoundingClientRect();
        if (fRect && iRect.right <= fRect.left + 50) {
          const startX = iRect.right - cRect.left - 2;
          const startY = iRect.top - cRect.top + iRect.height / 2;
          const verticalConnectors: ConnectorPath[] = [];

          cards.forEach((_, index) => {
            const cardEl = cardRefs.current[index];
            if (!cardEl) return;
            const cardRect = cardEl.getBoundingClientRect();
            const cardLeft = cardRect.left - cRect.left;
            const cardTop = cardRect.top - cRect.top;
            const cardHeight = cardRect.height;

            const endX = cardLeft;
            const endY = cardTop + cardHeight / 2;

            const spanX = endX - startX;
            const cp1X = startX + spanX * 0.45;
            const cp1Y = startY;
            const cp2X = endX - spanX * 0.35;
            const cp2Y = endY;

            const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
            verticalConnectors.push({
              d: pathData,
              startX,
              startY,
              endX,
              endY,
            });
          });

          isDiff(verticalConnectors);
          return;
        }
      }

      // Horizontal orientation layout
      const startX = iRect.left - cRect.left + iRect.width / 2;
      const startY = iRect.bottom - cRect.top - 4;

      const newConnectors: ConnectorPath[] = [];

      cards.forEach((_, index) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        const cardRect = cardEl.getBoundingClientRect();
        const cardLeft = cardRect.left - cRect.left;
        const cardTop = cardRect.top - cRect.top;
        const cardWidth = cardRect.width;

        let entryXRatio = 0.5;
        let endXRatio = 0.5;
        let arcDepth = 130;

        if (cards.length === 4) {
          if (index === 0) {
            entryXRatio = 0.7;
            endXRatio = 0.3;
            arcDepth = 135;
          } else if (index === 1) {
            entryXRatio = 0.58;
            endXRatio = 0.42;
            arcDepth = 125;
          } else if (index === 2) {
            entryXRatio = 0.42;
            endXRatio = 0.58;
            arcDepth = 125;
          } else if (index === 3) {
            entryXRatio = 0.3;
            endXRatio = 0.7;
            arcDepth = 135;
          }
        } else {
          if (index === 0) {
            entryXRatio = 0.7;
            endXRatio = 0.3;
            arcDepth = 135;
          } else if (index === 1) {
            entryXRatio = 0.62;
            endXRatio = 0.34;
            arcDepth = 130;
          } else if (index === 2) {
            entryXRatio = 0.54;
            endXRatio = 0.38;
            arcDepth = 125;
          } else if (index === 3) {
            entryXRatio = 0.46;
            endXRatio = 0.62;
            arcDepth = 125;
          } else if (index === 4) {
            entryXRatio = 0.38;
            endXRatio = 0.66;
            arcDepth = 130;
          } else if (index === 5) {
            entryXRatio = 0.3;
            endXRatio = 0.7;
            arcDepth = 135;
          }
        }

        const entryX = cardLeft + cardWidth * entryXRatio;
        const entryY = cardTop;
        const endX = cardLeft + cardWidth * endXRatio;
        const endY = cardTop + arcDepth;

        const spanX = entryX - startX;
        const cp1X = startX + spanX * 0.35;
        const cp1Y = startY + 30;
        const cp2X = entryX - spanX * 0.1;
        const cp2Y = entryY - 25;

        const downX = entryX;
        const downY = entryY + 40;

        const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${entryX} ${entryY} C ${downX} ${downY}, ${endX} ${endY - 25}, ${endX} ${endY}`;

        newConnectors.push({
          d: pathData,
          startX,
          startY,
          endX,
          endY,
        });
      });

      isDiff(newConnectors);
    };

    updateCurves();
    const timer = setTimeout(updateCurves, 50);

    const ro = new ResizeObserver(() => {
      updateCurves();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    window.addEventListener('resize', updateCurves);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', updateCurves);
    };
  }, [cards, orientation]);

  const isVertical = orientation === 'vertical';
  const filterId = `cyanGlow-${id}`;

  const containerClasses = isVertical
    ? `relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 select-none pt-4 pb-10 ${className}`
    : `relative w-full max-w-7xl mx-auto flex flex-col items-center select-none pt-2 pb-10 ${className}`;

  const hubWrapperClasses = isVertical
    ? 'relative z-20 flex flex-col items-center justify-center flex-shrink-0 md:w-5/12 lg:w-4/12 my-auto'
    : 'relative z-20 flex flex-col items-center';

  const cardsContainerClasses = isVertical
    ? 'flex flex-col gap-3.5 sm:gap-4 w-full md:w-7/12 lg:w-8/12 z-20'
    : cards.length === 4
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-6xl mx-auto mt-10 sm:mt-14 z-20'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 w-full mt-10 sm:mt-14 z-20';

  return (
    <div ref={containerRef} id={id} className={containerClasses}>
      {/* Background SVG Connectors (Desktop & Tablet) */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {connectors.length > 0 && (
          <circle
            cx={connectors[0].startX}
            cy={connectors[0].startY}
            r={hoveredNode === 'core' ? 5 : 3.5}
            fill="#38d9c0"
            filter={hoveredNode === 'core' ? `url(#${filterId})` : undefined}
            className="transition-all duration-300"
          />
        )}

        {connectors.map((conn, index) => {
          const card = cards[index];
          if (!card) return null;
          const isHighlighted =
            hoveredNode === card.id ||
            selectedNodeId === card.id ||
            hoveredNode === 'core' ||
            selectedNodeId === 'core';

          return (
            <g key={`connector-${card.id}-${index}`}>
              {isHighlighted && (
                <path
                  d={conn.d}
                  fill="none"
                  stroke={card.lineColor}
                  strokeWidth={4.5}
                  strokeOpacity={0.35}
                  filter={`url(#${filterId})`}
                  strokeLinecap="round"
                />
              )}
              <path
                d={conn.d}
                fill="none"
                stroke={isHighlighted ? card.lineColor : `${card.lineColor}77`}
                strokeWidth={isHighlighted ? 2.5 : 1.3}
                strokeOpacity={isHighlighted ? 0.95 : 0.45}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {isHighlighted && (
                <circle
                  cx={conn.endX}
                  cy={conn.endY}
                  r={3}
                  fill={card.lineColor}
                  filter={`url(#${filterId})`}
                  className="transition-all duration-300"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Pulsing Orbital Core */}
      <div className={hubWrapperClasses}>
        <div className="absolute -inset-6 bg-teal-500/20 rounded-full blur-2xl pointer-events-none opacity-70" />

        <motion.button
          ref={hubRef}
          id={`${id}-core-btn`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredNode('core')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick('core')}
          className={`relative ${
            isVertical ? 'w-36 h-36 sm:w-44 sm:h-44' : 'w-32 h-32 sm:w-36 sm:h-36'
          } rounded-full flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all duration-300 border border-teal-400/40 hover:border-teal-300/80 bg-gradient-to-b from-[#081525] via-[#050e1a] to-[#02060c] shadow-[0_0_40px_rgba(45,212,191,0.25)] hover:shadow-[0_0_55px_rgba(45,212,191,0.45)] group`}
        >
          {/* Animated dashed spinning orbit */}
          <div className="absolute inset-1.5 rounded-full border border-teal-400/20 border-dashed animate-spin [animation-duration:45s] pointer-events-none" />

          <span className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-wide group-hover:text-teal-200 transition-colors">
            {hubTitle}
          </span>
          <div className="mt-1 px-2.5 py-0.5 rounded-full border border-teal-400/50 bg-[#041722]/90 text-[#38d9c0] font-mono text-[8.5px] sm:text-[9px] tracking-[0.2em] font-semibold uppercase">
            {badgeLabel}
          </div>
        </motion.button>
      </div>

      {/* Cards Container */}
      <div className={cardsContainerClasses}>
        {cards.map((card, index) => {
          const isSelected = selectedNodeId === card.id;
          const isHovered = hoveredNode === card.id;
          const isConnectedToCore = hoveredNode === 'core' || selectedNodeId === 'core';

          return (
            <motion.div
              key={`${card.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              id={`${id}-card-${card.id}`}
              whileHover={{ y: isVertical ? -2 : -4, x: isVertical ? 4 : 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => handleNodeClick(card.id)}
              onMouseEnter={() => setHoveredNode(card.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`relative flex flex-col justify-between ${
                isVertical
                  ? 'min-h-[100px] sm:min-h-[110px] p-4.5 sm:p-5'
                  : 'min-h-[250px] sm:min-h-[270px] p-5 sm:p-5.5'
              } rounded-2xl bg-[#0b1524]/95 border transition-all duration-300 cursor-pointer overflow-hidden group ${
                isSelected || isHovered || isConnectedToCore
                  ? `${card.hoverBorder} ${card.hoverGlow} bg-[#0d1a2d]`
                  : 'border-slate-800/80 hover:border-slate-700 hover:bg-[#0e1a2b]'
              }`}
            >
              {isVertical ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full relative z-10">
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 mt-0.5 sm:mt-0">
                      <div className={`w-1.5 h-9 sm:h-11 rounded-full ${card.topAccentColor}`} />
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-400">
                        {card.number}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-teal-200 transition-colors">
                        {card.title} {card.titleBreak ? `· ${card.titleBreak}` : ''}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-0.5 max-w-2xl font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {card.actionLabel && (
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#38d9c0] group-hover:text-teal-200 transition-colors whitespace-nowrap self-end sm:self-center pl-10 sm:pl-2 flex-shrink-0">
                      <span>{card.actionLabel}</span>
                      <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-start mb-4">
                    <div className={`w-10 h-1 rounded-full ${card.topAccentColor}`} />
                  </div>

                  <div className="flex items-center justify-between w-full mb-4 relative z-10">
                    <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider">
                      {card.number}
                    </span>
                  </div>

                  <div className="space-y-2.5 relative z-10">
                    <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight leading-snug group-hover:text-slate-100 transition-colors">
                      {card.title}
                      {card.titleBreak && <span className="block">{card.titleBreak}</span>}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-normal">
                      {card.description}
                    </p>
                    {card.actionLabel && (
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-medium text-[#38d9c0] group-hover:text-teal-200 transition-colors">
                        <span>{card.actionLabel}</span>
                        <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {!isVertical && onExploreCapabilities && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-10 flex flex-col items-center justify-center w-full relative z-20"
        >
          <button
            onClick={onExploreCapabilities}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#081220] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-[#38d9c0]/60 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl hover:shadow-[#38d9c0]/15 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          >
            <span>Explore Our Capabilities.</span>
            <Layers className="w-4 h-4 text-[#38d9c0] group-hover:scale-110 transition-transform duration-200" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default OrbitalSystemCustom;
export const OrbitalSystem = OrbitalSystemCustom;
export type OrbitalSystemProps = OrbitalSystemCustomProps;
