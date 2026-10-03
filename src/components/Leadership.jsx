import Section from './Section'
import Reveal from './Reveal'
import { involvement, hackathons } from '../data/involvement'

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership & activities">
      <div className="lead">
        <Reveal className="lead-main">
          <p className="lead-period">{involvement.period}</p>
          <h3>{involvement.org}</h3>
          <p className="lead-role">{involvement.role}</p>
          <p className="lead-place">{involvement.place}</p>
          <ul>
            {involvement.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </Reveal>

        <Reveal className="lead-hack" delay={120}>
          <h3 className="lead-sub">Hackathons participated</h3>
          <ul>
            {hackathons.map((h) => (
              <li key={h.event}>
                <span className="hack-event">{h.event}</span>
                <span className="hack-theme">{h.theme}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
