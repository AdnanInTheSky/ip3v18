import React, { useState } from 'react';
import { ChevronDown, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SelectedEngagementsSection from './SelectedEngagementsSection';
import InstitutionalEngagementsSection from './InstitutionalEngagementsSection';

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  keyOutputs: string[];
}

export interface OutputCategory {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  strategicObjective: string;
  focusAreas: string[];
  primaryDeliverables: Deliverable[];
  typicalStakeholders: string[];
  suggestedTimeline: string;
}

export const OUTPUT_CATEGORIES: OutputCategory[] = [
  {
    id: 'strategies-policy-frameworks',
    number: '01',
    title: 'Strategies & Policy Frameworks',
    shortDescription: 'High-level strategic roadmaps, regulatory review instruments, and national or sectoral governance architectures.',
    fullOverview: 'Formulating coherent visionary policies, diagnostic sector studies, and actionable legal and regulatory frameworks designed to align long-term priorities with operational roadmaps.',
    strategicObjective: 'Establish clear normative direction, stakeholder alignment, and binding statutory clarity for national and sectoral priorities.',
    focusAreas: ['Sectoral Masterplans', 'Regulatory Harmonization', 'Legislative Briefs', 'National Roadmaps', 'Standards & Guidelines'],
    primaryDeliverables: [
      {
        id: 'del-1-1',
        name: 'National & Sector Strategic Roadmaps',
        description: 'Multi-year strategic blueprints delineating vision, strategic pillars, milestones, and target outcomes.',
        keyOutputs: ['Master strategy document', 'Implementation roadmap with milestone matrix', 'High-level stakeholder charter'],
      },
      {
        id: 'del-1-2',
        name: 'Policy Instruments & White Papers',
        description: 'Evidence-based policy positions and statutory recommendations vetted through peer review and consultations.',
        keyOutputs: ['Ministerial white paper', 'Draft legislative amendments & policy directives', 'Public consultation synthesis report'],
      },
      {
        id: 'del-1-3',
        name: 'Regulatory Impact Assessments (RIA)',
        description: 'Ex-ante economic, environmental, and administrative impact analyses of proposed rules or deregulation.',
        keyOutputs: ['Cost-benefit compliance models', 'Regulatory burden scorecard', 'Transitional rulebook'],
      },
      {
        id: 'del-1-4',
        name: 'Multi-Agency Governance Frameworks',
        description: 'Inter-ministerial protocols, oversight mandates, and decision-rights matrix across jurisdictional borders.',
        keyOutputs: ['Terms of Reference for oversight councils', 'Inter-agency MoU drafts', 'Escalation protocols'],
      },
    ],
    typicalStakeholders: ['Planning Commissions', 'Line Ministries', 'Regulatory Authorities', 'Industry Chambers', 'Civil Society Groups'],
    suggestedTimeline: '3 – 9 Months',
  },
  {
    id: 'project-preparation',
    number: '02',
    title: 'Project Preparation',
    shortDescription: 'Pre-feasibility assessments, technical scoping, risk registers, and bankable pipeline structuring.',
    fullOverview: 'Systematically de-risking prospective interventions through rigorous feasibility studies, environmental and social safeguards, and bankable project dossiers.',
    strategicObjective: 'Transform preliminary project concepts into mature, investment-ready, and execution-viable capital or operational programs.',
    focusAreas: ['Feasibility Studies', 'Terms of Reference (ToR)', 'ESG Safeguards', 'Risk Registers', 'Bankability Appraisals'],
    primaryDeliverables: [
      {
        id: 'del-2-1',
        name: 'Techno-Economic Feasibility Studies',
        description: 'Exhaustive demand analyses, site engineering viability reviews, and economic rate of return calculations.',
        keyOutputs: ['Comprehensive feasibility report', 'Demand & capacity forecast models', 'Site suitability dossier'],
      },
      {
        id: 'del-2-2',
        name: 'Bankable Terms of Reference (ToR) & Scopes',
        description: 'Granular procurement packages, design specifications, and contractual deliverables for EPC or advisory tenders.',
        keyOutputs: ['Tender-ready RFP packages', 'Scope of work specifications', 'Evaluation criteria rubrics'],
      },
      {
        id: 'del-2-3',
        name: 'Environmental, Social & Governance (ESG) Screening',
        description: 'Baseline environmental screenings, community impact assessments, and climate vulnerability stress-tests.',
        keyOutputs: ['ESG management plan (ESMP)', 'Stakeholder engagement plan (SEP)', 'Resettlement & mitigation guidelines'],
      },
      {
        id: 'del-2-4',
        name: 'Integrated Risk Mitigation Matrix',
        description: 'Quantitative categorization of regulatory, market, supply-chain, and operational risks paired with mitigation actions.',
        keyOutputs: ['Living risk register', 'Contingency response playbooks', 'Sensitivity analysis tables'],
      },
    ],
    typicalStakeholders: ['Project Implementation Units (PIUs)', 'Engineering Consultants', 'Procurement Boards', 'Local Municipalities'],
    suggestedTimeline: '4 – 12 Months',
  },
  {
    id: 'institutional-reform',
    number: '03',
    title: 'Institutional Reform',
    shortDescription: 'Organizational restructuring, mandate rationalization, operational workflows, and human capacity development.',
    fullOverview: 'Diagnosing institutional bottlenecks, optimizing organizational hierarchies, drafting standard operating procedures, and running change enablement initiatives.',
    strategicObjective: 'Build resilient, agile, and accountable organizations equipped with streamlined operating processes and skilled personnel.',
    focusAreas: ['Functional Reviews', 'Operating Model Design', 'SOPs & Workflows', 'Change Management', 'Competency Frameworks'],
    primaryDeliverables: [
      {
        id: 'del-3-1',
        name: 'Institutional Functional Diagnostics & Restructuring',
        description: 'Audits of mandate overlaps, decision bottlenecks, and organizational charts paired with target operating models.',
        keyOutputs: ['As-Is vs. To-Be organizational chart', 'Mandate clarification matrix', 'Job descriptions & grading structures'],
      },
      {
        id: 'del-3-2',
        name: 'Standard Operating Procedures (SOP) Compendium',
        description: 'Codified operational workflows with RACI matrices to eliminate administrative delays and guarantee compliance.',
        keyOutputs: ['End-to-end process maps', 'Digitized SOP manuals', 'Service-level agreement (SLA) benchmarks'],
      },
      {
        id: 'del-3-3',
        name: 'Change Enablement & Leadership Programs',
        description: 'Structured change interventions, executive coaching workshops, and resistance management roadmaps.',
        keyOutputs: ['Change readiness survey report', 'Executive transition toolkit', 'Train-the-trainer training modules'],
      },
      {
        id: 'del-3-4',
        name: 'Performance Accountability & Appraisal Systems',
        description: 'Key performance indicators (KPI) cascades connecting institutional targets to individual performance scorecards.',
        keyOutputs: ['Institutional scorecard framework', 'Departmental KPI registries', 'Continuous evaluation rubrics'],
      },
    ],
    typicalStakeholders: ['Agency Executives', 'Civil Service Commissions', 'Human Resources Divisions', 'Operations Teams'],
    suggestedTimeline: '6 – 18 Months',
  },
  {
    id: 'investment-finance',
    number: '04',
    title: 'Investment & Finance',
    shortDescription: 'Financial engineering, blended finance structures, capital allocation models, and investor/donor mobilization.',
    fullOverview: 'Structuring commercial and concessional capital, designing blended financing facilities, sovereign/subnational debt models, and investor pitch documentation.',
    strategicObjective: 'Unlock diverse, sustainable capital sources and optimize fiscal allocation for long-term economic durability.',
    focusAreas: ['Blended Finance Structures', 'Financial Modeling & DSCR', 'PPP Transaction Design', 'Grant & Donor Packages', 'Fiscal Sustainability Plans'],
    primaryDeliverables: [
      {
        id: 'del-4-1',
        name: 'Dynamic Financial & Cashflow Models',
        description: 'Fully audited financial projections, debt service coverage ratios (DSCR), IRR models, and stress testing.',
        keyOutputs: ['20-year dynamic financial model in Excel/Sheets', 'Scenario analysis dashboard', 'Fiscal sensitivity curves'],
      },
      {
        id: 'del-4-2',
        name: 'Blended Finance & De-Risking Instruments',
        description: 'Tiered capital stacks combining philanthropic grants, concessional development capital, and private equity/debt.',
        keyOutputs: ['Capital stack term sheet', 'First-loss guarantee mechanism draft', 'Concessional debt covenants'],
      },
      {
        id: 'del-4-3',
        name: 'Public-Private Partnership (PPP) Structure',
        description: 'Transaction advisory models, revenue-sharing agreements, concession contracts, and value-for-money (VfM) assessments.',
        keyOutputs: ['VfM comparative report', 'Draft concession agreement', 'Commercial viability summary'],
      },
      {
        id: 'del-4-4',
        name: 'Investor & Donor Mobilization Prospectus',
        description: 'Institutional-grade investment memorandums, roadshow presentations, and multilateral co-financing briefs.',
        keyOutputs: ['Confidential Information Memorandum (CIM)', 'Investor pitch deck', 'Donor co-financing dossier'],
      },
    ],
    typicalStakeholders: ['Ministries of Finance', 'Development Finance Institutions (DFIs)', 'Commercial Banks', 'Private Equity Sponsors', 'Sovereign Wealth Funds'],
    suggestedTimeline: '4 – 12 Months',
  },
  {
    id: 'evidence-evaluation',
    number: '05',
    title: 'Evidence & Evaluation',
    shortDescription: 'Data-driven analytics, baseline surveys, econometric analysis, and rigorous impact evaluation systems.',
    fullOverview: 'Establishing empirically verifiable theories of change, baseline datasets, longitudinal monitoring frameworks, and third-party evaluation reports.',
    strategicObjective: 'Ensure rigorous accountability, quantify tangible outcomes, and feed empirically validated insights into future policymaking.',
    focusAreas: ['Theory of Change (ToC)', 'Baseline & Endline Surveys', 'Impact Evaluations (RCT/DiD)', 'M&E Tracking Dashboards', 'Mid-Term Audits'],
    primaryDeliverables: [
      {
        id: 'del-5-1',
        name: 'Theory of Change & Results LogFrame',
        description: 'Logical frameworks establishing causal linkages between inputs, activities, outputs, outcomes, and high-level impact.',
        keyOutputs: ['Visual Theory of Change diagram', 'Comprehensive indicator dictionary', 'Data collection protocols'],
      },
      {
        id: 'del-5-2',
        name: 'Representative Baseline & Household Surveys',
        description: 'Statistically powered sampling design, field enumeration oversight, and validated baseline microdata sets.',
        keyOutputs: ['Survey sampling methodology report', 'Cleaned & codebooked microdataset', 'Comprehensive baseline analytical report'],
      },
      {
        id: 'del-5-3',
        name: 'Quasi-Experimental Impact Evaluations',
        description: 'Rigorous counterfactual analysis using difference-in-differences, regression discontinuity, or randomized evaluations.',
        keyOutputs: ['Econometric evaluation report', 'Causal attribution synthesis', 'Policy implication briefing note'],
      },
      {
        id: 'del-5-4',
        name: 'Continuous Monitoring & Indicator Dashboards',
        description: 'Real-time telemetry feeds and automated KPI reporting portals for ongoing project steering committees.',
        keyOutputs: ['Interactive M&E data dashboard', 'Quarterly monitoring bulletins', 'Early warning variance alerts'],
      },
    ],
    typicalStakeholders: ['Independent Evaluation Offices', 'Statistical Agencies', 'Donor Evaluators', 'Academic & Research Partners'],
    suggestedTimeline: 'Continuous / 6 – 36 Months',
  },
  {
    id: 'digital-ai-transformation',
    number: '06',
    title: 'Digital & AI Transformation',
    shortDescription: 'Digital public infrastructure, automated service delivery, data governance, and ethical enterprise AI deployment.',
    fullOverview: 'Architecting modern technological infrastructure, deploying high-integrity data pipelines, implementing AI-assisted public operations, and guarding data rights.',
    strategicObjective: 'Modernize service delivery, boost administrative productivity, and deploy responsible artificial intelligence infrastructure.',
    focusAreas: ['AI Adoption Roadmaps', 'Digital Public Infra (DPI)', 'Data Governance & Ethics', 'Workflow Automation', 'Cybersecurity & Standards'],
    primaryDeliverables: [
      {
        id: 'del-6-1',
        name: 'Enterprise AI Strategy & Governance Architecture',
        description: 'Strategic frameworks for secure generative and predictive AI integration, algorithmic auditing, and risk management.',
        keyOutputs: ['Enterprise AI roadmap & use-case catalog', 'Responsible AI ethical guidelines & guardrails', 'Model validation protocol'],
      },
      {
        id: 'del-6-2',
        name: 'Digital Public Infrastructure (DPI) Blueprints',
        description: 'Open-standard specifications for digital identity, interoperable payment gateways, and federated data exchange registries.',
        keyOutputs: ['DPI technical architecture blueprint', 'API specification catalog', 'Interoperability compliance checklist'],
      },
      {
        id: 'del-6-3',
        name: 'Automated Workflow & Citizen Service Digitization',
        description: 'End-to-end digitizing of legacy administrative procedures into responsive, mobile-first citizen interfaces.',
        keyOutputs: ['Digitized service flow wireframes', 'Microservice system architecture diagram', 'Pilot deployment report'],
      },
      {
        id: 'del-6-4',
        name: 'Data Architecture, Privacy & Cyber Hardening',
        description: 'Enterprise data mesh design, cryptographic access control, data anonymization rules, and vulnerability mitigation.',
        keyOutputs: ['Data governance framework', 'Information security policy handbook', 'Threat modeling & audit matrix'],
      },
    ],
    typicalStakeholders: ['Chief Information / Technology Officers (CIO/CTO)', 'Digital Transformation Agencies', 'Data Protection Authorities', 'Software Engineering Vendors'],
    suggestedTimeline: '6 – 24 Months',
  },
];

