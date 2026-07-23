import React, { useState } from 'react';
import { Idea, IdeaStatus } from '../types';

interface LibraryScreenProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onToggleBookmark: (ideaId: string) => void;
  onUpdateStatus: (ideaId: string, status: IdeaStatus) => void;
  onOpenExportModal: (idea: Idea) => void;
  onNavigateToGenerator: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  ideas,
  onSelectIdea,
  onToggleBookmark,
  onUpdateStatus,
  onOpenExportModal,
  onNavigateToGenerator,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [librarySearch, setLibrarySearch] = useState<string>('');

  const bookmarkedIdeas = ideas.filter((idea) => idea.isBookmarked);

  const filteredLibrary = bookmarkedIdeas.filter((idea) => {
    const matchesSearch =
      librarySearch === '' ||
      idea.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      idea.industry.toLowerCase().includes(librarySearch.toLowerCase()) ||
      idea.tagline.toLowerCase().includes(librarySearch.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'All' || idea.status.toLowerCase() === selectedStatusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: IdeaStatus) => {
    switch (status) {
      case 'Built':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Archived':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c3aed]/10 text-[#630ed4] text-xs font-bold border border-[#7c3aed]/20 mb-2">
            <span className="material-symbols-outlined text-sm">bookmarks</span>
            Personal Architecture Library
          </div>
          <h1 className="text-3xl font-black text-[#191c1e] font-headline tracking-tight">
            Saved Blueprints & Build Status
          </h1>
        </div>

        <button
          onClick={onNavigateToGenerator}
          className="action-gradient action-gradient-hover text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Generate New Blueprint
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {['All', 'In Progress', 'Built', 'Not Started', 'Archived'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatusFilter === status
                  ? 'bg-[#630ed4] text-white shadow-sm'
                  : 'text-[#4a4455] hover:bg-[#f2f4f6]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search saved projects..."
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] pl-8 pr-3 py-2 rounded-xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#7b7487] text-base">
            search
          </span>
        </div>
      </div>

      {/* Saved Blueprints List */}
      {filteredLibrary.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#e0e3e5] p-8 space-y-4">
          <span className="material-symbols-outlined text-6xl text-[#7b7487]">bookmark_border</span>
          <h3 className="text-xl font-bold text-[#191c1e] font-headline">No Saved Blueprints in Library</h3>
          <p className="text-xs text-[#7b7487] max-w-md mx-auto">
            Click the bookmark icon on any concept spark card or generated blueprint to save it to your personal workspace.
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="action-gradient text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            Create Your First Spark
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLibrary.map((idea) => (
            <div
              key={idea.id}
              className="glass-card rounded-2xl p-6 border border-white/80 hover:border-[#7c3aed]/40 transition-all shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f2f4f6] text-[#630ed4]">
                      {idea.industry}
                    </span>
                    <h3
                      onClick={() => onSelectIdea(idea)}
                      className="text-xl font-black text-[#191c1e] font-headline cursor-pointer hover:text-[#630ed4] transition-colors mt-1"
                    >
                      {idea.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(idea.id)}
                    className="text-[#630ed4] hover:text-red-500 p-1"
                    title="Remove from Library"
                  >
                    <span className="material-symbols-outlined text-xl">bookmark_remove</span>
                  </button>
                </div>

                <p className="text-xs font-semibold text-[#630ed4]">{idea.tagline}</p>
                <p className="text-xs text-[#4a4455] line-clamp-2 leading-relaxed">{idea.description}</p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-[#7b7487]">
                    <span>Build Progress</span>
                    <span>{idea.progressPercent || 0}%</span>
                  </div>
                  <div className="w-full bg-[#e0e3e5] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#630ed4] h-full transition-all duration-300"
                      style={{ width: `${idea.progressPercent || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Notes preview if available */}
                {idea.notes && (
                  <div className="p-3 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5] text-[11px] text-[#4a4455] line-clamp-2 italic">
                    "{idea.notes}"
                  </div>
                )}
              </div>

              {/* Footer status & Actions */}
              <div className="pt-4 border-t border-[#e0e3e5] flex items-center justify-between gap-3">
                <select
                  value={idea.status}
                  onChange={(e) => onUpdateStatus(idea.id, e.target.value as IdeaStatus)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${getStatusBadgeColor(
                    idea.status
                  )}`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Built">Built</option>
                  <option value="Archived">Archived</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenExportModal(idea)}
                    className="p-2 rounded-xl bg-[#f2f4f6] text-[#4a4455] hover:text-[#191c1e]"
                    title="Export Specs"
                  >
                    <span className="material-symbols-outlined text-lg">download</span>
                  </button>

                  <button
                    onClick={() => onSelectIdea(idea)}
                    className="action-gradient text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-1"
                  >
                    Blueprint
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
