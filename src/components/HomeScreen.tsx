import React, { useState } from 'react';
import { Idea } from '../types';

interface HomeScreenProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onToggleBookmark: (ideaId: string) => void;
  onNavigateToGenerator: () => void;
  searchQuery: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  ideas,
  onSelectIdea,
  onToggleBookmark,
  onNavigateToGenerator,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sparks');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'complexity'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'All Sparks',
    'CleanTech & ESG',
    'Cybersecurity',
    'Productivity & AI',
    'EdTech & HR',
    'FinTech',
    'DevTools',
  ];

  // Filter ideas
  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      searchQuery === '' ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      idea.techStack.some((ts) => ts.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All Sparks' || idea.industry.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesComplexity =
      selectedComplexity === 'All' || idea.complexity.toLowerCase() === selectedComplexity.toLowerCase();

    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Expert':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Moonshot':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-card border border-white/80 shadow-xl shadow-[#630ed4]/5">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full ambient-glow pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full ambient-glow pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c3aed]/10 text-[#630ed4] text-xs font-bold mb-5 border border-[#7c3aed]/20">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Ideation Engine & Tech Blueprint Synthesizer
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#191c1e] tracking-tight font-headline leading-tight mb-4">
            Turn Raw Sparks into <span className="text-transparent bg-clip-text action-gradient">Architectural Blueprints</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4a4455] font-normal leading-relaxed mb-8">
            Generate production-ready software project blueprints, feature breakdowns, and 3-phase technical roadmaps tailored to your preferred stack and complexity level.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToGenerator}
              className="action-gradient action-gradient-hover text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-[#630ed4]/30 flex items-center gap-2.5 transition-all active:scale-95 text-sm sm:text-base"
            >
              <span className="material-symbols-outlined text-xl">psychology</span>
              Synthesize New Idea
            </button>

            <a
              href="#explore-sparks"
              className="px-6 py-3.5 rounded-2xl bg-white text-[#191c1e] font-bold border border-[#e0e3e5] hover:bg-[#f2f4f6] flex items-center gap-2 transition-all text-sm sm:text-base shadow-sm"
            >
              <span className="material-symbols-outlined text-xl text-[#630ed4]">explore</span>
              Browse Ideas ({ideas.length})
            </a>
          </div>
        </div>

        {/* Hero Quick Metrics */}
        <div className="mt-10 pt-8 border-t border-[#e0e3e5]/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-black font-headline text-[#191c1e]">{ideas.length}</div>
            <div className="text-xs font-medium text-[#7b7487]">Curated Sparks</div>
          </div>
          <div>
            <div className="text-2xl font-black font-headline text-[#630ed4]">100%</div>
            <div className="text-xs font-medium text-[#7b7487]">Actionable Specs</div>
          </div>
          <div>
            <div className="text-2xl font-black font-headline text-[#191c1e]">3-Phase</div>
            <div className="text-xs font-medium text-[#7b7487]">Roadmap Blueprints</div>
          </div>
          <div>
            <div className="text-2xl font-black font-headline text-[#39b8fd]">Gemini 3.6</div>
            <div className="text-xs font-medium text-[#7b7487]">AI Synthesis Engine</div>
          </div>
        </div>
      </section>

      {/* Main Filter & Control Bar */}
      <div id="explore-sparks" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#191c1e] font-headline tracking-tight">
              Explore Concept Sparks
            </h2>
            <p className="text-xs text-[#7b7487] mt-1">
              Select a concept card to view its feature breakdown, tech stack, and step-by-step roadmap.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#f2f4f6] p-1 rounded-xl border border-[#e0e3e5]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#630ed4] shadow-sm' : 'text-[#7b7487] hover:text-[#191c1e]'
                }`}
                title="Grid View"
              >
                <span className="material-symbols-outlined text-xl">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#630ed4] shadow-sm' : 'text-[#7b7487] hover:text-[#191c1e]'
                }`}
                title="List View"
              >
                <span className="material-symbols-outlined text-xl">view_list</span>
              </button>
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'complexity')}
              className="bg-white text-xs font-semibold text-[#191c1e] px-3.5 py-2.5 rounded-xl border border-[#e0e3e5] focus:outline-none focus:border-[#7c3aed]"
            >
              <option value="recent">Sort by Most Recent</option>
              <option value="complexity">Sort by Complexity</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#630ed4] text-white border-[#630ed4] shadow-sm'
                  : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:border-[#630ed4]/30 hover:bg-[#f2f4f6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Complexity Filter & Quick Status */}
        <div className="flex items-center justify-between text-xs text-[#7b7487] bg-white/70 p-3 rounded-2xl border border-[#e0e3e5]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#191c1e]">Complexity:</span>
            {['All', 'Beginner', 'Intermediate', 'Expert', 'Moonshot'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedComplexity(lvl)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedComplexity === lvl
                    ? 'bg-[#7c3aed]/10 text-[#630ed4] font-bold'
                    : 'hover:text-[#191c1e]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div>
            Showing <strong className="text-[#191c1e]">{filteredIdeas.length}</strong> of {ideas.length} ideas
          </div>
        </div>
      </div>

      {/* Ideas Grid / List */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#e0e3e5] p-8">
          <span className="material-symbols-outlined text-5xl text-[#7b7487] mb-3">search_off</span>
          <h3 className="text-lg font-bold text-[#191c1e] font-headline mb-1">No Concept Sparks Found</h3>
          <p className="text-xs text-[#7b7487] mb-6 max-w-md mx-auto">
            Try resetting your filters or use the AI Generator to create a brand new idea tailored to your specifications.
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="action-gradient text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            Synthesize Custom Idea
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="group glass-card rounded-2xl overflow-hidden border border-white/80 hover:border-[#7c3aed]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#630ed4]/10 flex flex-col justify-between"
            >
              <div>
                {/* Image Header with Badge Overlay */}
                <div className="relative h-48 overflow-hidden bg-[#191c1e]">
                  <img
                    src={idea.imageUrl}
                    alt={idea.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${getComplexityBadge(
                        idea.complexity
                      )}`}
                    >
                      {idea.complexity}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(idea.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        idea.isBookmarked
                          ? 'bg-[#630ed4] text-white shadow-md'
                          : 'bg-white/80 backdrop-blur-md text-[#191c1e] hover:bg-white'
                      }`}
                      title={idea.isBookmarked ? 'Saved in Library' : 'Save to Library'}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {idea.isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/30">
                      {idea.industry}
                    </span>
                    <h3 className="text-xl font-black text-white font-headline tracking-tight mt-1 group-hover:text-[#71f8e4] transition-colors">
                      {idea.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <p className="text-xs font-semibold text-[#630ed4] line-clamp-1">{idea.tagline}</p>
                  <p className="text-xs text-[#4a4455] line-clamp-2 leading-relaxed">{idea.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {idea.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f2f4f6] text-[#191c1e] border border-[#e0e3e5]"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {idea.techStack.length > 4 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-[#f2f4f6] text-[#7b7487]">
                        +{idea.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-[#e0e3e5]/40">
                <span className="text-[11px] text-[#7b7487] font-medium">{idea.createdAt}</span>

                <button
                  onClick={() => onSelectIdea(idea)}
                  className="px-4 py-2 rounded-xl bg-[#630ed4]/10 hover:bg-[#630ed4] text-[#630ed4] hover:text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
                >
                  Blueprint
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="glass-card rounded-2xl p-5 border border-white/80 hover:border-[#7c3aed]/40 transition-all duration-200 hover:shadow-lg hover:shadow-[#630ed4]/5 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getComplexityBadge(
                        idea.complexity
                      )}`}
                    >
                      {idea.complexity}
                    </span>
                    <span className="text-[11px] font-bold text-[#7b7487]">{idea.industry}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#191c1e] font-headline group-hover:text-[#630ed4] transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#4a4455] line-clamp-1">{idea.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <div className="hidden lg:flex items-center gap-1">
                  {idea.techStack.slice(0, 3).map((ts, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#f2f4f6] text-[#191c1e]">
                      {ts.name}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(idea.id);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    idea.isBookmarked ? 'bg-[#630ed4] text-white' : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#e6e8ea]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {idea.isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>

                <button className="px-4 py-2 rounded-xl action-gradient text-white text-xs font-bold shadow-sm flex items-center gap-1">
                  View Blueprint
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