export interface CategoryItemProps {
  category: OutputCategory;
  defaultExpanded?: boolean;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border rounded-xl transition-all duration-200 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface-card)',
        borderColor: isExpanded
          ? 'var(--color-accent-primary)'
          : isHovered
          ? '#4f545c'
          : 'var(--border-default)',
      }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
        style={{
          backgroundColor: isExpanded ? 'var(--bg-surface-active)' : 'transparent',
        }}
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[11px] font-mono font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: isExpanded ? 'rgba(255, 126, 103, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                color: isExpanded ? 'var(--color-accent-primary)' : 'var(--text-muted)',
              }}
            >
              {category.number}
            </span>
            <h2
              className="text-lg font-semibold tracking-tight transition-colors"
              style={{
                color: isExpanded ? 'var(--color-accent-primary)' : 'var(--text-primary)',
              }}
            >
              {category.title}
            </h2>
          </div>
          <p
            className="text-sm mt-1 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {category.shortDescription}
          </p>
        </div>

        <div className="flex-shrink-0 p-1.5 rounded-lg">
          <ChevronDown
            className="w-5 h-5 transition-transform duration-200"
            style={{
              color: isExpanded ? 'var(--color-accent-primary)' : 'var(--text-muted)',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t"
            style={{
              borderColor: 'var(--border-default)',
              backgroundColor: 'var(--bg-surface-active)',
            }}
          >
            <div className="p-5 sm:p-6 space-y-5">
              {/* Strategic Objective */}
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-surface-card)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: 'var(--color-accent-primary)' }}
                >
                  Strategic Objective
                </div>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {category.strategicObjective}
                </p>
                <p
                  className="text-xs mt-2 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {category.fullOverview}
                </p>
              </div>

              {/* Deliverables Grid */}
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Primary Deliverables &amp; Work Products ({category.primaryDeliverables.length})
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.primaryDeliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-3.5 rounded-lg border flex flex-col justify-between"
                      style={{
                        backgroundColor: 'var(--bg-surface-card)',
                        borderColor: 'var(--border-default)',
                      }}
                    >
                      <div>
                        <div
                          className="text-sm font-semibold leading-snug"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {del.name}
                        </div>
                        <p
                          className="text-xs mt-1 leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {del.description}
                        </p>
                      </div>

                      <div
                        className="mt-3 pt-2.5 border-t"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        <span
                          className="text-[11px] font-semibold block mb-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Key Outputs:
                        </span>
                        <ul className="text-xs space-y-1">
                          {del.keyOutputs.map((output, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span
                                className="font-bold"
                                style={{ color: 'var(--color-accent-primary)' }}
                              >
                                •
                              </span>
                              <span
                                className="leading-tight"
                                style={{ color: 'var(--text-primary)' }}
                              >
                                {output}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stakeholders & Horizon */}
              <div
                className="pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Users
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: 'var(--color-accent-primary)' }}
                  />
                  <span>
                    <strong style={{ color: 'var(--text-muted)' }}>Key Stakeholders:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {category.typicalStakeholders.join(', ')}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Clock
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: 'var(--color-accent-gold)' }}
                  />
                  <span>
                    <strong style={{ color: 'var(--text-muted)' }}>Delivery Horizon:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {category.suggestedTimeline}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface OutputCategoriesListProps {
  embedded?: boolean;
  className?: string;
}

