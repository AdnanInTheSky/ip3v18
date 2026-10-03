/**
 * Pure data for the IP3 Policy Architecture section.
 *
 * Extracted out of Ip3PolicySection.tsx to break a circular import
 * (CMSContext -> Ip3PolicySection -> CMSContext) and, more importantly, so the
 * seed script can import the defaults in Node without pulling in React.
 * This module must stay free of React and of any browser-only API.
 */

export type SectorCategory = 'climate' | 'education' | 'governance' | 'merla' | 'feasibility';

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  detailedBody: string;
  iconName: string;
  videoUrl?: string;
  imageUrl: string;
  keyStats: { label: string; value: string }[];
  keySolutions: string[];
  targetSDGs: string[];
  featuredProjectTitle: string;
  featuredProjectSummary: string;
  extendedProblem?: string;
  extendedMethodology?: string;
  measurableOutcomes?: { value: string; label: string; description: string }[];
}

export interface ServiceSolution {
  id: string;
  title: string;
  shortTag: string;
  iconName: string;
  description: string;
  deliverables: string[];
  methodology: string;
  caseStudyHighlight: string;
  imageUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: SectorCategory;
  categoryLabel: string;
  partner: string;
  partnerLogoText?: string;
  year: string;
  location: string;
  description: string;
  keyOutcome: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
  detailedScope?: string;
  methodology?: string;
}

// ==========================================
// 2. DATA CONSTANTS - RESEARCH FARM
// ==========================================

export const FOCUS_AREAS: FocusArea[] = [];

export const SERVICES: ServiceSolution[] = [
  {
    id: 'public-policy-innovation',
    title: 'Public Policy Innovation & Action Research',
    shortTag: 'Policy & Research',
    iconName: 'Compass',
    description: 'Groundbreaking policy formulation using systems dynamics, empirical political economy analysis, and action research designed for actionable governance reform.',
    deliverables: [
      'Regulatory Impact Analysis (RIA)',
      'Political Economy Assessments',
      'Policy Whitepapers & Legislative Blueprints',
      'Stakeholder Consultation Frameworks'
    ],
    methodology: 'Iterative systems dynamics combined with rigorous field-level qualitative and quantitative data collection.',
    caseStudyHighlight: '',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'climate-action-sustainability',
    title: 'Climate Action & Sustainability Solutions',
    shortTag: 'Climate & ESG',
    iconName: 'SunMedium',
    description: 'Strategic decarbonization roadmaps, carbon accounting, climate resilience frameworks, and ESG disclosure mechanisms aligned with international standards.',
    deliverables: [
      'Corporate Decarbonization Pathways',
      'Climate Risk & Vulnerability Assessments',
      'ESG Reporting & Compliance Frameworks',
      'Green Finance & Taxonomy Verification'
    ],
    methodology: 'Life-cycle greenhouse gas assessments, climate risk modeling (TCFD), and ecological systems auditing.',
    caseStudyHighlight: '',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'economic-feasibility-studies',
    title: 'Economic, Financial & Environmental Feasibility Studies',
    shortTag: 'Feasibility Assessment',
    iconName: 'Calculator',
    description: 'Rigorous multi-criteria project evaluation blending cost-benefit analysis, discounted cash flow modeling, and environmental impact assessments.',
    deliverables: [
      'Bankable Feasibility Studies & DPRs',
      'Discounted Cash Flow & Sensitivity Models',
      'Environmental & Social Impact Studies (ESIA)',
      'Capital Expenditure & Risk Mitigation Blueprints'
    ],
    methodology: 'Comprehensive socio-economic cost-benefit analysis (CBA), stochastic financial modeling, and environmental impact screening.',
    caseStudyHighlight: '',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'merla-frameworks',
    title: 'Monitoring, Evaluation, Research, Learning & Adaptation (MERLA)',
    shortTag: 'MERLA Frameworks',
    iconName: 'Activity',
    description: 'Adaptive management frameworks integrating real-time telemetry, quantitative indicators, and counterfactual evaluation for iterative policy course correction.',
    deliverables: [
      'Real-Time Policy Evaluation Systems',
      'Experimental & Quasi-Experimental MERLA',
      'Automated KPI Telemetry Dashboards',
      'Evidence-Based Policy Feedback Loops'
    ],
    methodology: 'Theory of change mapping, quasi-experimental counterfactual evaluations, and automated telemetry dashboards.',
    caseStudyHighlight: '',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'program-survey-design',
    title: 'Program & Survey Design & Management',
    shortTag: 'Survey & Field Operations',
    iconName: 'FileText',
    description: 'End-to-end design and deployment of large-scale socio-economic field surveys, institutional censuses, and automated Computer-Assisted Personal Interviewing (CAPI) systems.',
    deliverables: [
      'Statistically Stratified Survey Protocols',
      'CAPI Digital Field Data Architectures',
      'Enumerator Capacity & Quality Auditing',
      'Cleaned Longitudinal Data Products'
    ],
    methodology: 'Stratified probabilistic sampling, digital CAPI tool engineering, and real-time field data quality verification protocols.',
    caseStudyHighlight: '',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200'
  }
];

export const PROJECTS: ProjectItem[] = [];

