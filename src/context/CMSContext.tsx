import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { loadContent, saveContent } from '../lib/contentStore';
import { SlideItem } from '../types';
import type {
  Movie, OfficeInfo, ServiceOption, StatItem, FaqItem, ExecutiveProfile, ImpactPillar,
  TeamMember, ResearchSectionData, OperationalFront, ParallaxCardItem, FocusAreaItem,
  ProjectItemData, ServiceSolutionItem, TreeFrameworkData, TrustMatrixData,
  TestimonialSectionData, SiteThemeConfig, StoryTheme, SystemsHeroSectionData,
  WhyIp3Config,
  EightSystemsConfig,
  CorridorHeroConfig,
} from '../types';

// Defaults live in ../data/defaultContent so `npm run db:seed` can load them in
// Node. Re-exported here because components already import them from this file.
import { DEFAULT_WEBSITE_DATA, defaultThemeConfig, defaultEightSystemsConfig, defaultCorridorHero, defaultWhyIp3 } from '../data/defaultContent';
import type { WebsiteData } from '../data/defaultContent';
import type { PrimaryNavItem, NavbarConfig } from '../data/navigationData';

export type { WebsiteData };
export {
  DEFAULT_WEBSITE_DATA,
  defaultTreeFramework,
  defaultTestimonialsSection,
  defaultTrustMatrix,
  defaultThemeConfig,
  defaultResearchSection,
  defaultOperationalFronts,
  defaultParallaxCards,
  defaultTeamMembers,
  defaultEightSystemsConfig,
  defaultWhyIp3,
  defaultCorridorHero,
} from '../data/defaultContent';
export { primaryNav as defaultNavigation, defaultNavbarConfig } from '../data/navigationData';
export type { PrimaryNavItem, NavLinkItem, NavColumnItem, NavPromoItem, NavbarConfig } from '../data/navigationData';

interface CMSContextType {
  data: WebsiteData;
  themeMode: 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
  toggleTheme: () => void;
  updateSlides: (slides: SlideItem[]) => void;
  updateMovie: (movie: Movie) => void;
  updateOfficeInfo: (officeInfo: OfficeInfo) => void;
  updateServices: (services: ServiceOption[]) => void;
  updateTrustStats: (stats: StatItem[]) => void;
  updateFaqItems: (faqs: FaqItem[]) => void;
  updateExecutive: (executive: ExecutiveProfile) => void;
  updateImpactPillars: (pillars: ImpactPillar[]) => void;
  updateTeamMembers: (team: TeamMember[]) => void;
  updateResearchSection: (researchSection: ResearchSectionData) => void;
  updateOperationalFronts: (fronts: OperationalFront[]) => void;
  updateParallaxCards: (cards: ParallaxCardItem[]) => void;
  updateFocusAreas: (focusAreas: FocusAreaItem[]) => void;
  updateProjects: (projects: ProjectItemData[]) => void;
  updateServiceSolutions: (serviceSolutions: ServiceSolutionItem[]) => void;
  updateTreeFramework: (treeFramework: TreeFrameworkData) => void;
  updateTestimonialsSection: (testimonialsSection: TestimonialSectionData) => void;
  updateTrustMatrix: (trustMatrix: TrustMatrixData) => void;
  updateThemeConfig: (themeConfig: SiteThemeConfig) => void;
  updateStoryThemes: (storyThemes: StoryTheme[]) => void;
  updateSystemsHero: (systemsHero: SystemsHeroSectionData) => void;
  updateWhyIp3: (whyIp3: WhyIp3Config) => void;
  updateEightSystems: (eightSystems: EightSystemsConfig) => void;
  updateCorridorHero: (corridorHero: CorridorHeroConfig) => void;
  updateNavigation: (navigation: PrimaryNavItem[]) => void;
  updateNavbar: (navbar: NavbarConfig) => void;
  resetAllContent: () => void;
  importJsonData: (jsonString: string) => boolean;
  exportJsonData: () => string;
  /** Backend sync state (MongoDB via the Express API). */
  readOnly: boolean;
  /** True once content has been loaded from MongoDB (not bundled defaults). */
  isLoaded: boolean;
  syncStatus: 'idle' | 'loading' | 'saving' | 'saved' | 'error' | 'offline';
  syncError: string | null;
  lastSyncedAt: string | null;
  /** Increments on every publish; useful for showing what is live. */
  contentVersion: number | null;
  reloadFromServer: () => Promise<void>;
  saveToServer: () => Promise<boolean>;
}


