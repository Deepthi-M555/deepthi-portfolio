import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import Poster from './Poster'
import Reveal, { useInView } from './Reveal'
import { technologyIcons } from '../data/technologyIcons'

const captions = { states: 'Session states', classify: 'Classification output' }
const words = { states: 'FYNIX', classify: 'AI COPILOT' }

function Media({ project, revealed }) {
  const [mediaUnavailable, setMediaUnavailable] = useState(false)
  const reduceMotion = useReducedMotion()
  const { media, title, poster } = project
  if (!media || mediaUnavailable) return <Poster kind={poster} word={words[poster]} caption={captions[poster]} />
  const isVideo = project.mediaType === 'video' || /\.(mp4|webm|mov)(?:[?#].*)?$/i.test(media)
  return isVideo ? (
    <video
      className="media-el"
      src={media}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={project.mediaPoster}
      aria-label={project.mediaAlt || `${title} project video`}
    />
  ) : (
    <motion.img
      className="media-el"
      src={media}
      alt={project.mediaAlt || `${title} project media`}
      loading="lazy"
      decoding="async"
      onError={() => setMediaUnavailable(true)}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985, rotateX: 2, clipPath: 'inset(7% 0 0)' }}
      animate={revealed
        ? { opacity: 1, y: 0, scale: 1, rotateX: 0, clipPath: 'inset(0)' }
        : { opacity: 0, y: 18, scale: 0.985, rotateX: 2, clipPath: 'inset(7% 0 0)' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.2, 0.7, 0.1, 1] }}
    />
  )
}

function ProjectAction({ href, label, className = '', kind = 'github' }) {
  const available = typeof href === 'string' && /^https?:\/\//i.test(href)
  return available ? (
    <a className={`btn project-github project-action--${kind} ${className}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label}${kind === 'github' ? ' repository' : ''} in a new tab`}>
      {kind === 'github' ? (
        <img src="/tech-icons/github.svg" alt="" aria-hidden="true" />
      ) : (
        <Play size={16} fill="currentColor" aria-hidden="true" />
      )}
      <span>{label}</span>
      {kind === 'github' && <ArrowUpRight size={15} aria-hidden="true" />}
    </a>
  ) : (
    <span className={`btn btn-unavailable ${className}`} aria-disabled="true"><span>{label}</span></span>
  )
}

export default function ProjectCard({ project, flip }) {
  const [ref, seen] = useInView({ threshold: 0.15 })
  return (
    <article className={`project project--${project.number === '01' ? 'fynix' : 'copilot'} ${flip ? 'is-flip' : ''}`}>
      <Reveal className={`project-head ${flip ? 'reveal--right' : 'reveal--left'}`}>
        <p className="project-kind">
          <b>{project.number}</b>
          <span>{project.kind}</span>
        </p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-sub">{project.subtitle}</p>
      </Reveal>

      <div className="project-body">
        <div ref={ref} className={`frame ${seen ? 'in' : ''}`}>
          <Media project={project} revealed={seen} />
        </div>

        <Reveal className={`project-aside ${flip ? 'reveal--left' : 'reveal--right'}`} delay={120}>
          <p className="project-desc">{project.description}</p>
          <div className="project-tech-block">
            <h4>Tech stack used</h4>
            <ul className="tech">
              {project.technologies.map((technology, index) => (
                <li key={technology} style={{ '--item-index': index }}>
                  {technologyIcons[technology] && (
                    <img src={`/tech-icons/${technologyIcons[technology]}`} alt="" aria-hidden="true" loading="lazy" />
                  )}
                  <span>{technology}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="project-links">
            <ProjectAction href={project.github} label="GitHub" className="btn-solid" />
            <ProjectAction href={project.demo} label="Demo Video" kind="youtube" />
          </div>
        </Reveal>
      </div>

      <Reveal className={`contrib ${flip ? 'reveal--left' : 'reveal--right'}`} delay={180}>
        <h4>Key contributions</h4>
        <ul>
          {project.contributions.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Reveal>
    </article>
  )
}
