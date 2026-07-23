import React from 'react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'generator' | 'details' | 'library') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-[#e0e3e5] bg-white/60 backdrop-blur-md pt-12 pb-8 text-[#4a4455]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#e0e3e5]/60">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg action-gradient flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <span className="font-extrabold text-lg text-[#191c1e] font-headline">IdeaLab</span>
            </div>
            <p className="text-xs text-[#7b7487] leading-relaxed mb-4">
              AI-powered ideation engine and tech architecture generator. Transform wild concepts into actionable developer blueprints.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#630ed4] font-medium">
              <span className="px-2.5 py-1 rounded-full bg-[#630ed4]/10 border border-[#630ed4]/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Gemini 3.6 Flash Active
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] mb-3 font-headline">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#630ed4] transition-colors">
                  Explore Sparks Library
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('generator')} className="hover:text-[#630ed4] transition-colors">
                  AI Parameter Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('library')} className="hover:text-[#630ed4] transition-colors">
                  Saved Blueprints & Roadmaps
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] mb-3 font-headline">Popular Domains</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#191c1e] cursor-pointer">FinTech & Wealth Automation</li>
              <li className="hover:text-[#191c1e] cursor-pointer">CleanTech & ESG Carbon Telemetry</li>
              <li className="hover:text-[#191c1e] cursor-pointer">DevTools & Infinite Visual Canvases</li>
              <li className="hover:text-[#191c1e] cursor-pointer">Cybersecurity & Zero-Knowledge Cryptography</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] mb-3 font-headline">Built With</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-1 rounded-md bg-[#f2f4f6] text-[#191c1e] font-medium border border-[#e0e3e5]">React 19</span>
              <span className="px-2 py-1 rounded-md bg-[#f2f4f6] text-[#191c1e] font-medium border border-[#e0e3e5]">Tailwind CSS 4</span>
              <span className="px-2 py-1 rounded-md bg-[#f2f4f6] text-[#191c1e] font-medium border border-[#e0e3e5]">Gemini AI SDK</span>
              <span className="px-2 py-1 rounded-md bg-[#f2f4f6] text-[#191c1e] font-medium border border-[#e0e3e5]">Node.js Express</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7b7487] gap-3">
          <p>© {new Date().getFullYear()} IdeaLab. Built with Google AI Studio & Gemini.</p>
          <p className="flex items-center gap-1">
            Made for creators, founders & developers
          </p>
        </div>
      </div>
    </footer>
  );
};
