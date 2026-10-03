export type SystemNodeId = 'institutions' | 'policy' | 'evidence' | 'technology' | 'finance' | 'delivery' | 'core';

export interface SystemNodeInfo {
  id: SystemNodeId;
  label: string;
  category: string;
  tagline: string;
  description: string;
  extendedOverview: string;
  color: string;
  connections: SystemNodeId[];
  keyCapabilities: string[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  caseStudyHighlight: {
    title: string;
    context: string;
    outcome: string;
  };
}

export interface WorkflowStage {
  step: string;
  subtitle: string;
  title: string;
  description: string;
  output: string;
  tools: string[];
}

export interface OverlapItem {
  id: string;
  title: string;
  source: SystemNodeId;
  target: SystemNodeId;
  architectureFocus: string;
  description: string;
  deliverables: string[];
}

export const SYSTEM_NODES: Record<SystemNodeId, SystemNodeInfo> = {
  core: {
    id: 'core',
    label: 'IP3 Core',
    category: 'System Overlaps Nexus',
    tagline: 'The Convergence of Policy, Evidence, Tech, Finance & Institutions',
    description: 'The core integrative engine where policy intelligence meets technical implementation. IP3 bridges systemic silos to convert high-level mandates into operational, resilient public and private infrastructures.',
    extendedOverview: 'Traditional consulting stops at policy recommendations or technical specifications. IP3 operates as a unified systems integrator, translating abstract legislation and economic goals into production-grade governance architectures, data pipelines, and funding mechanisms.',
    color: '#ff7e67',
    connections: ['institutions', 'policy', 'evidence', 'technology', 'finance'],
    keyCapabilities: [
      'Cross-Domain Systems Integration',
      'End-to-End Implementation Architecture',
      'Multilateral Governance Orchestration',
      'Policy-to-Execution Stress Testing',
      'Institutional Resilience Engineering'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  institutions: {
    id: 'institutions',
    label: 'From poly-crises to poly-solutions',
    category: 'Systemic Resolution Engine',
    tagline: 'Translating complex systemic crises into coordinated actionable architectures',
    description: 'Transforming institutional capacity, organizational structures, and regulatory mandates to execute modern complex public missions.',
    extendedOverview: 'We architect institutional operating models that eliminate bureaucratic gridlock. Through restructuring workflows, establishing change coalitions, and building sovereign digital capabilities, we prepare ministries, regulators, and civic bodies for continuous systemic adaptation.',
    color: '#ff7e67',
    connections: ['policy', 'evidence', 'core'],
    keyCapabilities: [
      'Public Sector Organizational Redesign',
      'Civil Service Digital Capability Upskilling',
      'Inter-Agency Taskforce Governance Frameworks',
      'Regulatory Authority Modernization',
      'Crisis Response Institutional Hardening'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  policy: {
    id: 'policy',
    label: 'Translation not theory',
    category: 'Implementation Framework',
    tagline: 'Foresight, Regulatory Design & Legislative Engineering',
    description: 'Translating political and societal priorities into precise, actionable policy frameworks engineered for real-world viability.',
    extendedOverview: 'Policy without implementation architecture remains wishful thinking. IP3 crafts policy documents that incorporate regulatory tech specs, economic impact simulations, and legal enforcement roadmaps from day one.',
    color: '#ff7e67',
    connections: ['institutions', 'technology', 'core'],
    keyCapabilities: [
      'Legislative Drafting & Regulatory Sandboxes',
      'Geopolitical & Macro-Risk Strategic Foresight',
      'Market Mechanism Design & Incentive Engineering',
      'Cross-Border Policy Harmonization',
      'Public Consultation & Consensus Synthesis'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  evidence: {
    id: 'evidence',
    label: 'A convenor between worlds.',
    category: 'Neutral Convening Ecosystem',
    tagline: 'Multi-Stakeholder Alignment, Institutional Coalitions & Global South Bridges',
    description: 'Reform never belongs to a single actor. IP3 sits between governments, development partners, civil society, academia, the private sector, communities, and technology providers — aligning incentives, evidence, and delivery capacity around shared outcomes.',
    extendedOverview: 'IP3 functions as a neutral, trusted bridge across sectors, ministries, and jurisdictions. We convene working groups, policy labs, and international coalitions to overcome coordination failure and turn fractured agendas into cohesive national movements.',
    color: '#34d399',
    connections: ['institutions', 'finance', 'core'],
    keyCapabilities: [
      'Multi-Stakeholder Accord Compacts',
      'Neutral Working Group Charters',
      'Cross-Ministerial Alignment Frameworks',
      'Public-Private Coalition Engineering',
      'Evidence-to-Action Bilateral Bridges'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  technology: {
    id: 'technology',
    label: 'Thinking that ships.',
    category: 'Digital Public Infrastructure',
    tagline: 'Open Protocols, Digital Identity & Sovereign Cloud Systems',
    description: 'Engineering the digital backbone for modern state capacity, interoperable public data rails, and citizen-centric services.',
    extendedOverview: 'We design and deploy open, vendor-neutral digital public infrastructure (DPI). By leveraging modular open-source protocols, secure APIs, and sovereign cloud architectures, we prevent vendor lock-in and democratize digital access.',
    color: '#ff7e67',
    connections: ['policy', 'finance', 'core'],
    keyCapabilities: [
      'Digital Public Infrastructure (DPI) Blueprinting',
      'Sovereign Identity & Verifiable Credentials',
      'Interoperable API & Data Exchange Gateways',
      'Zero-Trust Cybersecurity Architecture',
      'AI & Automated Decision System Governance'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  finance: {
    id: 'finance',
    label: 'Thinking that ships.',
    category: 'Capital Orchestration',
    tagline: 'Blended Finance, Green Transition & Public Investment Strategy',
    description: 'Structuring innovative financing vehicles, catalytic public-private partnerships, and ESG-aligned capital pipelines.',
    extendedOverview: 'Capital allocation must match long-term systemic impact. We structure blended finance facilities, green transition bonds, and performance-based procurement models that derisk private institutional capital for public good.',
    color: '#ff7e67',
    connections: ['evidence', 'technology', 'core'],
    keyCapabilities: [
      'Blended Finance & Risk-Mitigation Facilities',
      'Sovereign Green Bond & Sukuk Structuring',
      'Results-Based & Outcomes-Linked Financing',
      'Public-Private Partnership (PPP) Feasibility',
      'Multilateral Development Bank (MDB) Co-Financing'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  },
  delivery: {
    id: 'delivery',
    label: 'Delivery & Adaptive Learning',
    category: 'Implementation & Scale Engine',
    tagline: 'Cabinet Delivery Units, Operational Telemetry & Capability Transfer',
    description: 'Standing up dedicated delivery units, installing real-time execution telemetry, and transferring operational capability to domestic civil servants.',
    extendedOverview: 'Reform cannot end with statutory passage. IP3 embeds agile delivery units inside key ministries, deploying real-time milestone telemetry and structured competency transfer tracks to ensure public systems operate autonomously and iterate continuously.',
    color: '#10b981',
    connections: ['technology', 'finance', 'core'],
    keyCapabilities: [
      'Cabinet-Level Delivery Unit (PMO) Setup',
      'Real-Time Milestone Telemetry Dashboards',
      'Civil Service Competency Upskilling',
      'Adaptive MERLA & Feedback Recalibration',
      'National Sovereign Memory Codification'
    ],
    metrics: [],
    caseStudyHighlight: {
      title: '',
      context: '',
      outcome: ''
    }
  }
};

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    subtitle: 'DIAGNOSTIC & STRATEGIC FORESIGHT',
    title: 'System Boundary Mapping & Root Cause Discovery',
    description: 'We deploy econometric simulations, stakeholder network graph analysis, and legislative audit frameworks to map hidden institutional friction points and structural market failures.',
    output: 'Systemic Diagnostic Dossier & Macro Policy Sandbox Blueprint',
    tools: ['Spatial Econometrics', 'Agent-Based Policy Modeling', 'Statutory Gap Analysis', 'Institutional Risk Topology']
  },
  {
    step: '02',
    subtitle: 'REGULATORY & INSTITUTIONAL DESIGN',
    title: 'Statutory Drafting, Mandate Engineering & Governance Architecture',
    description: 'We draft statutory instruments, ministerial operational charters, and inter-agency coordination protocols with integrated compliance validation mechanisms.',
    output: 'Enactable Statutory Frameworks & Executive Delivery Mandates',
    tools: ['Regulatory Sandbox Rulebooks', 'Inter-Ministerial RACI Matrices', 'Compliance API Schemas', 'Public Deliberation Protocols']
  },
  {
    step: '03',
    subtitle: 'TECHNICAL & CAPITAL SPECIFICATION',
    title: 'Digital Public Infrastructure (DPI) & Blended Finance Structuring',
    description: 'We convert ratified policy mandates into technical API schemas, open data exchange rails, and de-risked capital mobilization facilities in partnership with development finance institutions.',
    output: 'Production-Ready Technical Specifications & Syndicated Financing Vehicles',
    tools: ['OpenAPI & Verifiable Credentials Specs', 'Blended Guarantee Mechanism Models', 'Procurement Tender Architecture', 'Security & Zero-Trust Audits']
  },
  {
    step: '04',
    subtitle: 'EXECUTION & MERLA TELEMETRY',
    title: 'Continuous Delivery, Telemetry Dashboards & Iterative Scaling',
    description: 'We embed multidisciplinary implementation units within government bodies to oversee pilot deployment, live sensor data aggregation, and real-time policy impact adaptation.',
    output: 'Live National Policy Telemetry Dashboard & Long-Term Sovereign Handover Protocol',
    tools: ['Real-Time Epidemiological/Economic Dashboards', 'Longitudinal Impact Regressions', 'Institutional Knowledge Handover Protocols', 'Sovereign DevSecOps Rails']
  }
];

export const OVERLAP_MATRIX: OverlapItem[] = [
  {
    id: 'dpi-finance',
    title: 'Digital Public Infrastructure × Blended Capital (FinTech DPI)',
    source: 'technology',
    target: 'finance',
    architectureFocus: 'Scalable Micro-Financing & Sovereign Rails',
    description: 'Deploying open-source verifiable identity protocols linked with automated micro-credit de-risking facilities to onboard unbanked micro-enterprises.',
    deliverables: [
      'Interoperable Instant Payment Gateway (UPI-equivalent)',
      'Automated Credit Scoring on Open Telemetry Data',
      'Multilateral First-Loss Guarantee Smart Contracts'
    ]
  },
  {
    id: 'policy-institutions',
    title: 'Statutory Design × Institutional Modernization (State Capacity)',
    source: 'policy',
    target: 'institutions',
    architectureFocus: 'Agile Public Administration Frameworks',
    description: 'Drafting agile regulatory sandboxes coupled with dedicated executive delivery units (EDUs) to accelerate bureaucratic reform without political deadlock.',
    deliverables: [
      'Cross-Ministerial Delivery Unit Charters',
      'Performance-Linked Civil Service KPI Matrices',
      'Fast-Track Regulatory Sandbox Protocols'
    ]
  },
  {
    id: 'evidence-finance',
    title: 'Spatial Econometrics × Climate Transition Finance (Green Bonds)',
    source: 'evidence',
    target: 'finance',
    architectureFocus: 'Empirical Decarbonization Underwriting',
    description: 'Structuring sovereign green bonds verified by real-time satellite remote sensing telemetry and parametric climate impact triggers.',
    deliverables: [
      'Satellite-Ground Truth Automated ESG Audits',
      'Parametric Disaster Relief Bond Triggers',
      'Blended MDB Capital De-risking Facility'
    ]
  },
  {
    id: 'tech-evidence',
    title: 'Open Data Rails × Longitudinal Telemetry (MERLA Engine)',
    source: 'technology',
    target: 'evidence',
    architectureFocus: 'Real-Time Evidence-Based Governance',
    description: 'Constructing unified health and educational data exchange pipelines that feed automated machine-learning causal impact evaluators.',
    deliverables: [
      'Zero-Trust Data Interoperability Exchange',
      'Automated Econometric Causal Inference Pipeline',
      'National Executive Decision Support Dashboard'
    ]
  }
];
