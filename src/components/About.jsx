import Section from './Section'
import Reveal from './Reveal'
import { about } from '../data/site'

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="about">
        <Reveal as="p" className="about-statement">{about.statement}</Reveal>
        <div className="about-cols">
          <Reveal className="about-text" delay={80}>
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <Reveal as="dl" className="about-facts" delay={160}>
            {about.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
