import Section from './Section'
import Reveal from './Reveal'
import { education } from '../data/involvement'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="edu">
        {education.map((e, i) => (
          <Reveal className="edu-row" key={e.school} delay={i * 80}>
            <p className="edu-period">{e.period}</p>
            <div className="edu-main">
              <h3>{e.school}</h3>
              <p>{e.degree}</p>
            </div>
            <p className="edu-score">
              <strong>{e.big}<small>{e.unit}</small></strong>
              <span>{e.label}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
