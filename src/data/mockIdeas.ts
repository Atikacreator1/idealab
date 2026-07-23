import { Idea } from '../types';

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    title: 'EcoStream',
    tagline: 'AI-Powered Carbon Footprint Tracker & Offset Marketplace',
    description: 'An intelligent environmental analytics platform that monitors corporate utility consumption, estimates real-time scope 1-3 carbon emissions using IoT telemetry, and automates certified offset purchases via smart contracts.',
    industry: 'CleanTech & ESG',
    vibe: 'Eco Minimalist',
    complexity: 'Intermediate',
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Gemini AI', category: 'AI/ML' },
      { name: 'PostgreSQL', category: 'Database' }
    ],
    tags: ['#ESG', '#CleanTech', '#Sustainability', '#Analytics'],
    visualizationPrompt: 'Concept visualization of carbon metrics flowing into a glowing green glassmorphic interface.',
    featureBreakdown: [
      {
        title: 'Telemetry Ingestion Hub',
        description: 'Connects directly with smart electric meters and cloud server metrics to compute real-time kWh carbon equivalents.'
      },
      {
        title: 'Gemini Emission Predictor',
        description: 'Uses machine learning to project quarterly emission surges and suggests proactive load-balancing schedules.'
      },
      {
        title: 'Automated Offset Marketplace',
        description: 'Enables one-click purchase of verified carbon credits with cryptographic audit trails.'
      },
      {
        title: 'Executive ESG Reports',
        description: 'Generates publication-ready PDF sustainability compliance summaries with single-click export.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: Foundation & Ingestion',
        tasks: [
          'Design glassmorphic dashboard interface & responsive components',
          'Build RESTful ingestion API for energy telemetry data',
          'Set up PostgreSQL database schema for emissions logging'
        ]
      },
      phase2: {
        title: 'Phase 2: Gemini AI Integration & Marketplace',
        tasks: [
          'Integrate Gemini 3.6 Flash for automated emissions forecasting',
          'Implement credit card & crypto payment gateways for offsets',
          'Create user authentication and workspace organization logic'
        ]
      },
      phase3: {
        title: 'Phase 3: Scale & Automated Audit Reports',
        tasks: [
          'Add automated PDF report generation and scheduling',
          'Develop webhooks for Slack & Microsoft Teams alert notifications',
          'Deploy on scalable cloud infrastructure with end-to-end encryption'
        ]
      }
    },
    generatedStrategy: 'Focus on frictionless integration with existing cloud provider billing APIs to lower onboarding friction for corporate trial users.',
    status: 'In Progress',
    createdAt: 'May 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WuPkts-pt8Cc09SdvQryZGheat8wzOtEBitZUlzVQwV-BeOB2K52gaaJzrD8PQzL8Nt5MltFjow0W-_hjTMeus8d7LLPGAIjq-cCpY0Ffd0r3P4G_h5hripnEVajpC9Gw6muz8jcMkSYKiq3qq1nrzaUhXxxrBVAxCDxJPkZ7VyqSSW_w8gATE86TGw8_c9zU8HmTtJlwnK6b3oZ8_1PxSE2gWI9LYIIe7pM2c8vcsYmvRs9QcCb',
    isBookmarked: true,
    progressPercent: 45,
    notes: 'Started working on the Telemetry ingestion schema. Need to connect with energy API sandbox.'
  },
  {
    id: 'idea-2',
    title: 'VaultNode',
    tagline: 'Decentralized Zero-Knowledge Password & Secret Manager',
    description: 'A privacy-first security platform using client-side WebAssembly encryption and local storage synchronization to manage enterprise secrets, API tokens, and user credentials without central trust.',
    industry: 'Cybersecurity',
    vibe: 'Cyberpunk Neon',
    complexity: 'Expert',
    techStack: [
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Rust WASM', category: 'Backend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'IndexedDB', category: 'Database' }
    ],
    tags: ['#Security', '#ZeroKnowledge', '#Privacy', '#WebAssembly'],
    visualizationPrompt: 'Matrix-like dark terminal interface with glowing purple security vaults.',
    featureBreakdown: [
      {
        title: 'Client-Side WASM Encryption',
        description: 'All master key derivations happen strictly inside WebAssembly memory before reaching disk or network.'
      },
      {
        title: 'Biometric Passkey Authentication',
        description: 'Seamless integration with WebAuthn for biometric unlock via TouchID and FaceID.'
      },
      {
        title: 'Ephemeral Secret Sharing',
        description: 'Generate time-expiring self-destructing links for sharing database strings with external contractors.'
      },
      {
        title: 'Automated Leak Scanner',
        description: 'Cross-checks stored credentials against breach feeds in real time using k-Anonymity queries.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: Core Cryptography Engine',
        tasks: [
          'Compile Rust AES-256 GCM encryption modules to WebAssembly',
          'Implement PBKDF2/Argon2 key derivation function',
          'Construct local IndexedDB encrypted storage layer'
        ]
      },
      phase2: {
        title: 'Phase 2: Passkey & Cloud Sync',
        tasks: [
          'Add WebAuthn passkey unlock flow',
          'Implement zero-knowledge web-socket sync server',
          'Build browser extension manifest v3 wrapper'
        ]
      },
      phase3: {
        title: 'Phase 3: Team Workspaces & Leak Alerts',
        tasks: [
          'Develop shared vaults with role-based cryptographic ACLs',
          'Integrate breach notification worker queues',
          'Conduct third-party security audit and release v1.0'
        ]
      }
    },
    generatedStrategy: 'Ensure that no unencrypted state ever leaves the WebAssembly sandbox memory space to guarantee zero-knowledge claims.',
    status: 'Not Started',
    createdAt: 'May 12, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC948V_bGBTE337sClTH0AWaUAZ_5eeeMh3hz_BgjDSChTupG0byfN6zxeDpE5sblCzGu9XOJvQCg3SRMmPEylQEQdX8vwBBPloFxGt-4KnTzgHyij8MImJd-5q8lDkb9F0cK_UgemImBO0kzf_hWQ_zfkNLkJ6J1-rf833pibaEPtnimgnbFBnldObpkX1GKkEAfe7wnnasVeVVZi8VHyx0WnXNGK9cEV0K2Ut-f3-U3oSyPd8wJon',
    isBookmarked: true,
    progressPercent: 0,
    notes: 'Interesting project for Rust/WASM learning.'
  },
  {
    id: 'idea-3',
    title: 'NeuroLink',
    tagline: 'Context-Aware AI Second Brain & Knowledge Graph Builder',
    description: 'An intelligent workspace that automatically converts notes, audio recordings, PDFs, and bookmarks into an interconnected interactive vector knowledge graph powered by Gemini reasoning.',
    industry: 'Productivity & AI',
    vibe: 'Digital Surrealism',
    complexity: 'Moonshot',
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Gemini AI', category: 'AI/ML' },
      { name: 'd3.js', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Express', category: 'Backend' }
    ],
    tags: ['#SecondBrain', '#KnowledgeGraph', '#Gemini', '#Productivity'],
    visualizationPrompt: 'Interactive 3D graph view of connected concepts glowing with pastel gradients.',
    featureBreakdown: [
      {
        title: 'Automatic Entity Extraction',
        description: 'Parses incoming articles and notes to extract people, concepts, and technologies automatically.'
      },
      {
        title: 'Interactive Graph Explorer',
        description: 'Smooth D3 force-directed visual layout allowing deep zoom, node filtering, and relationship expansion.'
      },
      {
        title: 'Gemini Semantic Search & Chat',
        description: 'Ask natural language questions across your entire knowledge repository with citations.'
      },
      {
        title: 'Voice Note Synthesizer',
        description: 'Record quick voice thoughts on mobile and automatically transcribe, summarize, and link into nodes.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: Document Processing Pipeline',
        tasks: [
          'Build PDF, Markdown, and Webpage content parser',
          'Configure Gemini vector embedding pipeline',
          'Create initial D3 node-link rendering canvas'
        ]
      },
      phase2: {
        title: 'Phase 2: Natural Query & Graph Interaction',
        tasks: [
          'Build interactive chat side-drawer with grounded search',
          'Add node cluster auto-labeling using AI',
          'Implement drag-and-drop document uploader'
        ]
      },
      phase3: {
        title: 'Phase 3: Cross-Device Sync & Browser Extension',
        tasks: [
          'Build Chrome extension for 1-click web page clipping',
          'Optimize graph force simulation for 10,000+ nodes',
          'Add multi-user graph sharing and collaboration'
        ]
      }
    },
    generatedStrategy: 'Prioritize graph rendering performance with Canvas or WebGL to prevent FPS drops when visual node counts exceed 1,000 items.',
    status: 'Built',
    createdAt: 'Apr 28, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG8vFgdBHHzzBUSqtIaY-EEaCnfvL0y3yZanAquqxDuwWcmEiCmUrJVAhv24cTpcBb-O5qhBselL4q7EGcsEbEbsRVA7np6f1HqfZp0vjJn_uhPsJO2vNlCxSPxqsQ0IjZ-Qvdre1aTzE7mE5m51DkDsCaxAwSDOvnjFsuJakAPDrSYmma5VAdLKSdijGHAcCbEUftTP-CmlcXqfhmcmavbLWz38Na-lazALzJ3MBnLufjeZeYPANC',
    isBookmarked: false,
    progressPercent: 100,
    notes: 'Successfully launched MVP on ProductHunt with 400+ upvotes!'
  },
  {
    id: 'idea-4',
    title: 'SkillSync',
    tagline: 'Peer-to-Peer Micro-Learning & Gamified Tech Mentorship Platform',
    description: 'A platform matching developers for 15-minute code pair reviews, skill exchanges, and live interactive challenges using automated code sandbox pairing and streak rewards.',
    industry: 'EdTech & HR',
    vibe: 'Warm Playful',
    complexity: 'Beginner',
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Firebase', category: 'Database' },
      { name: 'WebRTC', category: 'Backend' }
    ],
    tags: ['#EdTech', '#Mentorship', '#PairProgramming', '#Community'],
    visualizationPrompt: 'Bright colorful cards representing live mentorship rooms with user avatars.',
    featureBreakdown: [
      {
        title: 'Smart Skill Matching',
        description: 'Algorithmic queue matching developers based on complementary skills (e.g. React pro helps Rust novice).'
      },
      {
        title: 'Embedded Live Code Playground',
        description: 'Real-time collaborative Monaco code editor with bi-directional video call overlay.'
      },
      {
        title: 'Gamified XP & Badges',
        description: 'Earn verified skill credentials and mentor karma points redeemable for dev tools discounts.'
      },
      {
        title: 'Asynchronous Code Feedback',
        description: 'Submit pull requests for quick community inline audio and code comments.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: User Profiles & Match Engine',
        tasks: [
          'Create user onboarding flow for tech stack interests',
          'Implement real-time matching queue logic',
          'Design avatar and badge customization system'
        ]
      },
      phase2: {
        title: 'Phase 2: Video & Code Sandbox Room',
        tasks: [
          'Integrate WebRTC peer-to-peer video streaming',
          'Embed Monaco editor with operational transformation sync',
          'Build session countdown timer & feedback ratings'
        ]
      },
      phase3: {
        title: 'Phase 3: Leaderboards & Community Perks',
        tasks: [
          'Build community leaderboard and daily streak trackers',
          'Partner with dev tool sponsors for XP rewards',
          'Launch mobile responsive web app'
        ]
      }
    },
    generatedStrategy: 'Keep mentorship session lengths capped at 15 minutes to maximize user availability and keep interactions focused.',
    status: 'In Progress',
    createdAt: 'May 08, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA10Aiuxfm0iUHkScZlbZwCCvy1g9SqdWJrN6HM1YtkleYGrWoM_8hGWEp4ZvgZ467tS5F1MvP0JvTYSXajO1VbnHVl-4PTmHG7B76Zuk6GYIzkrJgNZJR7j59iwqbYCacvdPfsMOVRlx8KiN0yR26nC9c_pO5ypD4t8Q0fknNrmbfUcx1nwc7ZYPGm5J5v3CJZjZCQY1JjMVYuymVzaDF_D_MlSR7NnIvKLnBWtUpWuSLwXxlc90uN',
    isBookmarked: true,
    progressPercent: 70,
    notes: 'WebRTC video room connected! Testing Monaco sync next week.'
  },
  {
    id: 'idea-5',
    title: 'Zenith Finance',
    tagline: 'Autonomous AI Portfolio Rebalancer & Cash Flow Optimizer',
    description: 'An intelligent personal finance dashboard that aggregates bank accounts, analyzes spending patterns, and automates high-yield savings allocation with algorithmic safety checks.',
    industry: 'FinTech',
    vibe: 'Glassmorphic Modern',
    complexity: 'Expert',
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Express', category: 'Backend' },
      { name: 'Gemini AI', category: 'AI/ML' },
      { name: 'Recharts', category: 'Frontend' }
    ],
    tags: ['#FinTech', '#WealthTech', '#AI', '#Automation'],
    visualizationPrompt: 'Sleek dark and violet financial charts showing automated wealth growth trajectories.',
    featureBreakdown: [
      {
        title: 'Multi-Bank Aggregation',
        description: 'Secure Open Banking API integration to unify accounts, credit cards, and investments.'
      },
      {
        title: 'Gemini Anomaly & Budget Advisor',
        description: 'Detects unexpected subscriptions, price hikes, and suggests optimal monthly budget adjustments.'
      },
      {
        title: 'Automated Sweep Rules',
        description: 'Set custom triggers like "Sweep any balance above $3,000 into high-yield savings on Fridays".'
      },
      {
        title: 'Interactive Investment Forecasts',
        description: 'Monte Carlo simulation visualizations for long-term retirement and big purchase milestones.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: Financial Data Layer',
        tasks: [
          'Integrate Plaid / OpenBanking sandbox credentials',
          'Build transaction normalizer and categorization engine',
          'Design Recharts interactive financial graph widgets'
        ]
      },
      phase2: {
        title: 'Phase 2: Gemini Financial Insights',
        tasks: [
          'Implement AI spending anomaly detector',
          'Create rule builder for automated balance transfers',
          'Build biometric security authentication locks'
        ]
      },
      phase3: {
        title: 'Phase 3: Wealth Projection & Mobile App',
        tasks: [
          'Develop Monte Carlo retirement scenario simulator',
          'Add automated tax loss harvesting alerts',
          'Conduct SOC2 compliance verification'
        ]
      }
    },
    generatedStrategy: 'Use strict bank-grade encryption in transit and at rest, and keep financial advice clearly tagged as AI simulations.',
    status: 'Not Started',
    createdAt: 'May 01, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WuPkts-pt8Cc09SdvQryZGheat8wzOtEBitZUlzVQwV-BeOB2K52gaaJzrD8PQzL8Nt5MltFjow0W-_hjTMeus8d7LLPGAIjq-cCpY0Ffd0r3P4G_h5hripnEVajpC9Gw6muz8jcMkSYKiq3qq1nrzaUhXxxrBVAxCDxJPkZ7VyqSSW_w8gATE86TGw8_c9zU8HmTtJlwnK6b3oZ8_1PxSE2gWI9LYIIe7pM2c8vcsYmvRs9QcCb',
    isBookmarked: false,
    progressPercent: 0
  },
  {
    id: 'idea-6',
    title: 'SlateFlow',
    tagline: 'Collaborative Visual Canvas for System Architecture & Flowcharts',
    description: 'An ultra-fast infinite canvas tool for software engineers to sketch system diagrams, database schemas, and API flows with automated code scaffolding export.',
    industry: 'DevTools',
    vibe: 'Minimalist Clean',
    complexity: 'Intermediate',
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'HTML5 Canvas', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' }
    ],
    tags: ['#DevTools', '#Architecture', '#Diagrams', '#OpenSource'],
    visualizationPrompt: 'Infinite grid canvas showing interconnected microservice architecture blocks.',
    featureBreakdown: [
      {
        title: 'Infinite Vector Canvas',
        description: 'Smooth pan/zoom canvas supporting hand-drawn styles, standard UML shapes, and custom tech icons.'
      },
      {
        title: 'Instant Code Scaffolder',
        description: 'Converts diagrammed database nodes and API routes into executable TypeScript / SQL starter code.'
      },
      {
        title: 'Live Multiplayer Cursor Sync',
        description: 'Work simultaneously with team members with real-time websocket cursor presences.'
      },
      {
        title: 'Git Versioning for Diagrams',
        description: 'Commit architecture state directly into GitHub repositories as clean text-based Mermaid code.'
      }
    ],
    implementationRoadmap: {
      phase1: {
        title: 'Phase 1: Canvas Engine',
        tasks: [
          'Build infinite pan/zoom spatial canvas using React / HTML5 Canvas',
          'Implement node creation, drag-and-drop, and magnetic connector lines',
          'Design crisp architectural icon set'
        ]
      },
      phase2: {
        title: 'Phase 2: Code Generation & Export',
        tasks: [
          'Add SQL DDL and TypeScript interface generator from diagram nodes',
          'Implement SVG, PNG, and Mermaid.js export formats',
          'Create local project autosave engine'
        ]
      },
      phase3: {
        title: 'Phase 3: Multiplayer Sync & Webhooks',
        tasks: [
          'Add WebSocket server for live multi-user editing',
          'Integrate GitHub PR bot to auto-update docs on diagram change',
          'Optimize rendering for 5,000+ canvas objects'
        ]
      }
    },
    generatedStrategy: 'Ensure that canvas state serialized format is lightweight and readable so developers can diff diagrams easily in version control.',
    status: 'In Progress',
    createdAt: 'Apr 19, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC948V_bGBTE337sClTH0AWaUAZ_5eeeMh3hz_BgjDSChTupG0byfN6zxeDpE5sblCzGu9XOJvQCg3SRMmPEylQEQdX8vwBBPloFxGt-4KnTzgHyij8MImJd-5q8lDkb9F0cK_UgemImBO0kzf_hWQ_zfkNLkJ6J1-rf833pibaEPtnimgnbFBnldObpkX1GKkEAfe7wnnasVeVVZi8VHyx0WnXnXNGK9cEV0K2Ut-f3-U3oSyPd8wJon',
    isBookmarked: true,
    progressPercent: 30
  }
];
