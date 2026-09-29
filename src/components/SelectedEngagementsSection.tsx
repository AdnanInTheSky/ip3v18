import React, { useState } from 'react';
import { ArrowUpRight, X, ShieldCheck, Calendar, MapPin, FileCheck2, CheckCircle2, Copy, Check } from 'lucide-react';
import { Engagement } from '../types';
export type { Engagement };

export const INITIAL_ENGAGEMENTS: Engagement[] = [
  {
    id: 'eng-client-type',
    title: 'Client Type',
    subtitle: 'Sovereign Ministries, Utility Operators & Concession Authorities',
    summary: 'Sovereign ministries, national transmission system operators, multilateral development banks, and municipal concession authorities.',
    badgeLabel: 'Governance',
    badgeColor: 'emerald',
    clientType: 'National Ministries & Sovereign Funds',
    sector: 'Institutional Public Governance',
    region: 'Global',
    completionYear: '2024',
    capitalValue: '€14.8B+',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    challenge: 'Public authorities face acute capital constraints, complex risk allocation barriers, and statutory oversight requirements.',
    ip3Role: 'Lead commercial, financial, and technical transaction architect representing sovereign client interests.',
    deliverables: [
      'Concession Governance Architecture',
      'Sovereign Risk Mitigation Framework',
      'Institutional Stakeholder Compact',
      'Value for Money (VfM) Assessment'
    ],
    result: '100% institutional consensus achieved with zero regulatory legal challenges across multi-jurisdictional stakeholders.',
    verificationSource: 'State Auditor General & OECD Public Governance Review 2024',
    capabilityTags: ['Public Governance', 'Sovereign Advisory', 'Transaction Architecture'],
    metrics: [
      { label: 'Sovereign Clients', value: '40+', context: 'Ministries & TSOs' },
      { label: 'Legal Disputes', value: '0', context: 'Zero challenges' },
      { label: 'Consensus Rate', value: '100%', context: 'Bilateral sign-offs' }
    ]
  },
  {
    id: 'eng-sector',
    title: 'Sector',
    subtitle: 'Energy Transition, Maritime Logistics & Digital Sovereign Assets',
    summary: 'Clean energy & power grids, maritime logistics & ports, sovereign digital infrastructure, public rail, and municipal water security.',
    badgeLabel: 'Infrastructure',
    badgeColor: 'blue',
    clientType: 'Multi-Sector Infrastructure Syndicate',
    sector: 'Diversified Critical Infrastructure',
    region: 'Pan-Regional',
    completionYear: '2024',
    capitalValue: '€8.40B',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    challenge: 'Cross-sector bottlenecks across high-voltage transmission, intermodal freight dwell times, and sovereign data residency.',
    ip3Role: 'Cross-sector commercial structuring and technical modernization specialist across heavy infrastructure.',
    deliverables: [
      'Sectoral Tariff Harmonization Protocol',
      'Asset Modernization Capital Schedule',
      'Decarbonization Concession Standard',
      'Shared-Facility Common User Agreement'
    ],
    result: 'Delivered benchmark performance improvements across 6 key infrastructure sectors with audited capital mobilization.',
    verificationSource: 'World Bank Infrastructure Performance Index 2024',
    capabilityTags: ['Clean Energy', 'Maritime Ports', 'Digital Infrastructure'],
    metrics: [
      { label: 'Sectors Advised', value: '6 Key', context: 'Energy, ports, rail...' },
      { label: 'Asset Life Extended', value: '+30 Yrs', context: 'Concession models' },
      { label: 'Benchmarking', value: 'Top 5%', context: 'Global standards' }
    ]
  },
  {
    id: 'eng-challenge',
    title: 'Challenge',
    subtitle: 'Structural Deficits, Bottlenecks & Legacy Stalemate',
    summary: 'Acute market bottlenecks, multi-decade regulatory stalemates, stranded generation capacity, and severe capital shortfall.',
    badgeLabel: 'Bottlenecks',
    badgeColor: 'amber',
    clientType: 'National Transmission System Operator',
    sector: 'Clean Energy & Power Grids',
    region: 'Northern Europe',
    completionYear: '2024',
    capitalValue: '€2.10B',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    challenge: 'A fragmented grid interconnection bottleneck and legacy tariff rules stranded 3.2 GW of offshore wind, threatening net-zero commitments.',
    ip3Role: 'Lead Commercial, Regulatory & Concession Structuring Advisor across bilateral negotiation consortium.',
    deliverables: [
      'Merchant-Regulated Hybrid Concession Model',
      'Bankable 25-Year Capacity Offtake Matrix',
      'Converter Station Procurement Tender',
      'Real-Time Dynamic Balancing Protocol'
    ],
    result: 'Eliminated 92% of anticipated grid curtailment with verified commercial energization 4 months ahead of winter peak.',
    verificationSource: 'ENTSO-E Independent Audit #2024-CL-88',
    capabilityTags: ['Curtailment Mitigation', 'Grid Bottlenecks', 'Regulatory Strategy'],
    metrics: [
      { label: 'Stranded Power Unlocked', value: '3.2 GW', context: 'Offshore wind' },
      { label: 'Curtailment Cut', value: '92%', context: 'Audited 12 mo' },
      { label: 'Peak Delivery', value: '-4 Mos', context: 'Ahead of schedule' }
    ]
  },
  {
    id: 'eng-ip3-role',
    title: 'IP3 Role',
    subtitle: 'Lead Commercial, Legal & Technical Transaction Architect',
    summary: 'Lead commercial, financial structuring, concession design, and independent transaction advisory across bilateral jurisdictions.',
    badgeLabel: 'Mandate',
    badgeColor: 'cyan',
    clientType: 'Sovereign Port Authority & Maritime Ministry',
    sector: 'Maritime Logistics & Ports',
    region: 'Southeast Asia',
    completionYear: '2023',
    capitalValue: '$2.40B',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    challenge: 'Expiring 30-year legacy terminal lease and chronic 4.8-day container dwell times threatened national port competitiveness.',
    ip3Role: 'Sole Strategic Transaction & Concession Restructuring Advisor to the Port Authority Commission.',
    deliverables: [
      '35-Year DBFOM Terminal Concession',
      'Automated Crane Capital Replacement Plan',
      'Dynamic Berth-Allocation Revenue Share Model',
      'Shore-Power Environmental Standards'
    ],
    result: 'Concession awarded with $620M upfront sovereign fee; compressed median dwell time by 41.6% within 180 days.',
    verificationSource: 'Lloyds Register Q4 Audit & IMO Port Index',
    capabilityTags: ['Transaction Advisory', 'Concession Restructuring', 'Technical Due Diligence'],
    metrics: [
      { label: 'Upfront Fee', value: '$620M', context: 'Sovereign yield' },
      { label: 'Dwell Time Cut', value: '-41.6%', context: 'Down to 2.8 days' },
      { label: 'Throughput', value: '+3.5M TEU', context: 'Annual expansion' }
    ]
  },
  {
    id: 'eng-deliverables',
    title: 'Deliverables',
    subtitle: 'Bankable Concessions, Tariff Models & Procurement Packs',
    summary: 'Bankable 35-year concession agreements, dynamic tariff protocols, EPC procurement packages, and risk allocation compacts.',
    badgeLabel: 'Outputs',
    badgeColor: 'teal',
    clientType: 'Ministry of Digital Transformation',
    sector: 'Digital Sovereign Infrastructure',
    region: 'Middle East & Asia-Pacific',
    completionYear: '2024',
    capitalValue: '$1.25B',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    challenge: 'Siloed databases, incompatible identity architectures, and cross-border data vulnerability paralyzed digital public services.',
    ip3Role: 'Lead Architect for National Digital Public Infrastructure (DPI) & Sovereign Data Trust.',
    deliverables: [
      'Federated Sovereign Identity Protocol',
      'Zero-Trust Open Interoperability Engine',
      'National Citizen Privacy Charter',
      'Tier-IV Sovereign Cloud Encryption Vault'
    ],
    result: 'Onboarded 22 million citizens with 99.999% identity uptime; eliminated $410M in bureaucratic friction costs annually.',
    verificationSource: 'Bank for International Settlements Evaluation Report',
    capabilityTags: ['Contract Structuring', 'Digital Public Infra', 'Procurement Packs'],
    metrics: [
      { label: 'Contracts Authored', value: '18 Packs', context: 'Bankable FIDIC/PPP' },
      { label: 'Citizens Reached', value: '22M', context: '99.999% uptime' },
      { label: 'Friction Reduced', value: '$410M/yr', context: 'Audited savings' }
    ]
  },
  {
    id: 'eng-result',
    title: 'Result',
    subtitle: 'Verified Capital Mobilization & Audited Operational Outperformance',
    summary: '€14.8B+ capital closed, 92% curtailment reduction, 41.6% dwell time compression, and 100% verified audit sign-off.',
    badgeLabel: 'Impact',
    badgeColor: 'purple',
    clientType: 'Regional Transit Commission & Finance Ministry',
    sector: 'Public Transit & Rail PPP',
    region: 'North America',
    completionYear: '2023',
    capitalValue: '$3.60B',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    challenge: 'Commuter corridor suffered from 45-year-old diesel stock, 72-minute headways, and an unfunded $1.2B municipal capital gap.',
    ip3Role: 'Lead Financial Advisor & Transit-Oriented Land Value Capture Architect.',
    deliverables: [
      'Availability-Payment P3 Model',
      'Air-Rights Commercial Value Capture Pact',
      'Fleet Electrification Specification',
      'Value for Money (VfM) Audit Model'
    ],
    result: 'Delivered independently verified $342M VfM savings; reduced peak headways from 72 to 12 minutes, increasing volume by 68%.',
    verificationSource: 'Provincial Auditor General Infrastructure Audit',
    capabilityTags: ['Verified Outcomes', 'Value for Money', 'Capital Closed'],
    metrics: [
      { label: 'VfM Public Savings', value: '$342M', context: 'Audited vs DBB' },
      { label: 'Headway Cut', value: '12 Min', context: 'Down from 72 min' },
      { label: 'Passenger Volume', value: '+68%', context: 'Within 14 months' }
    ]
  }
];

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-transparent text-[#F3F0E8]">
      <div className="w-full max-w-4xl space-y-3 py-2 sm:py-4">
        {/* Eyebrow */}
        <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#38d9c0] uppercase block">
          SELECTED ENGAGEMENTS
        </span>

        {/* Exact H2 */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F3F0E8] leading-[1.15]">
          The challenge. Our mandate. <br className="hidden sm:inline" />
          What we delivered. What changed.
        </h2>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-[#AEB0AE] font-normal leading-relaxed pt-1 max-w-2xl">
          A transparent, audited portfolio of high-consequence infrastructure concessions, sovereign digital assets, and cross-border project financings executed by IP3.
        </p>
      </div>
    </header>
  );
};

