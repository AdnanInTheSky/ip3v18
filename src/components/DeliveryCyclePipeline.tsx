import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  ClipboardCheck,
  Landmark,
  Building2,
  BarChart3,
  Cpu,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export interface CyclePhaseItem {
  id: string;
  stepNumber: string;
  phaseLabel: string;
  name: string;
  problemSentence: string;
  clientsHireFor: string;
  deliverablesList: string[];
  capabilitiesLine: string;
  exploreSlug: string;
  accentColor: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DEFAULT_CYCLE_PHASES: CyclePhaseItem[] = [
  {
    id: 'phase-name',
    stepNumber: '01',
    phaseLabel: 'NAME',
    name: 'Name',
    problemSentence: 'We need to understand the problem and choose a defensible course of action.',
    clientsHireFor:
      'Diagnostics, econometric modeling, political-economy analysis, regulatory reviews, sector strategies, fiscal and cost-benefit analysis, reform road maps.',
    deliverablesList: [
      'Dynamic DSGE and macroeconomic modeling suites',
      'Sovereign debt sustainability & fiscal consolidation audits',
      'Regulatory Impact Assessments (RIA) & antitrust analyses',
      'National trade elasticity & industrial export roadmaps',
    ],
    capabilitiesLine:
      'Dynamic DSGE Modeling · Sovereign Debt Audits · Tariff Optimization · Regulatory Impact Assessments (RIA)',
    exploreSlug: 'economic',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: TrendingUp,
  },
  {
    id: 'phase-problem-sentence',
    stepNumber: '02',
    phaseLabel: 'PROBLEM SENTENCE',
    name: 'problem sentence',
    problemSentence: 'We have a mandate or funding window but need an implementable program.',
    clientsHireFor:
      'Feasibility studies, theories of change, concepts, results frameworks, implementation and financing plans, risk registers, project-preparation support.',
    deliverablesList: [
      'Bankable multi-criteria feasibility dossiers',
      'Rigorous Theory of Change (ToC) & transmission architectures',
      'Standardized CAPI field instruments & sampling frameworks',
      'Implementation fidelity roadmaps & risk matrices',
    ],
    capabilitiesLine:
      'Pre-Feasibility Dossiers · Theory of Change Blueprints · Results Frameworks · Risk Mitigation Architecture',
    exploreSlug: 'design',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: ClipboardCheck,
  },
  {
    id: 'phase-clients-hire',
    stepNumber: '03',
    phaseLabel: 'CLIENTS HIRE',
    name: 'Clients hire IP3 for',
    problemSentence: 'Public funding is insufficient; how do we make this investable?',
    clientsHireFor:
      'Investment cases, blended-finance strategy, PPP advisory, financial models, bankability assessments, climate-finance strategy, pipelines, market sounding, de-risking.',
    deliverablesList: [
      'Sovereign blended-finance facilities & guarantee structures',
      'Green bond frameworks & Article 6 carbon monetization',
      'Public-Private Partnership (PPP) concessions & project finance',
      'Commercial bankability & risk-adjusted concession models',
    ],
    capabilitiesLine:
      'Blended Finance Facilities · Sovereign Green Bonds · Risk-Sharing Guarantees · ESG Investment Cases',
    exploreSlug: 'climate',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: Landmark,
  },
  {
    id: 'phase-capabilities-line',
    stepNumber: '04',
    phaseLabel: 'CAPABILITIES LINE',
    name: 'capabilities line',
    problemSentence: 'A policy exists, but institutions cannot implement it consistently.',
    clientsHireFor:
      'Institutional diagnostics, governance frameworks, PFM reform, delivery models, process redesign, capacity development, change management.',
    deliverablesList: [
      'Ministerial delivery units (PMUs) & statutory charter drafting',
      'Public Financial Management (PFM) & Treasury single accounts',
      'Executive crisis war-room simulations & ministerial sprints',
      'Civil service capability diagnostics & competency rubrics',
    ],
    capabilitiesLine:
      'Ministerial War-Rooms · Civil Service Competency Frameworks · PFM Modernization · Delivery Unit Charters',
    exploreSlug: 'capacity-building',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: Building2,
  },
  {
    id: 'phase-explore-work',
    stepNumber: '05',
    phaseLabel: 'EXPLORE OUR WORK',
    name: 'Explore our work',
    problemSentence: 'We need to know what is working, why, for whom, and whether it can scale.',
    clientsHireFor:
      'MEL frameworks, baselines, process/impact evaluations, learning agendas, outcome harvesting, dashboards, adaptive management.',
    deliverablesList: [
      'Quasi-experimental impact evaluations (RCT, DiD, Synthetic Controls)',
      'Real-time cloud indicator pipelines & spatial telemetry',
      'Quarterly adaptive management loops & pause-and-reflect sprints',
      'Peer-reviewed evidence monographs & policy translation briefs',
    ],
    capabilitiesLine:
      'Quasi-Experimental RCTs · Real-Time Telemetry Pipelines · Causal Attribution · Adaptive Learning Loops',
    exploreSlug: 'merla',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: BarChart3,
  },
  {
    id: 'phase-indexable-page',
    stepNumber: '06',
    phaseLabel: 'INDEXABLE PAGE',
    name: 'linking to a full indexable page, not a modal',
    problemSentence:
      'We link directly to a dedicated, search-indexable page architecture rather than an inline pop-up.',
    clientsHireFor:
      'DPI diagnostics, digital-government strategy, data governance, interoperability, AI readiness and governance, service design, digital inclusion.',
    deliverablesList: [
      'Digital Public Infrastructure (DPI) & API exchange architectures',
      'Automated municipal tax platforms & civic registries',
      'Sovereign cloud data residency & zero-trust cybersecurity',
      'Algorithmic accountability audits & responsible AI frameworks',
    ],
    capabilitiesLine:
      'Civic Tech Infrastructure · Zero-Trust Citizen Identity · Automated Tax Platforms · Algorithmic Risk Audits',
    exploreSlug: 'services',
    accentColor: '#ff7a65',
    glowColor: 'rgba(255, 122, 101, 0.25)',
    icon: Cpu,
  },
];

export interface DeliveryCyclePipelineProps {
  phases?: CyclePhaseItem[];
  defaultActiveIndex?: number;
  onPhaseChange?: (phase: CyclePhaseItem, index: number) => void;
  onExplorePage?: (slug: string) => void;
  showDetailCard?: boolean;
  className?: string;
}

export const DeliveryCyclePipeline: React.FC<DeliveryCyclePipelineProps> = ({
  phases = DEFAULT_CYCLE_PHASES,
  defaultActiveIndex = 0,
  onPhaseChange,
  onExplorePage,
  showDetailCard = false,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);
  const activePhase = phases[activeIndex] || phases[0];

  const onPhaseChangeRef = useRef(onPhaseChange);
  useEffect(() => {
    onPhaseChangeRef.current = onPhaseChange;
  }, [onPhaseChange]);

  useEffect(() => {
    if (phases.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % phases.length;
        if (onPhaseChangeRef.current) {
          onPhaseChangeRef.current(phases[next], next);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [phases]);

  const handleSelectPhase = (index: number) => {
    setActiveIndex(index);
    if (onPhaseChange) {
      onPhaseChange(phases[index], index);
    }
  };

  const handleExplore = (slug: string) => {
    if (onExplorePage) {
      onExplorePage(slug);
    } else {
      window.location.hash = `#/services/${slug}`;
    }
  };

  return (
    <div className={`w-full space-y-8 select-none ${className}`}>
      {/* ======================================================== */}
      {/* 6-NODE PIPELINE SCHEMATIC (Matches image layout & styling) */}
      {/* ======================================================== */}
      <div className="relative w-full rounded-[24px] sm:rounded-[28px] bg-[#070e1b] border border-[#132238] p-5 sm:p-7 md:p-8 shadow-2xl">
        <div
          className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-2 lg:gap-3"
          role="tablist"
          aria-label="Delivery Cycle Phases"
        >
          {phases.map((phase, idx) => {
            const isSelected = activeIndex === idx;
            const isLast = idx === phases.length - 1;

            return (
              <React.Fragment key={phase.id}>
                {/* Node Box Button */}
                <div className="flex-1 min-w-0 flex w-full">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectPhase(idx);
                      if (idx === 5) {
                        handleExplore(phase.exploreSlug);
                      }
                    }}
                    id={`linked-list-node-btn-${idx}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`phase-card-panel-${phase.id}`}
                    className={`w-full relative flex items-center justify-center p-3 sm:p-4 min-h-[88px] sm:min-h-[105px] md:min-h-[120px] rounded-2xl border transition-all duration-200 cursor-pointer text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                      isSelected
                        ? 'border-[1.5px] border-[#ff7a65] bg-[#0e1b2e] ring-1 ring-[#ff7a65]/40 scale-[1.01]'
                        : 'border-[#15233a] hover:border-slate-700 bg-[#071120] hover:bg-[#0b172a]'
                    }`}
                    style={{
                      boxShadow: isSelected
                        ? '0 0 24px rgba(255, 122, 101, 0.24), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
                        : '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <span
                      className={`block text-xs sm:text-[13px] md:text-[14px] font-medium transition-colors leading-snug px-1.5 max-w-[155px] ${
                        isSelected
                          ? 'text-white font-semibold text-sm sm:text-[15px] md:text-[16px]'
                          : 'text-white group-hover:text-white'
                      }`}
                      title={phase.name}
                    >
                      {phase.name}
                    </span>
                  </button>
                </div>

                {/* Connecting Arrow - Slender flow arrow between cards */}
                {!isLast && (
                  <div
                    className="flex shrink-0 items-center justify-center py-1 md:py-0 px-1 text-slate-500 select-none"
                    aria-hidden="true"
                  >
                    {/* Horizontal Right Arrow for tablet/desktop */}
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="hidden md:block w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4a586d]"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.5 10h12m-4-4l4 4-4 4"
                      />
                    </svg>

                    {/* Vertical Downward Arrow for mobile screens */}
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="block md:hidden w-3.5 h-3.5 text-[#4a586d]"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 3.5v12m-4-4l4 4 4-4"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* OPTIONAL LINKED DEEP-DIVE CARD CONTROLLED BY THE NODES    */}
      {/* ======================================================== */}
      {showDetailCard && activePhase && (
        <div
          id={`phase-card-panel-${activePhase.id}`}
          role="tabpanel"
          className="w-full rounded-2xl sm:rounded-3xl bg-[#081220]/95 backdrop-blur-xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Sequence of Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Name */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Service Line &amp; Phase {activePhase.stepNumber}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {activePhase.name}
                </h3>
              </div>

              {/* 2. Problem Sentence */}
              <div
                className="p-4 sm:p-5 rounded-xl border bg-slate-900/70 space-y-2"
                style={{ borderColor: `${activePhase.accentColor}50` }}
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <HelpCircle className="w-4 h-4" style={{ color: activePhase.accentColor }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    The Problem We Solve
                  </span>
                </div>
                <p className="italic text-base sm:text-lg text-slate-100 leading-relaxed font-serif">
                  &ldquo;{activePhase.problemSentence}&rdquo;
                </p>
              </div>

              {/* 3. Clients hire IP3 for */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#38d9c0] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38d9c0]" />
                  Clients hire IP3 for
                </h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {activePhase.clientsHireFor}
                </p>
              </div>

              {/* 4. Capabilities Line */}
              <div className="space-y-2.5">
                <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Capabilities
                </h4>
                <div className="text-xs sm:text-sm font-mono text-slate-300 bg-[#050a12]/90 border border-slate-800 p-3 sm:p-3.5 rounded-xl leading-relaxed">
                  {activePhase.capabilitiesLine}
                </div>
              </div>

              {/* 5. Explore our work -> Link to full indexable page */}
              <div className="space-y-2 pt-3">
                <button
                  type="button"
                  onClick={() => handleExplore(activePhase.exploreSlug)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 transition-all active:scale-95 cursor-pointer shadow-lg hover:brightness-110"
                  style={{ backgroundColor: activePhase.accentColor }}
                >
                  <span>Explore our work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Links to full indexable practice page (#/services/{activePhase.exploreSlug}) · Not a modal</span>
                </p>
              </div>
            </div>

            {/* Right: Deliverables List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h4 className="text-base font-bold text-white">Tangible Deliverables</h4>
                <FileCheck className="w-4 h-4 text-slate-500" />
              </div>

              <div className="space-y-3">
                {activePhase.deliverablesList.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#050a12]/80 border border-slate-800/80"
                  >
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activePhase.accentColor}20`, color: activePhase.accentColor }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCyclePipeline;
