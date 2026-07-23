import React, { useState } from 'react';
import { Idea, UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'generator' | 'details' | 'library' | 'auth';
  setActiveTab: (tab: 'home' | 'generator' | 'details' | 'library' | 'auth') => void;
  savedCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIdea: Idea | null;
  currentUser: UserProfile | null;
  onSignOut: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  searchQuery,
  setSearchQuery,
  selectedIdea,
  currentUser,
  onSignOut,
  onOpenAuth,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="glass-card rounded-2xl px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-lg shadow-[#630ed4]/5 border border-white/60">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl action-gradient flex items-center justify-center text-white shadow-md shadow-[#630ed4]/30 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#191c1e] font-headline">IdeaLab</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#630ed4] border border-[#7c3aed]/20">AI</span>
            </div>
            <p className="text-[11px] text-[#4a4455] font-medium hidden sm:block">Turn Sparks into Structures</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f2f4f6]/80 p-1.5 rounded-xl border border-[#e0e3e5]">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'home'
                ? 'bg-white text-[#630ed4] shadow-sm font-bold'
                : 'text-[#4a4455] hover:text-[#191c1e] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
            Explore Ideas
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'bg-white text-[#630ed4] shadow-sm font-bold'
                : 'text-[#4a4455] hover:text-[#191c1e] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-lg">psychology</span>
            Idea Generator
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 relative ${
              activeTab === 'library'
                ? 'bg-white text-[#630ed4] shadow-sm font-bold'
                : 'text-[#4a4455] hover:text-[#191c1e] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-lg">bookmarks</span>
            Library
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#630ed4] text-white">
                {savedCount}
              </span>
            )}
          </button>

          {selectedIdea && (
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'details'
                  ? 'bg-white text-[#630ed4] shadow-sm font-bold'
                  : 'text-[#4a4455] hover:text-[#191c1e] hover:bg-white/50'
              }`}
            >
              <span className="material-symbols-outlined text-lg">schema</span>
              Blueprint
            </button>
          )}
        </nav>

        {/* Quick Search, Spark Button & User Auth */}
        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block w-44">
            <input
              type="text"
              placeholder="Search sparks, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f2f4f6] text-sm text-[#191c1e] placeholder-[#7b7487] pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#7b7487] text-lg pointer-events-none">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-[#7b7487] hover:text-[#191c1e]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setActiveTab('generator')}
            className="action-gradient action-gradient-hover text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl shadow-md shadow-[#630ed4]/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span className="hidden sm:inline">Spark</span>
          </button>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#f2f4f6] transition-all border border-transparent hover:border-[#e0e3e5]"
              >
                <img
                  src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#630ed4]/20 object-cover"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-[#191c1e] leading-tight max-w-[100px] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-[#7b7487] leading-none">{currentUser.role || 'Member'}</div>
                </div>
                <span className="material-symbols-outlined text-lg text-[#7b7487]">expand_more</span>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e0e3e5] p-2 z-50 animate-fade-in space-y-1">
                    <div className="p-3 bg-[#f8f9fa] rounded-xl mb-1">
                      <div className="text-xs font-bold text-[#191c1e]">{currentUser.name}</div>
                      <div className="text-[11px] text-[#7b7487] truncate">{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('library');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#4a4455] hover:text-[#630ed4] hover:bg-[#7c3aed]/5 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">bookmarks</span>
                      Saved Blueprints ({savedCount})
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('generator');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#4a4455] hover:text-[#630ed4] hover:bg-[#7c3aed]/5 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">psychology</span>
                      Generate New Idea
                    </button>

                    <div className="border-t border-[#e0e3e5] my-1"></div>

                    <button
                      onClick={() => {
                        onSignOut();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-bold px-3 py-2 rounded-xl text-[#4a4455] hover:text-[#630ed4] hover:bg-[#f2f4f6] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-xs font-extrabold px-3.5 py-2 rounded-xl bg-[#630ed4] hover:bg-[#520ab5] text-white shadow-sm transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center justify-around bg-white/90 backdrop-blur-lg mt-2 p-1.5 rounded-xl border border-[#e0e3e5] shadow-sm">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[11px] font-semibold ${
            activeTab === 'home' ? 'text-[#630ed4]' : 'text-[#4a4455]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">grid_view</span>
          Explore
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[11px] font-semibold ${
            activeTab === 'generator' ? 'text-[#630ed4]' : 'text-[#4a4455]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">psychology</span>
          Generator
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[11px] font-semibold ${
            activeTab === 'library' ? 'text-[#630ed4]' : 'text-[#4a4455]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">bookmarks</span>
          Library ({savedCount})
        </button>
        {currentUser ? (
          <button
            onClick={() => onSignOut()}
            className="flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[11px] font-semibold text-rose-600"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => onOpenAuth('login')}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[11px] font-semibold ${
              activeTab === 'auth' ? 'text-[#630ed4]' : 'text-[#4a4455]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">login</span>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