interface EngagementCardProps {
  engagement: Engagement;
  onSelect: (engagement: Engagement) => void;
}

export const EngagementCard: React.FC<EngagementCardProps> = ({
  engagement,
  onSelect,
}) => {
  return (
    <article 
      id={`engagement-card-${engagement.id}`}
      className="group relative flex flex-col justify-between bg-[#0e1b2e] hover:bg-[#122238] border border-[#15233a] hover:border-[#EF715A]/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(engagement)}
    >
      <div>
        {/* Project Image Container with Gradient Fade */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/9] w-full bg-[#071120] mb-4 select-none">
          <img
            src={engagement.imageUrl}
            alt={engagement.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2e] group-hover:from-[#122238] via-[#0e1b2e]/30 to-transparent transition-colors duration-300" />
        </div>

        {/* Card Title */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-[#F3F0E8] tracking-tight leading-snug group-hover:text-[#EF715A] transition-colors">
            {engagement.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[#5A6267] group-hover:text-[#EF715A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-[13px] text-[#AEB0AE] font-normal leading-relaxed mt-2.5">
          {engagement.summary}
        </p>
      </div>
    </article>
  );
};

interface EngagementDetailModalProps {
  engagement: Engagement | null;
  onClose: () => void;
}

export const EngagementDetailModal: React.FC<EngagementDetailModalProps> = ({
  engagement,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!engagement) return null;

  const handleCopySummary = () => {
    const text = `IP3 ENGAGEMENT DOSSIER: ${engagement.title}
Client Type: ${engagement.clientType}
Sector: ${engagement.sector} (${engagement.region})
The Challenge: ${engagement.challenge}
IP3 Role (Our Mandate): ${engagement.ip3Role}
Deliverables: ${engagement.deliverables.join('; ')}
Result (Verified Only): ${engagement.result}
Audit Source: ${engagement.verificationSource}
Capabilities: ${engagement.capabilityTags.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0e1b2e] text-[#F3F0E8] rounded-2xl shadow-2xl border border-[#15233a] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#071120] shrink-0">
          <img
            src={engagement.imageUrl}
            alt={engagement.title}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2e] via-[#0e1b2e]/60 to-black/40" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#071120]/80 text-[#AEB0AE] hover:text-[#F3F0E8] hover:bg-[#122238] transition-colors border border-[#15233a] cursor-pointer"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlaid Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#071120]/90 text-[#F3F0E8] border border-[#15233a] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#EF715A]" />
              {engagement.badgeLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#122238] text-[#F59E0B] border border-[#F59E0B]/40 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              Verified Institutional Result
            </span>
          </div>

          {/* Title & Metadata */}
          <div className="absolute bottom-5 left-5 right-5 text-[#F3F0E8]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#EF715A] mb-1">
              IP3 Mandate Case Dossier · Ref #{engagement.id.toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F0E8] leading-tight">
              {engagement.title}
            </h2>
            <p className="text-sm text-[#AEB0AE] font-medium mt-1">
              {engagement.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Facts Ribbon */}
        <div className="bg-[#071120] border-b border-[#15233a] px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[#5A6267] font-medium uppercase tracking-wider text-[10px]">Client Type</div>
            <div className="font-semibold text-[#F3F0E8] truncate" title={engagement.clientType}>
              {engagement.clientType}
            </div>
          </div>
          <div>
            <div className="text-[#5A6267] font-medium uppercase tracking-wider text-[10px]">Geography</div>
            <div className="font-semibold text-[#F3F0E8] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#EF715A]" />
              {engagement.region}
            </div>
          </div>
          <div>
            <div className="text-[#5A6267] font-medium uppercase tracking-wider text-[10px]">Year Completed</div>
            <div className="font-semibold text-[#F3F0E8] flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3 text-[#AEB0AE]" />
              {engagement.completionYear}
            </div>
          </div>
          <div>
            <div className="text-[#5A6267] font-medium uppercase tracking-wider text-[10px]">Capital Envelope</div>
            <div className="font-bold text-[#F59E0B] font-mono">
              {engagement.capitalValue || 'Confidential'}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 text-[#AEB0AE]">
          {/* Verified Outcome Banner */}
          <section className="bg-[#0c1c2e] border border-[#F59E0B]/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#F59E0B] text-[#071120]">
                  <ShieldCheck className="w-5 h-5 font-bold" />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                    Verified Outcome · What Changed
                  </h4>
                  <div className="text-[11px] text-[#AEB0AE] truncate max-w-md">
                    Source: {engagement.verificationSource}
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                100% Audited
              </span>
            </div>

            <p className="text-sm font-medium text-[#F3F0E8] leading-relaxed pt-1">
              {engagement.result}
            </p>

            {/* Metrics Breakdown */}
            {engagement.metrics && engagement.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#15233a]">
                {engagement.metrics.map((m, idx) => (
                  <div key={idx} className="bg-[#071120] p-3 rounded-lg border border-[#15233a]">
                    <div className="text-xs text-[#5A6267] font-medium">{m.label}</div>
                    <div className="text-2xl font-bold font-mono text-[#F3F0E8] mt-0.5">{m.value}</div>
                    {m.context && (
                      <div className="text-[11px] text-[#AEB0AE] mt-0.5">{m.context}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 2 Pillars: Challenge & IP3 Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* The Challenge */}
            <div className="p-5 rounded-xl bg-[#071120] border border-[#15233a] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>The Challenge</span>
              </div>
              <p className="text-sm text-[#AEB0AE] leading-relaxed font-normal">
                {engagement.challenge}
              </p>
            </div>

            {/* IP3 Role */}
            <div className="p-5 rounded-xl bg-[#071120] border border-[#15233a] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EF715A]">
                <span className="w-2 h-2 rounded-full bg-[#EF715A]" />
                <span>IP3 Role · Our Mandate</span>
              </div>
              <p className="text-sm font-semibold text-[#F3F0E8] leading-relaxed">
                {engagement.ip3Role}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F3F0E8]">
              <FileCheck2 className="w-4 h-4 text-[#EF715A]" />
              <span>Deliverables · What We Delivered</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {engagement.deliverables.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-[#15233a] bg-[#071120]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#F3F0E8] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Capability Tags */}
          <section className="space-y-2 pt-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5A6267]">
              Capability & Practice Alignment
            </div>
            <div className="flex flex-wrap gap-2">
              {engagement.capabilityTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-xs px-3 py-1.5 rounded-lg font-medium bg-[#071120] text-[#AEB0AE] border border-[#15233a]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#071120] border-t border-[#15233a] px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#5A6267] font-mono">
            IP3 Advisory & Execution Archive · Verified Result
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#F3F0E8] hover:text-white bg-[#122238] border border-[#15233a] hover:border-[#EF715A] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Dossier Copied' : 'Copy Brief'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase bg-[#EF715A] text-[#F3F0E8] hover:bg-[#E05E47] transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface SelectedEngagementsSectionProps {
  className?: string;
}

export default function SelectedEngagementsSection({
  className = '',
}: SelectedEngagementsSectionProps) {
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);

  return (
    <section className={`w-full space-y-6 pt-6 border-t border-slate-800/80 ${className}`}>
      {/* Header */}
      <Header />

      {/* Grid of Engagements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {INITIAL_ENGAGEMENTS.map((engagement) => (
          <EngagementCard
            key={engagement.id}
            engagement={engagement}
            onSelect={setSelectedEngagement}
          />
        ))}
      </div>

      {/* Modal Detail Dossier */}
      <EngagementDetailModal
        engagement={selectedEngagement}
        onClose={() => setSelectedEngagement(null)}
      />
    </section>
  );
}
