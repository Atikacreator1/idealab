import React, { useState, useEffect } from 'react';
import { Idea, IdeaStatus, UserProfile } from './types';
import { INITIAL_IDEAS } from './data/mockIdeas';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { GeneratorScreen } from './components/GeneratorScreen';
import { DetailsScreen } from './components/DetailsScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { AuthScreen } from './components/AuthScreen';
import { ExportModal } from './components/ExportModal';

export const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem('idealab_ideas_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return INITIAL_IDEAS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('idealab_user_v1');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Error reading user session:', e);
    }
    return null;
  });

  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<'home' | 'generator' | 'details' | 'library' | 'auth'>('home');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(ideas[0] || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exportModalIdea, setExportModalIdea] = useState<Idea | null>(null);

  // Sync ideas to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('idealab_ideas_v1', JSON.stringify(ideas));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [ideas]);

  // Sync user profile to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('idealab_user_v1', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('idealab_user_v1');
      }
    } catch (e) {
      console.error('Error saving user profile to localStorage:', e);
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('idealab_user_v1');
    setActiveTab('home');
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthInitialMode(mode);
    setActiveTab('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return { ...idea, isBookmarked: !idea.isBookmarked };
        }
        return idea;
      })
    );
    if (selectedIdea && selectedIdea.id === ideaId) {
      setSelectedIdea((prev) => (prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null));
    }
  };

  const handleUpdateStatus = (ideaId: string, status: IdeaStatus) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return { ...idea, status };
        }
        return idea;
      })
    );
    if (selectedIdea && selectedIdea.id === ideaId) {
      setSelectedIdea((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleUpdateNotes = (ideaId: string, notes: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return { ...idea, notes };
        }
        return idea;
      })
    );
    if (selectedIdea && selectedIdea.id === ideaId) {
      setSelectedIdea((prev) => (prev ? { ...prev, notes } : null));
    }
  };

  const handleIdeaGenerated = (newIdea: Idea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    setSelectedIdea(newIdea);
  };

  const handleSelectIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedCount = ideas.filter((i) => i.isBookmarked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#7c3aed]/20">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIdea={selectedIdea}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 mb-12">
        {activeTab === 'home' && (
          <HomeScreen
            ideas={ideas}
            onSelectIdea={handleSelectIdea}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToGenerator={() => setActiveTab('generator')}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'generator' && (
          <GeneratorScreen
            onIdeaGenerated={handleIdeaGenerated}
            onViewDetails={(idea) => {
              setSelectedIdea(idea);
              setActiveTab('details');
            }}
          />
        )}

        {activeTab === 'details' && selectedIdea && (
          <DetailsScreen
            idea={selectedIdea}
            onBack={() => setActiveTab('home')}
            onToggleBookmark={handleToggleBookmark}
            onUpdateStatus={handleUpdateStatus}
            onUpdateNotes={handleUpdateNotes}
            onOpenExportModal={(ideaToExport) => setExportModalIdea(ideaToExport)}
          />
        )}

        {activeTab === 'library' && (
          <LibraryScreen
            ideas={ideas}
            onSelectIdea={handleSelectIdea}
            onToggleBookmark={handleToggleBookmark}
            onUpdateStatus={handleUpdateStatus}
            onOpenExportModal={(ideaToExport) => setExportModalIdea(ideaToExport)}
            onNavigateToGenerator={() => setActiveTab('generator')}
          />
        )}

        {activeTab === 'auth' && (
          <AuthScreen
            initialMode={authInitialMode}
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={(tab) => setActiveTab(tab as any)} />

      {/* Export Blueprint Modal */}
      {exportModalIdea && (
        <ExportModal
          idea={exportModalIdea}
          onClose={() => setExportModalIdea(null)}
        />
      )}
    </div>
  );
};

export default App;
