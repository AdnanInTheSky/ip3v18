export interface NavPromoItem {
  eyebrow: string;
  title: string;
  image: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  sectionId?: string;
  desc?: string;
  page?: 'home' | 'about' | 'approach' | 'focus' | 'services' | 'people';
}

export interface NavColumnItem {
  title?: string;
  links: NavLinkItem[];
}

export interface PrimaryNavItem {
  id: string;
  label: string;
  href: string;
  sectionId: string;
  page?: 'home' | 'about' | 'approach' | 'focus' | 'services' | 'people';
  links: NavLinkItem[];
  columns: NavColumnItem[];
  promos: NavPromoItem[];
}

export const primaryNav: PrimaryNavItem[] = [
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
    sectionId: '#overview',
    page: 'about',
    links: [
      { label: 'Overview', href: '/about#overview', sectionId: '#overview', page: 'about', desc: 'Mission, institutional heritage, ecosystem & four strategic fronts' },
      { label: 'IP3 People', href: '/people', sectionId: '#faculty', page: 'people', desc: 'Global faculty of economists, researchers, fellows & executive leadership' },
    ],
    columns: [],
    promos: [
      {
        eyebrow: 'IP3 PEOPLE',
        title: 'Meet our global faculty of economists, researchers, and policy practitioners',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        href: '/people',
      },
      {
        eyebrow: 'INSTITUTIONAL HERITAGE',
        title: 'Decades of systemic advisory across sovereign institutions and global partners',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        href: '/about#overview',
      },
    ],
  },
  {
    id: 'approach',
    label: 'Our Approach',
    href: '/approach',
    sectionId: '#journey',
    page: 'approach',
    links: [],
    columns: [],
    promos: [],
  },
  {
    id: 'focus-areas',
    label: 'Focus Areas',
    href: '/focus',
    sectionId: '#focus-areas',
    page: 'focus',
    links: [],
    columns: [],
    promos: [],
  },
  {
    id: 'services',
    label: 'Our Services',
    href: '/services',
    sectionId: '#services',
    page: 'services',
    links: [
      { label: 'Economic Assessment & Feasibility', href: '/services#economic', sectionId: '#economic', page: 'services', desc: 'Cost-benefit analysis, tariff modeling & financial viability' },
      { label: 'Climate Action & Sustainability', href: '/services#climate', sectionId: '#climate', page: 'services', desc: 'Regenerative economics, carbon audits & ESG disclosure' },
      { label: 'Program & Survey Design (CAPI)', href: '/services#design', sectionId: '#design', page: 'services', desc: 'Sampling frameworks, multi-tier QA & nationwide data engines' },
      { label: 'Monitoring & Evaluation (MERLA)', href: '/services#merla', sectionId: '#merla', page: 'services', desc: 'Impact evaluation, results frameworks & digital monitoring' },
      { label: 'Macro & Sector Policy Advisory', href: '/services#macro-policy', sectionId: '#macro-policy', page: 'services', desc: 'Fiscal frameworks, industrial policy & structural reforms' },
    ],
    columns: [],
    promos: [
      {
        eyebrow: 'PRACTICE 01 • ECONOMIC',
        title: 'Rigorous Economic & Environmental Feasibility Assessments',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        href: '/services#economic',
      },
      {
        eyebrow: 'PRACTICE 04 • MERLA',
        title: 'Impact Evaluation & Adaptive Real-Time Monitoring Systems',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        href: '/services#merla',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navbar chrome (brand, CTA, top bar) — CMS controlled                */
/* ------------------------------------------------------------------ */

export interface NavbarBrandConfig {
  /** Short mark shown inside the coloured logo tile, e.g. "IP3". */
  badgeText: string;
  /** Wordmark next to the logo tile. */
  name: string;
  /** Small line under the wordmark. */
  tagline: string;
  /** Green "live" dot on the logo tile. */
  showStatusDot: boolean;
  /** Optional image URL; replaces the badge tile when set. */
  logoImage?: string;
}

export interface NavbarCtaConfig {
  enabled: boolean;
  label: string;
  /** Section id to scroll to, e.g. "#contact-advisory". */
  targetId: string;
}

export interface NavbarTopBarConfig {
  enabled: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  /** Pulsing-dot label on the right, e.g. "Global Policy Advisory Desk". */
  statusLabel: string;
}

export interface NavbarConfig {
  brand: NavbarBrandConfig;
  cta: NavbarCtaConfig;
  topBar: NavbarTopBarConfig;
  searchEnabled: boolean;
  searchPlaceholder: string;
  /** Badge in the top-right of every mega menu panel. */
  megaMenuBadge: string;
  skipLinkLabel: string;
}

export const defaultNavbarConfig: NavbarConfig = {
  brand: {
    badgeText: 'IP3',
    name: 'IP3 AGRISCIENCE',
    tagline: 'Precision Research Farm',
    showStatusDot: false,
    logoImage: '/images/ip3-logo.svg',
  },
  cta: {
    enabled: true,
    label: 'Field Trials & Contact',
    targetId: '#contact-advisory',
  },
  topBar: {
    enabled: true,
    showEmail: true,
    showPhone: true,
    showLocation: true,
    statusLabel: 'Research Farm Operations Active',
  },
  searchEnabled: true,
  searchPlaceholder: 'Search field trials, soil science & research data...',
  megaMenuBadge: 'IP3 AGRISCIENCE',
  skipLinkLabel: 'Skip to main content',
};

