// Set media to a local public path or URL; mediaType may explicitly mark a video.
export const projects = [
  {
    number: '01',
    title: 'FYNIX',
    subtitle: 'AI-Powered Behavioral Focus Companion',
    kind: 'Desktop application',
    description:
      'A desktop focus companion. It tracks a work session in real time, notices interruptions and helps you recover, with voice input for hands-free use.',
    contributions: [
      'Layered-service backend with JWT authentication, protected routes and centralized error handling.',
      'Socket.IO heartbeat and presence monitoring, with session transitions across focus, interruption and recovery.',
      'Speech-to-text voice input and adaptive scheduling and recovery logic.',
      'MongoDB persistence through Mongoose.',
    ],
    technologies: ['Electron', 'React', 'Vite', 'Node.js', 'Express', 'Mongoose', 'MongoDB', 'Redis', 'Socket.IO', 'JWT', 'Docker', 'Python', 'FastAPI', 'Whisper'],
    poster: 'states',
    github: 'https://github.com/Deepthi-M555/Focus-Companion',
    demo: 'https://youtu.be/F1C9Xlo0yO0',
    media: '/projects/FYNIX.png',
    mediaAlt: 'FYNIX productivity workspace dashboard',
  },
  {
    number: '02',
    title: 'AI Copilot',
    subtitle: 'Intelligent Learning Assistant',
    kind: 'Completed project',
    description:
      'A learning assistant that uses LLMs to classify educational content by topic, difficulty and estimated study time.',
    contributions: [
      'Backend services and REST APIs for educational content processing.',
      'LLM-based classification by topic, difficulty and estimated study time.',
      'Asynchronous processing with Redis and Celery.',
      'Services packaged and run with Docker.',
    ],
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'FastAPI', 'LangChain', 'LangGraph', 'Redis', 'Celery', 'Docker', 'LLM APIs', 'Kafka'],
    poster: 'classify',
    github: 'https://github.com/manjugowda-l/ai-learning-intelligence-system',
    demo: 'https://www.youtube.com/watch?v=NZyQOrWVJKU',
    media: '/projects/aicopilot.png',
    mediaAlt: 'AI learning workflow dashboard with connected activity tracking',
  },
]
