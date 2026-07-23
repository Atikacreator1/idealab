import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily or safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // AI Idea Generation endpoint
  app.post('/api/generate-idea', async (req, res) => {
    try {
      const { industry = 'FinTech', vibe = 'Digital Surrealism', complexity = 'Intermediate', techStack = ['React', 'Tailwind'] } = req.body;

      const ai = getAiClient();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set
        const mockIdea = {
          id: 'idea-' + Date.now(),
          title: `${industry} Spark Engine`,
          tagline: `Next-generation ${vibe.toLowerCase()} platform built with ${techStack.join(', ')}`,
          description: `An innovative ${complexity.toLowerCase()}-level solution designed for ${industry.toLowerCase()} that streamlines workflow, enhances engagement, and automates tracking using AI.`,
          industry,
          vibe,
          complexity,
          techStack: techStack.map((tech: string, i: number) => ({
            name: tech,
            category: i === 0 ? 'Frontend' : i === 1 ? 'Styling' : 'Backend',
          })),
          tags: [`#${industry.replace(/\s+/g, '')}`, `#${vibe.replace(/\s+/g, '')}`],
          visualizationPrompt: `Concept visualization of ${industry} data flowing through an interactive glassmorphic UI.`,
          featureBreakdown: [
            { title: 'Dynamic Analytics Engine', description: 'Real-time API integrations that track metrics dynamically with automated reports.' },
            { title: 'Interactive Dashboard', description: 'Customizable visual canvas with responsive widgets and real-time alerts.' },
            { title: 'Smart Automation Hub', description: 'Rule-based trigger system to connect third-party APIs and services.' },
            { title: 'Community Insights', description: 'Collaborative benchmarking and shared telemetry for team performance.' },
          ],
          implementationRoadmap: {
            phase1: { title: 'Setup & Design', tasks: ['Brand identity & UI/UX prototypes', 'API research & schema design', 'Environment configuration'] },
            phase2: { title: 'MVP Development', tasks: ['Core feature implementation', 'User authentication & state', 'Initial beta deployment'] },
            phase3: { title: 'Scale & Expand', tasks: ['Advanced AI feature integration', 'Third-party marketplace', 'Global rollout & optimizations'] },
          },
          generatedStrategy: `Prioritize clean modular development to ensure ${vibe.toLowerCase()} UI interactions stay performant across mobile and desktop devices.`,
          status: 'Not Started',
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WuPkts-pt8Cc09SdvQryZGheat8wzOtEBitZUlzVQwV-BeOB2K52gaaJzrD8PQzL8Nt5MltFjow0W-_hjTMeus8d7LLPGAIjq-cCpY0Ffd0r3P4G_h5hripnEVajpC9Gw6muz8jcMkSYKiq3qq1nrzaUhXxxrBVAxCDxJPkZ7VyqSSW_w8gATE86TGw8_c9zU8HmTtJlwnK6b3oZ8_1PxSE2gWI9LYIIe7pM2c8vcsYmvRs9QcCb',
        };
        return res.json({ idea: mockIdea });
      }

      const prompt = `Generate a high-fidelity, highly creative software project concept idea for a developer or startup creator based on the following input parameters:
- Industry: ${industry}
- Aesthetic Vibe/Mood: ${vibe}
- Project Complexity: ${complexity}
- Tech Stack specified: ${Array.isArray(techStack) ? techStack.join(', ') : techStack}

Provide a comprehensive, inspiring, and technically sound blueprint including a catch project title, tagline, detailed description, feature breakdown (4 features), 3-phase implementation roadmap, and strategic advice.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Catchy 1-2 word project name like EcoStream, VaultNode, NeuroLink, SkillSync, Zenith Finance' },
              tagline: { type: Type.STRING, description: 'Single sentence descriptive subtitle' },
              description: { type: Type.STRING, description: '2-3 sentence overview of what the app does and why it is revolutionary' },
              tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2-3 hashtags like #FinTech, #Gamification' },
              visualizationPrompt: { type: Type.STRING, description: 'A creative description of the visual concept or data flow' },
              techStack: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING, description: 'Frontend, Backend, Styling, AI/ML, or Database' },
                  },
                  required: ['name', 'category'],
                },
              },
              featureBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ['title', 'description'],
                },
              },
              implementationRoadmap: {
                type: Type.OBJECT,
                properties: {
                  phase1: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['title', 'tasks'],
                  },
                  phase2: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['title', 'tasks'],
                  },
                  phase3: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['title', 'tasks'],
                  },
                },
                required: ['phase1', 'phase2', 'phase3'],
              },
              generatedStrategy: { type: Type.STRING, description: 'A 1-2 sentence developer strategic guidance tip' },
            },
            required: [
              'title',
              'tagline',
              'description',
              'tags',
              'visualizationPrompt',
              'techStack',
              'featureBreakdown',
              'implementationRoadmap',
              'generatedStrategy',
            ],
          },
        },
      });

      const parsedData = JSON.parse(response.text || '{}');
      
      const imageUrls = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WuPkts-pt8Cc09SdvQryZGheat8wzOtEBitZUlzVQwV-BeOB2K52gaaJzrD8PQzL8Nt5MltFjow0W-_hjTMeus8d7LLPGAIjq-cCpY0Ffd0r3P4G_h5hripnEVajpC9Gw6muz8jcMkSYKiq3qq1nrzaUhXxxrBVAxCDxJPkZ7VyqSSW_w8gATE86TGw8_c9zU8HmTtJlwnK6b3oZ8_1PxSE2gWI9LYIIe7pM2c8vcsYmvRs9QcCb',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC948V_bGBTE337sClTH0AWaUAZ_5eeeMh3hz_BgjDSChTupG0byfN6zxeDpE5sblCzGu9XOJvQCg3SRMmPEylQEQdX8vwBBPloFxGt-4KnTzgHyij8MImJd-5q8lDkb9F0cK_UgemImBO0kzf_hWQ_zfkNLkJ6J1-rf833pibaEPtnimgnbFBnldObpkX1GKkEAfe7wnnasVeVVZi8VHyx0WnXNGK9cEV0K2Ut-f3-U3oSyPd8wJon',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAG8vFgdBHHzzBUSqtIaY-EEaCnfvL0y3yZanAquqxDuwWcmEiCmUrJVAhv24cTpcBb-O5qhBselL4q7EGcsEbEbsRVA7np6f1HqfZp0vjJn_uhPsJO2vNlCxSPxqsQ0IjZ-Qvdre1aTzE7mE5m51DkDsCaxAwSDOvnjFsuJakAPDrSYmma5VAdLKSdijGHAcCbEUftTP-CmlcXqfhmcmavbLWz38Na-lazALzJ3MBnLufjeZeYPANC',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA10Aiuxfm0iUHkScZlbZwCCvy1g9SqdWJrN6HM1YtkleYGrWoM_8hGWEp4ZvgZ467tS5F1MvP0JvTYSXajO1VbnHVl-4PTmHG7B76Zuk6GYIzkrJgNZJR7j59iwqbYCacvdPfsMOVRlx8KiN0yR26nC9c_pO5ypD4t8Q0fknNrmbfUcx1nwc7ZYPGm5J5v3CJZjZCQY1JjMVYuymVzaDF_D_MlSR7NnIvKLnBWtUpWuSLwXxlc90uN',
      ];

      const fullIdea = {
        id: 'idea-' + Date.now(),
        industry,
        vibe,
        complexity,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'Not Started',
        imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        ...parsedData,
      };

      res.json({ idea: fullIdea });
    } catch (err: any) {
      console.error('Gemini generation error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate idea' });
    }
  });

  // Serve Vite in development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IdeaLab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
