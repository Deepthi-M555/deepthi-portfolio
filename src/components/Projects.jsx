import Section from './Section'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <Section id="projects" title="Selected projects" className="section-projects">
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} flip />
        ))}
      </div>
    </Section>
  )
}