export default function OutputCategoriesList({
  embedded = false,
  className = '',
}: OutputCategoriesListProps = {}) {
  return (
    <div
      className={`${embedded ? 'w-full' : 'min-h-screen'} flex flex-col font-sans antialiased ${className}`}
      style={{
        backgroundColor: embedded ? 'transparent' : 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Header */}
      <header
        className={`${embedded ? 'rounded-2xl border' : 'border-b'} transition-colors`}
        style={{
          backgroundColor: 'var(--bg-surface-card)',
          borderColor: 'var(--border-default)',
        }}
      >
        <div className={`${embedded ? 'w-full' : 'max-w-4xl mx-auto'} px-4 sm:px-6 py-6`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#ff7e67] uppercase">
              TRANSLATIONAL CAPABILITIES
            </span>
          </div>
          <h1
            className="text-xl sm:text-2xl font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Strategic Output Categories
          </h1>
          <p
            className="text-xs sm:text-sm mt-1 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Strategies &amp; Policy Frameworks · Project Preparation · Institutional Reform · Investment &amp; Finance · Evidence &amp; Evaluation · Digital &amp; AI Transformation
          </p>
        </div>
      </header>

      {/* Main List */}
      <main className={`flex-1 ${embedded ? 'w-full' : 'max-w-4xl mx-auto'} w-full px-0 sm:px-0 py-6 sm:py-8`}>
        <div className="space-y-3">
          {OUTPUT_CATEGORIES.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              defaultExpanded={false}
            />
          ))}
        </div>
      </main>

      {/* Selected Engagements Component directly after main */}
      <SelectedEngagementsSection />

      {/* Institutional Engagements Pipeline (Styled like sector-systems-items-container) */}
      <InstitutionalEngagementsSection />
    </div>
  );
}
