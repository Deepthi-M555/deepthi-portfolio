const visualDetails = {
  states: {
    kicker: 'FOCUS COMPANION',
    labels: ['FOCUS', 'INTERRUPTION', 'RECOVERY'],
    note: 'A session, in motion',
  },
  classify: {
    kicker: 'LEARNING ASSISTANT',
    labels: ['TOPIC', 'DIFFICULTY', 'STUDY TIME'],
    note: 'Content, made easier to navigate',
  },
}

export default function Poster({ kind, word, caption }) {
  const visual = visualDetails[kind]
  return (
    <div className={`poster poster-${kind}`} role="img" aria-label={`${word}: ${caption}`}>
      <div className="poster-top">
        <span className="poster-marker">{caption}</span>
        <span className="poster-kicker">{visual.kicker}</span>
      </div>
      <div className="poster-center">
        <span className="poster-word">{word}</span>
        <span className="poster-note">{visual.note}</span>
      </div>
      <ul className="poster-labels" aria-hidden="true">
        {visual.labels.map((label, index) => (
          <li key={label} style={{ '--item-index': index }}>
            <i />
            {label}
          </li>
        ))}
      </ul>
      <span className="poster-rule" aria-hidden="true" />
    </div>
  )
}
