import React, { useState, useEffect } from 'react';
import { Users, Filter, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TeamCard } from './TeamCard';
import { useCMS } from '../context/CMSContext';

const DIVISIONS = [
  'All Divisions',
  'Advisory & Strategy',
  'Research & Analysis',
  'Public Health & Social',
  'Operations & Tech'
] as const;

// 5 columns x 2 rows = exactly 10 items per page
const ITEMS_PER_PAGE = 10;

export const TeamSection: React.FC = () => {
  const { data } = useCMS();
  const teamList = data.teamMembers || [];
  
  const [selectedDivision, setSelectedDivision] = useState<string>('All Divisions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter members based on selected division and search query
  const filteredMembers = teamList.filter((member) => {
    const matchesDivision = selectedDivision === 'All Divisions' || member.division === selectedDivision;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDivision && matchesSearch;
  });

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDivision, searchQuery]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const teamSection = document.getElementById('team');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="team" className="w-full py-16 sm:py-20 bg-[#050a12] text-slate-100 relative overflow-hidden border-t border-slate-800 font-sans">
      {/* Subtle Background Lighting Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ff7e67]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2dd4bf]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff7e67]/10 border border-[#ff7e67]/30 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Institutional Leadership & Specialists</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-serif">
            Expert Advisory & Practice <span className="text-[#ff7e67] italic">Faculty</span>
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Distinguished sovereign architects, computational researchers, and technical strategists shaping high-assurance public frameworks. Click any card to inspect full dossiers.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          
          {/* Division Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {DIVISIONS.map((division) => (
              <button
                key={division}
                onClick={() => setSelectedDivision(division)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-mono ${
                  selectedDivision === division
                    ? 'bg-[#ff7e67] text-slate-950 font-bold shadow-md shadow-[#ff7e67]/20 border border-[#ff7e67]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {division}
              </button>
            ))}
          </div>

          {/* Search Bar & Result Counter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name..."
                className="w-full bg-[#081220] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#ff7e67] transition-all shadow-xs font-mono"
              />
            </div>
            <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:inline">
              {filteredMembers.length} Profiles
            </span>
          </div>
        </div>

        {/* 5 Columns x 2 Rows Grid Container */}
        {currentMembers.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {currentMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>

            {/* Multi-Page Pagination Bar */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Showing <span className="text-slate-100 font-bold">{startIndex + 1}</span>–<span className="text-slate-100 font-bold">{Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length)}</span> of <span className="text-[#ff7e67] font-bold">{filteredMembers.length}</span> Faculty Members (Page {currentPage} of {totalPages})
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-100 disabled:hover:border-slate-700 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Number Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                        currentPage === pageNum
                          ? 'bg-[#ff7e67] text-slate-950 border border-[#ff7e67] shadow-md shadow-[#ff7e67]/20 scale-105'
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 hover:bg-[#ff7e67] hover:text-slate-950 hover:border-[#ff7e67] disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-100 disabled:hover:border-slate-700 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#081220] rounded-2xl border border-slate-800 p-8">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-100 mb-1">No Team Members Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your division filter or search terms.</p>
          </div>
        )}

      </div>
    </section>
  );
};
