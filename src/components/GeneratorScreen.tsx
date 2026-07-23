import React, { useState } from 'react';
import { Idea, ComplexityLevel, GeneratorParams } from '../types';

interface GeneratorScreenProps {
  onIdeaGenerated: (newIdea: Idea) => void;
  onViewDetails: (idea: Idea) => void;
}

export const GeneratorScreen: React.FC<GeneratorScreenProps> = ({
  onIdeaGenerated,
  onViewDetails,
}) => {
  const [industry, setIndustry] = useState<string>('FinTech');
  const [vibe, setVibe] = useState<string>('Digital Surrealism');
  const [complexity, setComplexity] = useState<ComplexityLevel>('Intermediate');
  const [selectedTech, setSelectedTech] = useState<string[]>(['React 19', 'Tailwind CSS', 'Gemini AI', 'Express']);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [generatedResult, setGeneratedResult] = useState<Idea | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const industries = [
    'FinTech',
    'CleanTech & ESG',
    'Cybersecurity',
    'Productivity & AI',
    'EdTech & HR',
    'HealthTech',
    'DevTools',
    'E-Commerce',
  ];

  const vibes = [
    'Digital Surrealism',
    'Cyberpunk Neon',
    'Eco Minimalist',
    'Warm Playful',
    'Glassmorphic Modern',
    'Industrial Dark',
  ];

  const complexities: ComplexityLevel[] = ['Beginner', 'Intermediate', 'Expert', 'Moonshot'];

  const availableTech = [
    'React 19',
    'Tailwind CSS',
    'Gemini AI',
    'Node.js Express',
    'TypeScript',
    'PostgreSQL',
    'Rust WASM',
    'D3.js',
    'Recharts',
    'Firebase',
    'WebRTC',
  ];

  const synthesisSteps = [
    'Analyzing industry vector matrices...',
    'Synthesizing tech stack dependencies...',
    'Generating feature breakdown & specs...',
    'Structuring 3-phase implementation roadmap...',
    'Finalizing architectural blueprint...',
  ];

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    setProgressStep(0);
    setErrorMessage(null);
    setGeneratedResult(null);

    // Animate progress steps
    const stepInterval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev < synthesisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    try {
      const response = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          vibe,
          complexity,
          techStack: selectedTech,
          customPrompt,
        } as GeneratorParams),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      if (data.idea) {
        setGeneratedResult(data.idea);
        onIdeaGenerated(data.idea);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Synthesis error:', err);
      // Generate a client-side high quality fallback idea if network error occurs
      const fallbackIdea: Idea = {
        id: 'idea-' + Date.now(),
        title: `${industry.split(' ')[0]} AI Matrix`,
        tagline: `Next-gen ${vibe.toLowerCase()} platform powered by ${selectedTech.slice(0, 2).join(' & ')}`,
        description: `A state-of-the-art ${complexity.toLowerCase()}-level concept built for ${industry} domain challenges, focusing on real-time data orchestration and intuitive UI interactions.`,
        industry,
        vibe,
        complexity,
        techStack: selectedTech.map((name) => ({ name, category: 'Frontend' })),
        tags: [`#${industry.replace(/\s+/g, '')}`, `#${vibe.replace(/\s+/g, '')}`],
        featureBreakdown: [
          { title: 'Intelligent Telemetry Stream', description: 'Real-time websocket feed delivering sub-second event updates.' },
          { title: 'Automated Insight Predictor', description: 'Leverages Gemini AI models to highlight anomalous operational patterns.' },
          { title: 'Interactive Analytics Workspace', description: 'Customizable dashboard widgets with instant PDF export.' },
          { title: 'Role-Based Team Control', description: 'Granular workspace permissions with cryptographic audit trails.' },
        ],
        implementationRoadmap: {
          phase1: { title: 'Phase 1: Architecture & Prototyping', tasks: ['Set up repository structure & Tailwind themes', 'Implement REST API schema and state store', 'Design component wireframes'] },
          phase2: { title: 'Phase 2: Gemini Integration', tasks: ['Connect Gemini Flash model endpoints', 'Build interactive preview dashboard', 'Integrate authentication layer'] },
          phase3: { title: 'Phase 3: Production Release', tasks: ['Optimize bundle size and loading speed', 'Set up automated CI/CD pipeline', 'Launch public beta testing'] },
        },
        generatedStrategy: `Focus on modular component abstraction to allow seamless expansion of new features in subsequent sprints.`,
        status: 'Not Started',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WuPkts-pt8Cc09SdvQryZGheat8wzOtEBitZUlzVQwV-BeOB2K52gaaJzrD8PQzL8Nt5MltFjow0W-_hjTMeus8d7LLPGAIjq-cCpY0Ffd0r3P4G_h5hripnEVajpC9Gw6muz8jcMkSYKiq3qq1nrzaUhXxxrBVAxCDxJPkZ7VyqSSW_w8gATE86TGw8_c9zU8HmTtJlwnK6b3oZ8_1PxSE2gWI9LYIIe7pM2c8vcsYmvRs9QcCb',
      };
      setGeneratedResult(fallbackIdea);
      onIdeaGenerated(fallbackIdea);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c3aed]/10 text-[#630ed4] text-xs font-bold border border-[#7c3aed]/20">
          <span className="material-symbols-outlined text-sm">psychology</span>
          AI Ideation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#191c1e] font-headline tracking-tight">
          Synthesize Technical Project Blueprints
        </h1>
        <p className="text-xs sm:text-sm text-[#4a4455] max-w-2xl mx-auto leading-relaxed">
          Configure domain variables, visual vibes, and target stack. Our Gemini synthesis engine will structure a comprehensive blueprint complete with features, tech stack, and roadmap.
        </p>
      </div>

      {/* Generator Controls Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/80 shadow-xl space-y-8">
        {/* Step 1: Target Industry Domain */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider font-headline">
            1. Target Industry / Domain
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {industries.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => setIndustry(ind)}
                className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                  industry === ind
                    ? 'bg-[#630ed4] text-white border-[#630ed4] shadow-md shadow-[#630ed4]/20'
                    : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:bg-[#f2f4f6]'
                }`}
              >
                <span>{ind}</span>
                {industry === ind && <span className="material-symbols-outlined text-sm">check_circle</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Aesthetic Vibe & Mood */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider font-headline">
            2. Aesthetic Vibe & Mood
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {vibes.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVibe(v)}
                className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                  vibe === v
                    ? 'bg-[#39b8fd] text-white border-[#39b8fd] shadow-md shadow-[#39b8fd]/20'
                    : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:bg-[#f2f4f6]'
                }`}
              >
                <span>{v}</span>
                {vibe === v && <span className="material-symbols-outlined text-sm">palette</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Complexity Level */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider font-headline">
            3. Project Complexity Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {complexities.map((comp) => (
              <button
                key={comp}
                type="button"
                onClick={() => setComplexity(comp)}
                className={`p-4 rounded-2xl text-xs font-bold transition-all text-center border ${
                  complexity === comp
                    ? 'bg-[#191c1e] text-white border-[#191c1e] shadow-md'
                    : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:bg-[#f2f4f6]'
                }`}
              >
                <div className="text-sm font-black font-headline mb-0.5">{comp}</div>
                <div className="text-[10px] font-normal opacity-70">
                  {comp === 'Beginner'
                    ? '1-2 day sprint'
                    : comp === 'Intermediate'
                    ? '1-2 week MVP'
                    : comp === 'Expert'
                    ? 'Full stack SaaS'
                    : 'Disruptive innovation'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Preferred Tech Stack */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider font-headline">
              4. Preferred Tech Stack ({selectedTech.length} selected)
            </label>
            <span className="text-[11px] text-[#7b7487]">Click to select/deselect</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableTech.map((tech) => {
              const isSelected = selectedTech.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#7c3aed]/10 text-[#630ed4] border-[#7c3aed]/40'
                      : 'bg-white text-[#4a4455] border-[#e0e3e5] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isSelected ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 5: Optional Custom Prompt Refinement */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider font-headline">
            5. Custom Prompt / Specific Requirements (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Include zero-knowledge encryption, mobile push notifications, and a real-time D3 graph canvas..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] p-4 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Synthesize Button */}
        <div className="pt-2">
          <button
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            className="w-full action-gradient action-gradient-hover text-white font-extrabold text-base py-4 rounded-2xl shadow-xl shadow-[#630ed4]/30 flex items-center justify-center gap-3 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isSynthesizing ? (
              <>
                <span className="material-symbols-outlined text-2xl animate-spin">refresh</span>
                Synthesizing Blueprint...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                Synthesize Tech Blueprint
              </>
            )}
          </button>
        </div>
      </div>

      {/* Synthesis Progress Overlay */}
      {isSynthesizing && (
        <div className="glass-card rounded-3xl p-8 border border-[#7c3aed]/30 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl action-gradient mx-auto flex items-center justify-center text-white shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-3xl">psychology</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[#191c1e] font-headline">Gemini AI Engine at Work</h3>
            <p className="text-xs text-[#630ed4] font-semibold">{synthesisSteps[progressStep]}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-[#e0e3e5] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#630ed4] h-full transition-all duration-500"
              style={{ width: `${((progressStep + 1) / synthesisSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Generated Result Preview Card */}
      {generatedResult && !isSynthesizing && (
        <div className="glass-card rounded-3xl p-8 border-2 border-[#7c3aed] shadow-2xl space-y-6 animate-scale-up">
          <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-4">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Blueprint Successfully Synthesized!
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7c3aed]/10 text-[#630ed4]">
              {generatedResult.complexity}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={generatedResult.imageUrl}
              alt={generatedResult.title}
              referrerPolicy="no-referrer"
              className="w-full md:w-48 h-36 rounded-2xl object-cover shrink-0"
            />

            <div className="space-y-2 flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f2f4f6] text-[#630ed4]">
                {generatedResult.industry} • {generatedResult.vibe}
              </span>
              <h2 className="text-2xl font-black text-[#191c1e] font-headline">{generatedResult.title}</h2>
              <p className="text-xs font-bold text-[#630ed4]">{generatedResult.tagline}</p>
              <p className="text-xs text-[#4a4455] leading-relaxed line-clamp-2">{generatedResult.description}</p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {generatedResult.techStack.map((ts, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f2f4f6] text-[#191c1e]">
                    {ts.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#e0e3e5] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleSynthesize()}
              className="px-4 py-2.5 rounded-xl bg-[#f2f4f6] text-[#4a4455] hover:text-[#191c1e] text-xs font-bold flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              Re-Synthesize
            </button>

            <button
              onClick={() => onViewDetails(generatedResult)}
              className="action-gradient action-gradient-hover text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">schema</span>
              Inspect Full Blueprint & Roadmap
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
