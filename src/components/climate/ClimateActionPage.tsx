import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Leaf, Shield, Globe2, Sparkles, BookOpen, Layers, Compass } from 'lucide-react';
import ClimateHeroSection from './ClimateHeroSection';
import AdaptationAndCarouselSection from './AdaptationAndCarouselSection';
import AdvisorBanner from './AdvisorBanner';
import PolicyFocusSection from './PolicyFocusSection';
import ExpertiseSection from './ExpertiseSection';
import MagazineGridSection from './MagazineGridSection';
import StrategicPartnerSection from './StrategicPartnerSection';
import PillarsSixCardsSection from './PillarsSixCardsSection';
import ESGStrategySection from './ESGStrategySection';
import ESGExcellenceSection from './ESGExcellenceSection';
import ESGJourneyRoadmapSection from './ESGJourneyRoadmapSection';
import ClimateTeamSection from './ClimateTeamSection';
import ClimateApproachSection from './ClimateApproachSection';
import CircularEconomistSection from './CircularEconomistSection';
import CircularEliminateWasteSection from './CircularEliminateWasteSection';
import TestimonialAndHighlightsSection from './TestimonialAndHighlightsSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import FourValuesSection from './FourValuesSection';
import ArticleModal from './ArticleModal';
import ClimateVideoModal from './ClimateVideoModal';
import { MagazineArticle, ExpertiseItem } from '../../data/climateData';

interface ClimateActionPageProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
  onNavigateApproach?: () => void;
  onNavigateFocus?: (focusId?: string) => void;
  onOpenTalk?: () => void;
  onOpenCollaborate?: (area?: string) => void;
}

export default function ClimateActionPage({
  onNavigateHome,
  onNavigateContact,
  onNavigateAbout,
  onNavigateApproach,
  onNavigateFocus,
  onOpenTalk,
  onOpenCollaborate,
}: ClimateActionPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    if (onOpenCollaborate) {
      onOpenCollaborate('Climate Action & Sustainability Solutions');
    } else if (onNavigateContact) {
      onNavigateContact();
    }
  };

  const handleSelectExpertise = (item: ExpertiseItem) => {
    if (onOpenCollaborate) {
      onOpenCollaborate(item.title);
    } else if (onNavigateContact) {
      onNavigateContact();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0E1A22] text-[#F3F0E8] font-sans selection:bg-[#EF715A] selection:text-white">
      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <ClimateHeroSection
          onScrollToSolutions={() => scrollToSection('policy-focus')}
          onOpenContact={handleOpenContact}
        />

        {/* 2. Adaptation Card, Carousel, & IP3 Insights Multimedia Video */}
        <AdaptationAndCarouselSection
          onOpenVideo={(vid) => setActiveVideoId(vid)}
          onOpenContact={handleOpenContact}
        />

        {/* 3. Trusted Advisor to Governments & Corporates Banner */}
        <AdvisorBanner
          onOpenContact={handleOpenContact}
          onScrollToExpertise={() => scrollToSection('expertise')}
        />

        {/* 4. Our Policy Focus (4 Columns) */}
        <PolicyFocusSection
          onScrollToExpertise={() => scrollToSection('expertise')}
        />

        {/* 5. Detailed Expertise Frameworks (5 Pillars with Stars) */}
        <ExpertiseSection
          onSelectExpertise={handleSelectExpertise}
        />

        {/* 6. Magazine & Field Research Publications Grid */}
        <MagazineGridSection
          onSelectArticle={(art) => setSelectedArticle(art)}
        />

        {/* 7. Strategic Partner for Sustainable Prosperity & Video */}
        <StrategicPartnerSection
          onOpenContact={handleOpenContact}
          onOpenVideo={(vid) => setActiveVideoId(vid)}
        />

        {/* 8. 6 Core Systems Transformation Cards (Market, Resources, Governance) */}
        <PillarsSixCardsSection
          onSelectPillar={handleOpenContact}
        />

        {/* 9. ESG & Circular Strategy Highlights (3 Photo Banners) */}
        <ESGStrategySection
          onOpenContact={handleOpenContact}
        />

        {/* 10. Leading with Purpose: ESG Excellence & Specialized Sectors */}
        <ESGExcellenceSection
          onOpenContact={handleOpenContact}
        />

        {/* 10b. For Companies Starting Their ESG Journey Mindmap Roadmap */}
        <ESGJourneyRoadmapSection
          onOpenContact={handleOpenContact}
        />

        {/* 11. Our ESG Team */}
        <ClimateTeamSection
          onContactMember={handleOpenContact}
        />

        {/* 12. IP3 Approach & Report */}
        <ClimateApproachSection
          onOpenContact={handleOpenContact}
          onOpenVideo={(vid) => setActiveVideoId(vid)}
        />

        {/* 13. The Circular Economist Magazine & Bangladesh Focus */}
        <CircularEconomistSection
          onOpenContact={handleOpenContact}
        />

        {/* 13b. Eliminate Waste and Turn Waste into Resources Poster Section */}
        <CircularEliminateWasteSection
          onOpenContact={handleOpenContact}
        />

        {/* 14. RMG Testimonial & $12B Value Unlock Highlights */}
        <TestimonialAndHighlightsSection
          onOpenContact={handleOpenContact}
        />

        {/* 15. Why Choose IP3 Consulting */}
        <WhyChooseUsSection
          onOpenContact={handleOpenContact}
        />

        {/* 16. Four Core Value Propositions */}
        <FourValuesSection />
      </main>

      {/* Interactive Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenContact={handleOpenContact}
      />

      <ClimateVideoModal
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
