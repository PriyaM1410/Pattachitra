'use client'

export default function AboutPage() {
  const timeline = [
    { year: '1990', event: 'Began formal training under My father.(This skills inherited from ancestries).' },
    { year: '2010', event: 'Exhibition at karunamayi at Kolkata' },
    { year: '2014', event: 'Exhibition at Assam (Gauhati)' },
    { year: '2017', event: 'Exhibition at Delhi Haat at New Delhi' },
    { year: '2018', event: 'Exhibition at Kalaghoda at Mumbai' },
    { year: '2022', event: 'Exhibition at Goa Saras' },
    { year: '2024', event: 'Exhibition at Bhubaneswar (Odisha) recipient Pattachitra traditional best artist award' }
  ]
  const awards = [
    {

      title: 'Odisha State Award for Folk Art Painting',
      year: '2016',
      desc: "Recognized by the Government of Odisha for excellence in traditional Pattachitra painting.",
    }
  ]

  return (
    <main className="about-page">
      {/* HEADER */}
      <div className="about-header">
        <span className="eyebrow">Our Heritage</span>
        <h1>About the Artist</h1>
        <p>A life devoted to preserving Odisha&apos;s most sacred visual tradition.</p>
      </div>

      {/* STORY */}
      <section className="story">
        <div className="story-img">
          <img src="/images/artist.jpg" alt="The artist at work" />
        </div>
        <div className="story-text">
          <span className="story-eyebrow">A Life Dedicated to Art</span>
          <h3>From Raghurajpur to the World</h3>
          <p>
            Growing up in Raghurajpur — one of India&apos;s heritage craft villages —
            I watched my grandfather transform simple cotton cloth into vivid
            mythological worlds. The rhythm of his brush became my lullaby, and
            by age fifteen, I was painting my own scrolls.
          </p>
          <p>
            Pattachitra is more than art; it is devotion. Each pigment is
            ground from natural materials — conch shells for white, lampblack
            for deep outlines, hingula for vermilion red. The process itself
            is a meditation.
          </p>
          <p>
            Today I work to honour this lineage while exploring contemporary
            themes, bridging the ancient and the modern so that Pattachitra
            continues to live and breathe in a new age.
          </p>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="journey">
        <span className="eyebrow">Milestones</span>
        <h2>The Journey</h2>

        <div className="timeline">
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <div className="timeline-item" key={item.year}>
              <div className="timeline-marker">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-card">
                <span className="year">{item.year}</span>
                <p className="event">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="awards">
        <span className="eyebrow center">Recognition</span>
        <h2>Honoured Moment</h2>

        <div className="award-grid">
          {awards.map((a) => (
            <div className="award-card" key={a.title}>
            
              <div className="award-body">
                <div className="award-top">
                  <strong>{a.title}</strong>
                  <span className="award-year">{a.year}</span>
                </div>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}