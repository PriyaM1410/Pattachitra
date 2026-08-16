'use client'

export default function AboutPage() {
  const timeline = [
    { year: '2002', event: 'Began formal training under master artisan Guru Ananta Maharana' },
    { year: '2012', event: 'First solo exhibition at the National Gallery of Modern Art, New Delhi' },
    { year: '2016', event: 'Awarded the State Handicrafts Award for excellence in Pattachitra' },
    { year: '2020', event: 'Featured in international exhibitions across London, Tokyo, and New York' },
    { year: '2024', event: 'Launched online platform to bring Pattachitra art to global collectors' },
  ]

  const awards = [
    {

      title: 'Odisha State Award for Folk Art Painting',
      year: '2016',
      desc: "Recognized by the Government of Odisha for excellence in traditional Pattachitra painting.",
    },
    {
   
      title: 'Basant Utsav Award',
      year: '2017',
      desc: "Honored for outstanding contributions to Odisha's folk art heritage.",
    },
    {

      title: 'Pattachitra HastaShilpi Award',
      year: '2022',
      desc: 'Awarded for exceptional craftsmanship in traditional Pattachitra art.',
    },
    {

      title: 'Odisha Folk Artist Award',
      year: '2024',
      desc: "Recognized for preserving and promoting Odisha's traditional folk art.",
    },
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
        <h2>Honoured Moments</h2>

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