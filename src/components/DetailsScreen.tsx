import React, { useState } from 'react';
import { Idea, IdeaStatus } from '../types';

interface DetailsScreenProps {
  idea: Idea;
  onBack: () => void;
  onToggleBookmark: (ideaId: string) => void;
  onUpdateStatus: (ideaId: string, status: IdeaStatus) => void;
  onUpdateNotes: (ideaId: string, notes: string) => void;
  onOpenExportModal: (idea: Idea) => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  idea,
  onBack,
  onToggleBookmark,
  onUpdateStatus,
  onUpdateNotes,
  onOpenExportModal,
}) => {
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState<1 | 2 | 3>(1);
  const [userNotes, setUserNotes] = useState<string>(idea.notes || '');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserNotes(e.target.value);
    onUpdateNotes(idea.id, e.target.value);
  };

  // Calculate roadmap progress
  const allTasks = [
    ...(idea.implementationRoadmap?.phase1?.tasks || []),
    ...(idea.implementationRoadmap?.phase2?.tasks || []),
    ...(idea.implementationRoadmap?.phase3?.tasks || []),
  ];

  const totalTaskCount = allTasks.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const calculatedProgress = totalTaskCount > 0 ? Math.round((completedCount / totalTaskCount) * 100) : idea.progressPercent || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
      {/* Top Back & Quick Actions Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white text-[#191c1e] text-xs font-bold border border-[#e0e3e5] hover:bg-[#f2f4f6] flex items-center gap-2 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Concept Sparks
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExportModal(idea)}
            className="px-4 py-2 rounded-xl bg-white text-[#191c1e] text-xs font-bold border border-[#e0e3e5] hover:bg-[#f2f4f6] flex items-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg text-[#630ed4]">download</span>
            Export Blueprint
          </button>

          <button
            onClick={() => onToggleBookmark(idea.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              idea.isBookmarked
                ? 'bg-[#630ed4] text-white shadow-md'
                : 'bg-white text-[#191c1e] border border-[#e0e3e5] hover:bg-[#f2f4f6]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {idea.isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            {idea.isBookmarked ? 'Saved in Library' : 'Save to Library'}
          </button>
        </div>
      </div>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-white/80 shadow-2xl">
        <div className="relative h-64 sm:h-80 overflow-hidden bg-[#191c1e]">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
              {idea.complexity} Complexity
            </span>

            {/* Status Select */}
            <select
              value={idea.status}
              onChange={(e) => onUpdateStatus(idea.id, e.target.value as IdeaStatus)}
              className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/30 focus:outline-none cursor-pointer"
            >
              <option value="Not Started" className="bg-[#191c1e]">Status: Not Started</option>
              <option value="In Progress" className="bg-[#191c1e]">Status: In Progress</option>
              <option value="Built" className="bg-[#191c1e]">Status: Built</option>
              <option value="Archived" className="bg-[#191c1e]">Status: Archived</option>
            </select>
          </div>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-[#630ed4] text-white">
                {idea.industry}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-white/20 text-white backdrop-blur-md border border-white/30">
                {idea.vibe}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-headline tracking-tight">
              {idea.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-semibold">{idea.tagline}</p>
          </div>
        </div>

        {/* Overview & Description */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7b7487] font-headline">
              Project Concept & Problem Statement
            </h3>
            <p className="text-sm text-[#191c1e] leading-relaxed font-normal">{idea.description}</p>
          </div>

          {/* AI Strategic Advice Callout */}
          {idea.generatedStrategy && (
            <div className="p-4 rounded-2xl bg-[#7c3aed]/5 border border-[#7c3aed]/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#630ed4] text-xl shrink-0 mt-0.5">
                lightbulb
              </span>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#630ed4]">AI Developer Strategy Tip:</span>
                <p className="text-[#4a4455] leading-relaxed">{idea.generatedStrategy}</p>
              </div>
            </div>
          )}

          {/* Tech Architecture Stack */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7b7487] font-headline">
              Recommended Tech Stack Architecture
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {idea.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-[#f2f4f6] border border-[#e0e3e5] flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#630ed4] font-bold text-xs shadow-sm">
                    <span className="material-symbols-outlined text-base">code</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#191c1e]">{tech.name}</div>
                    <div className="text-[10px] text-[#7b7487]">{tech.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Breakdown Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#191c1e] font-headline tracking-tight">
            Feature Breakdown & Functional Specs
          </h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f2f4f6] text-[#4a4455]">
            4 Core Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {idea.featureBreakdown.map((feat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/80 space-y-3 hover:border-[#7c3aed]/40 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl action-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {idx + 1}
                </div>
                <h3 className="text-base font-extrabold text-[#191c1e] font-headline">{feat.title}</h3>
              </div>
              <p className="text-xs text-[#4a4455] leading-relaxed pl-12">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Phase Implementation Roadmap Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e3e5] pb-6">
          <div>
            <h2 className="text-2xl font-black text-[#191c1e] font-headline tracking-tight">
              3-Phase Implementation Roadmap
            </h2>
            <p className="text-xs text-[#7b7487] mt-1">
              Follow step-by-step developer tasks to take this concept from zero to deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs font-bold text-[#630ed4] bg-[#630ed4]/10 px-3 py-1.5 rounded-xl border border-[#630ed4]/20">
              Progress: {calculatedProgress}% Completed
            </div>
          </div>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map((ph) => {
            const phaseData =
              ph === 1
                ? idea.implementationRoadmap?.phase1
                : ph === 2
                ? idea.implementationRoadmap?.phase2
                : idea.implementationRoadmap?.phase3;

            return (
              <button
                key={ph}
                onClick={() => setActiveRoadmapPhase(ph)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  activeRoadmapPhase === ph
                    ? 'bg-[#630ed4] text-white border-[#630ed4] shadow-lg shadow-[#630ed4]/20'
                    : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:bg-[#f2f4f6]'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-80">Phase 0{ph}</div>
                <div className="text-xs sm:text-sm font-extrabold font-headline line-clamp-1 mt-0.5">
                  {phaseData?.title || `Phase ${ph}`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Tasks List */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-[#191c1e] font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4]">task_alt</span>
            Action Items for Phase {activeRoadmapPhase}
          </h3>

          <div className="space-y-2.5">
            {((activeRoadmapPhase === 1
              ? idea.implementationRoadmap?.phase1?.tasks
              : activeRoadmapPhase === 2
              ? idea.implementationRoadmap?.phase2?.tasks
              : idea.implementationRoadmap?.phase3?.tasks) || []
            ).map((task, i) => {
              const taskKey = `phase${activeRoadmapPhase}-task${i}`;
              const isChecked = !!completedTasks[taskKey];

              return (
                <div
                  key={i}
                  onClick={() => toggleTask(taskKey)}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-white border-[#e0e3e5] hover:border-[#630ed4]/30'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg mt-0.5 ${isChecked ? 'text-emerald-600' : 'text-[#7b7487]'}`}>
                    {isChecked ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span className={`text-xs font-semibold leading-relaxed ${isChecked ? 'line-through opacity-75' : ''}`}>
                    {task}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Developer Notes & Persistence Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#191c1e] font-headline tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4]">edit_note</span>
            Developer Scratchpad & Custom Notes
          </h2>
          <span className="text-xs text-[#7b7487]">Autosaved to your library</span>
        </div>

        <textarea
          rows={4}
          placeholder="Add API endpoints, design preferences, or deployment logs here..."
          value={userNotes}
          onChange={handleNotesChange}
          className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] p-4 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all resize-none"
        />
      </div>
    </div>
  );
};
