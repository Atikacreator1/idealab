export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  joinedAt?: string;
}

export type ComplexityLevel = 'Beginner' | 'Intermediate' | 'Expert' | 'Moonshot';

export type IdeaStatus = 'Not Started' | 'In Progress' | 'Built' | 'Archived';

export interface TechStackItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Styling' | 'AI/ML' | 'Database' | 'DevOps';
  icon?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface RoadmapPhase {
  title: string;
  tasks: string[];
}

export interface ImplementationRoadmap {
  phase1: RoadmapPhase;
  phase2: RoadmapPhase;
  phase3: RoadmapPhase;
}

export interface Idea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  industry: string;
  vibe: string;
  complexity: ComplexityLevel;
  techStack: TechStackItem[];
  tags: string[];
  visualizationPrompt?: string;
  featureBreakdown: Feature[];
  implementationRoadmap: ImplementationRoadmap;
  generatedStrategy?: string;
  status: IdeaStatus;
  createdAt: string;
  imageUrl: string;
  isBookmarked?: boolean;
  notes?: string;
  progressPercent?: number;
}

export interface GeneratorParams {
  industry: string;
  vibe: string;
  complexity: ComplexityLevel;
  techStack: string[];
  customPrompt?: string;
}
