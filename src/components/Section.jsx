import { useInView } from './Reveal'

export default function Section({ id, title, aside, className = '', children }) {
  const [ref, seen] = useInView()
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrap">
        <div ref={ref} className={`s-head ${seen ? 'in' : ''}`}>
          <h2 className="s-title">
            <span className="mask">
              <span className="s-title-in">{title}</span>
            </span>
          </h2>
          {aside && <p className="s-aside">{aside}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
