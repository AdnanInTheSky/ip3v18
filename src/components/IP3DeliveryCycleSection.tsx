import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  ClipboardCheck,
  Landmark,
  Building2,
  BarChart3,
  Cpu
} from 'lucide-react';

export interface CycleCardItem {
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

export const CYCLE_CARDS_DATA: CycleCardItem[] = [
  {
    id: 'policy-economics',
    stepNumber: '01',
    phaseLabel: 'DIAGNOSE & MODEL',
    name: 'Policy, Economics & Strategy Advisory',
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
    accentColor: '#ff7e67',
    glowColor: 'rgba(255, 126, 103, 0.25)',
    icon: TrendingUp,
  },
  {
    id: 'program-design',
    stepNumber: '02',
    phaseLabel: 'STRUCTURE & FEASIBILITY',
    name: 'Program & Project Design',
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
    accentColor: '#38d9c0',
    glowColor: 'rgba(56, 217, 192, 0.25)',
    icon: ClipboardCheck,
  },
  {
    id: 'development-finance',
    stepNumber: '03',
    phaseLabel: 'CAPITAL & BANKABILITY',
    name: 'Development Finance & Private Capital Mobilization',
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
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    icon: Landmark,
  },
  {
    id: 'institutions-governance',
    stepNumber: '04',
    phaseLabel: 'INSTITUTIONAL REFORM',
    name: 'Institutions, Governance & Delivery',
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
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    icon: Building2,
  },
  {
    id: 'mel-impact',
    stepNumber: '05',
    phaseLabel: 'EVIDENCE & ATTRIBUTION',
    name: 'Monitoring, Evaluation, Learning & Impact',
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
    accentColor: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.25)',
    icon: BarChart3,
  },
  {
    id: 'data-digital-ai',
    stepNumber: '06',
    phaseLabel: 'DIGITAL & SCALE',
    name: 'Data, Digital & Responsible AI',
    problemSentence:
      'We need to modernize systems without creating new governance, exclusion or accountability risks.',
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
    exploreSlug: 'digital-systems',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    icon: Cpu,
  },
];

interface IP3DeliveryCycleSectionProps {
  onNavigate?: (page: 'home' | 'about' | 'approach' | 'focus' | 'services', sectionId?: string) => void;
}

export const IP3DeliveryCycleSection: React.FC<IP3DeliveryCycleSectionProps> = ({ onNavigate }) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  useEffect(() => {
    if (CYCLE_CARDS_DATA.length <= 1) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % CYCLE_CARDS_DATA.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeCard = CYCLE_CARDS_DATA[activeCardIndex];

  const handleSelectNode = (idx: number) => {
    setActiveCardIndex(idx);
    const card = CYCLE_CARDS_DATA[idx];
    if (card) {
      window.location.hash = `#/services/${card.exploreSlug}`;
      if (onNavigate) {
        onNavigate('services', card.exploreSlug);
      }
    }
  };

  return (
    <section
      id="client-deliverables-section"
      className="relative w-full py-8 sm:py-12 px-4 sm:px-8 lg:px-12 max-w-[1500px] mx-auto z-10 bg-[#050a12] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Background Ambience & Orbital Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[180px] opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: activeCard.accentColor }}
        />
        <div className="absolute top-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      {/* CONNECTED LINKED LIST FLOW */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* THE LINKED LIST SCHEMATIC - 100% VISIBLE ON SCREEN AND MATCHES SECTION BACKGROUND */}
        <div className="relative w-full rounded-3xl bg-[#050a12] border border-slate-800/80 p-4 sm:p-6 lg:p-7 shadow-2xl overflow-hidden">
          {/* THE LINKED LIST ROW: 100% fluid, responsive across all screen sizes, and contained within parent div */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-stretch lg:justify-between gap-2 sm:gap-2.5 lg:gap-1 py-2 sm:py-3 px-0.5 sm:px-1">
              {CYCLE_CARDS_DATA.map((card, idx) => {
                const isSelected = activeCardIndex === idx;
                const isFirst = idx === 0;
                const isLast = idx === CYCLE_CARDS_DATA.length - 1;

                return (
                  <React.Fragment key={card.id}>
                    {/* NODE CONTAINER: adapts to grid on mobile/tablet and flex row on desktop */}
                    <div className="flex-1 min-w-0 max-w-full lg:max-w-[180px] flex">
                      {/* THE NODE BOX */}
                      <button
                        onClick={() => handleSelectNode(idx)}
                        id={`linked-list-node-btn-${idx}`}
                        className={`w-full relative flex flex-col justify-between p-2 sm:p-2.5 lg:p-3 min-h-[88px] sm:min-h-[96px] lg:min-h-[108px] h-full rounded-xl border-2 transition-all duration-200 cursor-pointer text-left group ${
                          isSelected
                            ? 'border-sky-400 bg-[#0c223c] shadow-md shadow-sky-500/20 ring-2 ring-sky-400/50'
                            : 'border-[#1e40af] hover:border-sky-500 bg-[#071324] hover:bg-[#0a1c32]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1 sm:mb-1.5">
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#050a12]"
                            style={{ backgroundColor: card.accentColor }}
                          >
                            {card.stepNumber}
                          </span>
                          <div className="w-5 h-5 rounded bg-[#050a12] border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-colors shrink-0">
                            <card.icon className="w-3 h-3" />
                          </div>
                        </div>
                        <span
                          className={`block text-[10px] xs:text-[11px] sm:text-[11.5px] lg:text-xs font-bold transition-colors leading-snug break-words ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}
                          title={card.name}
                        >
                          {card.name}
                        </span>
                      </button>
                    </div>

                    {/* 4. ARROW BETWEEN NODES: continuous flow on desktop */}
                    {!isLast && (
                      <div className="hidden lg:flex shrink-0 items-center justify-center w-2 sm:w-3 xl:w-4 text-sky-400 select-none">
                        <svg width="100%" height="16" viewBox="0 0 24 16" fill="none" className="max-w-[20px]">
                          <line x1="0" y1="8" x2="17" y2="8" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                          <polygon points="14,4 22,8 14,12" fill="#38bdf8" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};
