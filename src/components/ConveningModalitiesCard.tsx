import React from 'react';

export interface ConveningFormat {
  id: string;
  number: string;
  name: string;
  description: string;
}

export const CONVENING_FORMATS: ConveningFormat[] = [
  {
    id: 'policy-dialogue',
    number: '01',
    name: 'Policy Dialogue',
    description: 'Structured bilateral and multilateral sessions with sovereign ministries, legislative bodies, and development partners to clarify policy intent, reconcile statutory priorities, and build inter-agency consensus before drafting reform instruments.'
  },
  {
    id: 'executive-roundtables',
    number: '02',
    name: 'Executive Roundtables',
    description: 'Closed-door, confidential sessions between cabinet leadership, multilateral heads, institutional asset allocators, and industry leaders to stress-test reform proposals, confront political economy friction, and build shared risk appetite.'
  },
  {
    id: 'investment-forums',
    number: '03',
    name: 'Investment Forums',
    description: 'Bespoke investor convenings focused on bankable project pipelines, blended finance syndications, and risk-mitigation instruments designed to crowd institutional private capital into national infrastructure and sustainable transition assets.'
  },
  {
    id: 'technical-working-groups',
    number: '04',
    name: 'Technical Working Groups',
    description: 'Dedicated taskforces of line-ministry technical staff, legal counsels, economists, and engineering specialists convened over multi-month sprints to draft statutory language, model tariff regimes, and establish procurement specifications.'
  },
  {
    id: 'research-policy-translation',
    number: '05',
    name: 'Research–Policy Translation',
    description: 'Structured translation labs that convert complex macroeconomic models, randomized control trials, and geospatial analyses into actionable cabinet decision memos, regulatory impact scorecards, and fiscal scenario tools.'
  },
  {
    id: 'stakeholder-consultations',
    number: '06',
    name: 'Stakeholder Consultations',
    description: 'Inclusive, structured consultation processes across regional municipalities, affected local communities, labor unions, and private trade associations to incorporate ground-level realities, ensure fair transition guardrails, and secure social license.'
  },
  {
    id: 'consensus-building-processes',
    number: '07',
    name: 'Consensus-Building Processes',
    description: 'Methodical negotiation frameworks that navigate divergent institutional mandates, historical regulatory disputes, and jurisdictional overlaps, guiding opposing factions toward mutually binding institutional agreements.'
  }
];

export interface ConveningModalitiesCardProps {
  className?: string;
}

export default function ConveningModalitiesCard({ className = '' }: ConveningModalitiesCardProps) {
  return (
    <div id="convening-modalities-card-wrapper" className={`w-full ${className}`}>
      {/* Master Card Container */}
      <div 
        id="convening-modalities-master-card"
        className="relative bg-[#050a12] rounded-3xl transition-colors duration-300"
      >
        {/* Modalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {CONVENING_FORMATS.map((format) => (
            <div
              key={format.id}
              id={`modality-card-${format.id}`}
              className="relative flex flex-col justify-between rounded-2xl p-5 border bg-[#050a12] hover:bg-[#081220]/70 border-slate-800 hover:border-slate-700 transition-all duration-200 text-left space-y-3"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#ff7e67]">
                  {format.number}
                </span>

                <h4 className="text-lg font-serif font-bold text-white tracking-tight leading-snug">
                  {format.name}
                </h4>

                <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">
                  {format.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
