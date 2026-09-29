import React, { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ContactInfoCard } from './ContactInfoCard';
import { ConsultationScheduler } from './ConsultationScheduler';
import { MapModal } from './MapModal';
import { FaqSection } from './FaqSection';

interface ContactSectionProps {
  initialTab?: 'message' | 'consultation';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialTab = 'message' }) => {
  const [activeTab, setActiveTab] = useState<'message' | 'consultation'>(initialTab);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <section id="contact-advisory" className="w-full font-sans bg-[#050a12] text-slate-100">
      {/* Top Dark Hero / Header with Blueprint Grid */}
      <div className="w-full bg-gradient-to-b from-[#050a12] via-[#081220] to-[#050a12] text-slate-100 pt-16 pb-16 px-4 sm:px-6 lg:px-10 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff7e67 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="w-full relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#38d9c0] uppercase">
              Ready to work with IP3?
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Tell us the mandate you need to deliver.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
            Whether you are preparing a new program, assessing an investment, designing a reform, commissioning an evaluation or assembling a consortium, IP3 can help define the analytical and implementation support required.
          </p>
        </div>
      </div>

      {/* Main Content Area: 2-Column Form & Sidebar */}
      <div className="bg-[#050a12] py-12 px-4 sm:px-6 lg:px-10 border-b border-slate-800">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Tabs */}
          <div className="lg:col-span-7 xl:col-span-8">
            {activeTab === 'message' ? (
              <ContactForm onSwitchToConsultation={() => setActiveTab('consultation')} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#081220] p-4 rounded-2xl border border-slate-800 shadow-sm mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Request a Consultation Session</h3>
                    <p className="text-xs text-slate-400">Select an available date and time with our senior advisory team.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('message')}
                    className="text-xs font-semibold text-[#ff7e67] hover:underline cursor-pointer font-mono"
                  >
                    Back to Proposal Form
                  </button>
                </div>
                <ConsultationScheduler onSuccessReturn={() => setActiveTab('message')} />
              </div>
            )}
          </div>

          {/* Right Column: Contact Info & Map */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ContactInfoCard
              onOpenMapModal={() => setIsMapModalOpen(true)}
              onBookConsultationClick={() => setActiveTab('consultation')}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FaqSection />
      </div>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />
    </section>
  );
};

export default ContactSection;
