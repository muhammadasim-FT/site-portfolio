const testimonials = [
  {
    quote:
      "We sent them a 14-page brief, 73 moodboard images, and one chaotic voice note from our founder. They came back with exactly what we wanted... somehow. Still not sure how they do it, but we're fans.",
    name: "Head of Vibes",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-1",
  },
  {
    quote:
      "Not only did they design something beautiful — they understood our weird inside jokes, nailed the tone, and even picked better font pairings than our own team (don't tell Marketing). 12/10 would collab again.",
    name: "CTA Strategist",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-2",
  },
  {
    quote:
      "Working with them felt like therapy — but for branding. We laughed, we cried (a little), and now we have a website that makes people go 'damn, who made this?' every time. Worth every pixel.",
    name: "Dana K.",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-3",
  },
  {
    quote:
      "We asked for a clean site. They gave us clean, clever, AND cool. They even made our CEO say 'wow' — which he usually only says about coffee.",
    name: "Head of Inova",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-4",
  },
  {
    quote:
      "They took our 'just make it pop' request and turned it into a design system. Wizards? Possibly. Designers? Absolutely. Chaos-to-clarity experts.",
    name: "Head of Mid",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-5",
  },
  {
    quote:
      "Displayed is the testimonial website page as well as the individual testimonial card.",
    name: "Head of Blend",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-6",
  },
  {
    quote:
      "We gave them absolutely no direction, two contradictory emails, and one half-baked Figma wireframe — and somehow they made something stunning. They're either magic or just very patient.",
    name: "Head of Trock",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-7",
  },
  {
    quote:
      "They understood our vibe better than we did. I'm pretty sure they time-traveled into the future, saw what we wanted, and came back to build it. Hire them before Netflix does.",
    name: "Head of FAC",
    company: "BananaWave Inc.",
    avatar: "lumenis-avatar-8",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="section-spacing">
        <div className="container">
          <div className="section-inside">
            <div className="content">
              <div className="center-text-holder text-center">
                <p className="paragraph-title">who's talking about us</p>
              </div>

              {/* Repeating logo animation */}
              <div className="logo-animation-holder">
                <div className="logo-animation-half _1">
                  <div className="logo-text">Mehfil</div>
                </div>
                <div className="logo-animation-half _2">
                  <div className="logo-text">Mehfil</div>
                </div>
                <div className="logo-animation-half _3">
                  <div className="logo-text">Mehfil</div>
                </div>
                <div className="logo-animation-full">
                  <div className="logo-text">Mehfil</div>
                </div>
              </div>
            </div>

            <div className="testimonial-holder">
              {testimonials.map((t) => (
                <div key={t.name} className="testimonial-item">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-user-holder">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${t.avatar}/100/100`}
                      alt={t.name}
                      loading="lazy"
                      className="testimonial-user"
                    />
                    <div className="testimonial-content">
                      <p className="paragraph-title">{t.name}</p>
                      <p className="no-margins">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
