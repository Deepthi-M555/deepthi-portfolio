export const site = {
  name: 'Deepthi M',
  role: ['Full-Stack Developer', '& AI Enthusiast'],
  tagline: 'Cloud & Software Development',
  intro:
    'Engineering student building full-stack and AI-integrated systems: JWT-secured APIs, real-time sessions over Socket.IO and LLM pipelines on Redis and Celery.',
  email: 'mdeepthi555@gmail.com',
  github: 'https://github.com/Deepthi-M555',
  linkedin: 'https://www.linkedin.com/in/deepthi-m-339023297',
  resume: '/Deepthi_M_Resume.pdf',
  location: 'Bangalore, India',
}

export const gmailCompose = (subject = '', body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const heroFacts = [
  ['Based in', 'Bangalore, India'],
  ['Studying', 'B.E. Electronics and Communication, BIT (2023 – 2027)'],
]

export const navLinks = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Leadership', '#leadership'],
  ['Education', '#education'],
]

export const about = {
  statement: 'I build the backend that holds a product together, and the AI features that sit on top of it.',
  paragraphs: [
    'I study Electronics and Communication Engineering at BIT Bangalore, and most of my project time goes into software. FYNIX is a desktop app with a JWT-secured API and real-time session tracking. AI Copilot uses LLMs to classify learning content, with Redis and Celery handling the processing.',
    'I am looking for software engineering and full-stack roles.',
  ],
  facts: [
    ['Based in', 'Bangalore, India'],
    ['Education', 'B.E. Electronics and Communication Engineering'],
    ['Focus', 'Full-stack development, AI / LLM systems'],
  ],
}