const CMSContext = createContext<CMSContextType | undefined>(undefined);

interface CMSProviderProps {
  children: ReactNode;
  /**
   * The public website mounts the provider read-only: it fetches published
   * content from MongoDB but never writes back. Only the separate,
   * password-protected /admin app mounts it writable.
   */
  readOnly?: boolean;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children, readOnly = false }) => {
  /**
   * Hardcoded default content is the definitive source of truth on load.
   * No localStorage synchronization is used.
   */
  const [data, setData] = useState<WebsiteData>(DEFAULT_WEBSITE_DATA);

  const [themeMode, setThemeModeState] = useState<'dark'>('dark');

  // One-time cleanup of any legacy localStorage keys
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('ip3_site_content_permanent');
      } catch {}
    }
  }, []);

  // ------------------------------ backend sync ------------------------------
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error' | 'offline'>('loading');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [contentVersion, setContentVersion] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const latestDataRef = useRef<WebsiteData>(data);
  latestDataRef.current = data;

  /** Guards the autosave: defaults must never overwrite published content. */
  const hydratedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Publishes the whole tree. Only the admin app ever reaches this. */
  const pushToServer = async (payload: WebsiteData): Promise<boolean> => {
    if (readOnly) return false;

    setSyncStatus('saving');
    setSyncError(null);

    const res = await saveContent(payload);

    if (res.ok) {
      setSyncStatus('saved');
      setContentVersion(res.version ?? null);
      setLastSyncedAt(res.updatedAt || new Date().toISOString());
      return true;
    }

    // An unpublished edit must never look published.
    setSyncStatus(res.code === 'NETWORK' ? 'offline' : 'error');
    setSyncError(res.error || 'Could not publish to the database.');
    return false;
  };

  const saveToServer = () => pushToServer(latestDataRef.current);

  const sanitizeNav = (nav?: PrimaryNavItem[]): PrimaryNavItem[] | undefined => {
    if (!nav || !Array.isArray(nav)) return nav;

    const defaultApproach = DEFAULT_WEBSITE_DATA.navigation?.find((i) => i.id === 'approach');
    let working = [...nav];
    if (!working.some((i) => i.id === 'approach') && defaultApproach) {
      const aboutIdx = working.findIndex((i) => i.id === 'about');
      if (aboutIdx !== -1) {
        working.splice(aboutIdx + 1, 0, defaultApproach);
      } else {
        working.push(defaultApproach);
      }
    }

    return working.map((item) => {
      if (item.id === 'about') {
        const cleanedLinks = (item.links || [])
          .filter((l) => !l.href.includes('approach') && !l.label.toLowerCase().includes('approach'))
          .map((l) => {
            if (l.label.toLowerCase().includes('people') || l.href.includes('people')) {
              return { ...l, href: '/people', page: 'people' as const, sectionId: '#faculty' };
            }
            return l;
          });
        const cleanedPromos = (item.promos || [])
          .filter((p) => !p.eyebrow.toLowerCase().includes('approach') && !p.href.includes('approach'))
          .map((p) => {
            if (p.eyebrow.toLowerCase().includes('people') || p.href.includes('people')) {
              return { ...p, href: '/people' };
            }
            return p;
          });
        return { ...item, links: cleanedLinks, promos: cleanedPromos, columns: [] };
      }
      if (item.id === 'approach' || item.id === 'focus-areas') {
        return { ...item, links: [], promos: [], columns: [] };
      }
      if (item.id === 'about' || item.id === 'services') {
        return { ...item, columns: [] };
      }
      const safeCols = (item.columns || []).filter((col) => {
        const title = (col.title || '').toLowerCase().trim();
        if (
          title.includes('about sub-page') ||
          title.includes('institutional governance') ||
          title.includes('analytical & survey') ||
          title.includes('analytical') ||
          title.includes('advisory & systems')
        ) return false;
        const hasBannedLink = col.links?.some((l) => {
          const lbl = (l.label || '').toLowerCase();
          return (
            lbl.includes('operating model') ||
            lbl.includes('delivery lifecycle') ||
            lbl.includes('global fellows') ||
            lbl.includes('01. overview') ||
            lbl.includes('02. ip3 people') ||
            lbl.includes('03. approach') ||
            lbl.includes('economic assessment') ||
            lbl.includes('climate action') ||
            lbl.includes('survey des') ||
            lbl.includes('merla solutions') ||
            lbl.includes('macro & sector') ||
            lbl.includes('digital transformation') ||
            lbl.includes('capacity buil') ||
            lbl.includes('practice deliverables')
          );
        });
        return !hasBannedLink;
      });
      return { ...item, columns: safeCols };
    });
  };

  /**
   * Reconciles with server while preserving hardcoded defaults.
   */
  const reloadFromServer = async () => {
    setSyncStatus('loading');
    setSyncError(null);

    const res = await loadContent();

    if (res.data) {
      const merged = {
        ...DEFAULT_WEBSITE_DATA,
        ...(res.data as Partial<WebsiteData>),
      };
      if (merged.navigation) {
        merged.navigation = sanitizeNav(merged.navigation);
      }
      setData(merged);
      setContentVersion(res.version ?? null);
      setLastSyncedAt(res.updatedAt || new Date().toISOString());
      setSyncStatus('saved');
    } else if (res.error) {
      setSyncStatus('offline');
      setSyncError(res.error);
    } else {
      setSyncStatus('idle');
      setContentVersion(0);
    }

    setIsLoaded(true);
    hydratedRef.current = true;
  };

  useEffect(() => {
    void reloadFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync theme class & attribute on <html> - always sovereign dark mode.
  // Nothing is persisted client-side; the mode is a constant of the design.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  }, []);

  // Dynamically load imported fonts (Google fonts, Web URLs, uploaded font files)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const importedFonts = data.themeConfig?.importedFonts || [];

    // Style element for custom @font-face rules
    let styleEl = document.getElementById('imported-fonts-style') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'imported-fonts-style';
      document.head.appendChild(styleEl);
    }

    const cssRules: string[] = [];
    const activeLinkIds = new Set<string>();

    importedFonts.forEach((font) => {
      if (font.source === 'google') {
        const linkId = `imported-font-link-${font.id}`;
        activeLinkIds.add(linkId);
        let linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
        if (!linkEl) {
          linkEl = document.createElement('link');
          linkEl.id = linkId;
          linkEl.rel = 'stylesheet';
          document.head.appendChild(linkEl);
        }
        const googleUrl = font.url || `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.name).replace(/%20/g, '+')}:ital,wght@0,300..900;1,300..900&display=swap`;
        if (linkEl.href !== googleUrl) {
          linkEl.href = googleUrl;
        }
      } else if (font.source === 'url' && font.url) {
        if (font.url.includes('.css') || font.url.startsWith('https://fonts.googleapis.com')) {
          const linkId = `imported-font-link-${font.id}`;
          activeLinkIds.add(linkId);
          let linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
          if (!linkEl) {
            linkEl = document.createElement('link');
            linkEl.id = linkId;
            linkEl.rel = 'stylesheet';
            document.head.appendChild(linkEl);
          }
          if (linkEl.href !== font.url) {
            linkEl.href = font.url;
          }
        } else {
          // Direct font file URL
          const format = font.format || (font.url.endsWith('.woff2') ? 'woff2' : font.url.endsWith('.woff') ? 'woff' : font.url.endsWith('.otf') ? 'opentype' : 'truetype');
          cssRules.push(`
            @font-face {
              font-family: '${font.name}';
              src: url('${font.url}') format('${format}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
          `);
        }
      } else if (font.source === 'file' && font.dataUrl) {
        const format = font.format || 'woff2';
        cssRules.push(`
          @font-face {
            font-family: '${font.name}';
            src: url('${font.dataUrl}') format('${format}');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
        `);
      }
    });

    styleEl.textContent = cssRules.join('\n');

    // Clean up any removed font links
    document.querySelectorAll<HTMLLinkElement>('link[id^="imported-font-link-"]').forEach((el) => {
      if (!activeLinkIds.has(el.id)) {
        el.remove();
      }
    });
  }, [data.themeConfig?.importedFonts]);

  // Dynamically inject CSS variables from CMS themeConfig for typography, font families, scales, and colors
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const theme = data.themeConfig || defaultThemeConfig;

    // Header and Body font families
    if (theme.headerFont) {
      root.style.setProperty('--font-header-family', `'${theme.headerFont}', 'Playfair Display', Georgia, Cambria, 'Times New Roman', serif`);
    }
    if (theme.bodyFont) {
      root.style.setProperty('--font-body-family', `'${theme.bodyFont}', Georgia, Cambria, 'Times New Roman', serif`);
    }

    // Header and Body font scaling
    if (theme.headerScale) {
      root.style.setProperty('--header-scale', `${theme.headerScale}`);
    }
    if (theme.bodyScale) {
      root.style.setProperty('--body-scale', `${theme.bodyScale}`);
    }

    // Font styling details
    if (theme.headerFontWeight) {
      root.style.setProperty('--font-header-weight', theme.headerFontWeight);
    }
    if (theme.headerLetterSpacing) {
      root.style.setProperty('--font-header-tracking', theme.headerLetterSpacing);
    }
    if (theme.headerTransform) {
      root.style.setProperty('--font-header-transform', theme.headerTransform);
    }

    // Colors
    if (theme.primaryColor) {
      root.style.setProperty('--coral', theme.primaryColor);
      root.style.setProperty('--color-brand-coral', theme.primaryColor);
    }
    if (theme.accentColor) {
      root.style.setProperty('--accent', theme.accentColor);
      root.style.setProperty('--color-brand-accent', theme.accentColor);
    }
    if (theme.backgroundColor) {
      root.style.setProperty('--bg', theme.backgroundColor);
      root.style.setProperty('--color-brand-bg', theme.backgroundColor);
    }
    if (theme.cardBgColor) {
      root.style.setProperty('--card-bg', theme.cardBgColor);
    }
    if (theme.borderColor) {
      root.style.setProperty('--border', theme.borderColor);
      root.style.setProperty('--color-brand-border', theme.borderColor);
    }
    if (theme.textColor) {
      root.style.setProperty('--white', theme.textColor);
      root.style.setProperty('--color-brand-white', theme.textColor);
    }
    if (theme.textMutedColor) {
      root.style.setProperty('--text-muted', theme.textMutedColor);
      root.style.setProperty('--color-brand-muted', theme.textMutedColor);
    }
  }, [data.themeConfig]);

  const setThemeMode = (_mode: 'dark' | 'light') => {
    setThemeModeState('dark');
  };

  const toggleTheme = () => {
    setThemeModeState('dark');
  };

  // Debounced write to MongoDB. Skipped on the public site, and skipped until
  // the first load completes so the bundled defaults can never overwrite
  // published content.
  useEffect(() => {
    if (readOnly || !hydratedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void pushToServer(data);
    }, 1500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [data]);

  const updateSlides = (slides: SlideItem[]) => {
    setData((prev) => ({ ...prev, slides }));
  };

  const updateMovie = (movie: Movie) => {
    setData((prev) => ({ ...prev, movie }));
  };

  const updateOfficeInfo = (officeInfo: OfficeInfo) => {
    setData((prev) => ({ ...prev, officeInfo }));
  };

  const updateServices = (services: ServiceOption[]) => {
    setData((prev) => ({ ...prev, services }));
  };

  const updateTrustStats = (trustStats: StatItem[]) => {
    setData((prev) => ({ ...prev, trustStats }));
  };

  const updateFaqItems = (faqItems: FaqItem[]) => {
    setData((prev) => ({ ...prev, faqItems }));
  };

  const updateExecutive = (executive: ExecutiveProfile) => {
    setData((prev) => ({ ...prev, executive }));
  };

  const updateImpactPillars = (impactPillars: ImpactPillar[]) => {
    setData((prev) => ({ ...prev, impactPillars }));
  };

  const updateTeamMembers = (teamMembers: TeamMember[]) => {
    setData((prev) => ({ ...prev, teamMembers }));
  };

  const updateResearchSection = (researchSection: ResearchSectionData) => {
    setData((prev) => ({ ...prev, researchSection }));
  };

  const updateOperationalFronts = (operationalFronts: OperationalFront[]) => {
    setData((prev) => ({ ...prev, operationalFronts }));
  };

  const updateParallaxCards = (parallaxCards: ParallaxCardItem[]) => {
    setData((prev) => ({ ...prev, parallaxCards }));
  };

  const updateFocusAreas = (focusAreas: FocusAreaItem[]) => {
    setData((prev) => ({ ...prev, focusAreas }));
  };

  const updateProjects = (projects: ProjectItemData[]) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const updateServiceSolutions = (serviceSolutions: ServiceSolutionItem[]) => {
    setData((prev) => ({ ...prev, serviceSolutions }));
  };

  const updateTreeFramework = (treeFramework: TreeFrameworkData) => {
    setData((prev) => ({ ...prev, treeFramework }));
  };

  const updateTestimonialsSection = (testimonialsSection: TestimonialSectionData) => {
    setData((prev) => ({ ...prev, testimonialsSection }));
  };

  const updateTrustMatrix = (trustMatrix: TrustMatrixData) => {
    setData((prev) => ({ ...prev, trustMatrix }));
  };

  const updateThemeConfig = (themeConfig: SiteThemeConfig) => {
    setData((prev) => ({ ...prev, themeConfig }));
  };

  const updateStoryThemes = (storyThemes: StoryTheme[]) => {
    setData((prev) => ({ ...prev, storyThemes }));
  };

  const updateSystemsHero = (systemsHero: SystemsHeroSectionData) => {
    setData((prev) => ({ ...prev, systemsHero }));
  };

  const updateWhyIp3 = (whyIp3: WhyIp3Config) => {
    setData((prev) => ({ ...prev, whyIp3 }));
  };

  const updateEightSystems = (eightSystems: EightSystemsConfig) => {
    setData((prev) => ({ ...prev, eightSystems }));
  };

  const updateCorridorHero = (corridorHero: CorridorHeroConfig) => {
    setData((prev) => ({ ...prev, corridorHero }));
  };

  const updateNavigation = (navigation: PrimaryNavItem[]) => {
    const cleaned = sanitizeNav(navigation) || navigation;
    setData((prev) => ({ ...prev, navigation: cleaned }));
  };

  const updateNavbar = (navbar: NavbarConfig) => {
    setData((prev) => ({ ...prev, navbar }));
  };

  /** Restores the shipped defaults. The debounced save publishes them. */
  const resetAllContent = () => {
    setData(DEFAULT_WEBSITE_DATA);
  };

  const importJsonData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        setData({
          ...DEFAULT_WEBSITE_DATA,
          ...parsed,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const exportJsonData = (): string => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        themeMode,
        setThemeMode,
        toggleTheme,
        updateSlides,
        updateMovie,
        updateOfficeInfo,
        updateServices,
        updateTrustStats,
        updateFaqItems,
        updateExecutive,
        updateImpactPillars,
        updateTeamMembers,
        updateResearchSection,
        updateOperationalFronts,
        updateParallaxCards,
        updateFocusAreas,
        updateProjects,
        updateServiceSolutions,
        updateTreeFramework,
        updateTestimonialsSection,
        updateTrustMatrix,
        updateThemeConfig,
        updateStoryThemes,
        updateSystemsHero,
        updateWhyIp3,
        updateEightSystems,
        updateCorridorHero,
        updateNavigation,
        updateNavbar,
        resetAllContent,
        importJsonData,
        exportJsonData,
        readOnly,
        isLoaded,
        syncStatus,
        syncError,
        lastSyncedAt,
        contentVersion,
        reloadFromServer,
        saveToServer,
      }}
    >
      {children}
    </CMSContext.Provider>
  );

};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
