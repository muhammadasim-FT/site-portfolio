const testimonials = [
  {
    quote:
      "We handed them a tangled monolith and a two-page brief. They came back with a clean service architecture, clear documentation, and a migration path that actually worked. Still not sure how they do it, but we're fans.",
    name: "Engineering Manager",
    company: "Platform Team",
    avatar: "lumenis-avatar-1",
  },
  {
    quote:
      "Not only did they write clean, well-tested code — they understood the edge cases we hadn't thought of, nailed the API design, and even spotted a performance bug in our existing stack. 12/10 would work with again.",
    name: "Senior Developer",
    company: "Backend Team",
    avatar: "lumenis-avatar-2",
  },
  {
    quote:
      "Working with them felt like a masterclass in software design. We laughed, we refactored (a little), and now we have a codebase that new engineers can actually understand. Worth every hour.",
    name: "Tech Lead",
    company: "Product Engineering",
    avatar: "lumenis-avatar-3",
  },
  {
    quote:
      "We asked for a simple REST API. They gave us clean, well-documented, AND scalable. They even got our team lead to say 'this is exactly what I wanted' — which they usually only say about coffee.",
    name: "Head of Platform",
    company: "Infrastructure",
    avatar: "lumenis-avatar-4",
  },
  {
    quote:
      "They took our 'just make it faster' request and turned it into a proper caching strategy and query optimization plan. Wizards? Possibly. Engineers? Absolutely. Performance experts.",
    name: "Head of Performance",
    company: "Web Team",
    avatar: "lumenis-avatar-5",
  },
  {
    quote:
      "They took our 'just make it work' deployment process and turned it into a proper CI/CD pipeline. Fewer rollbacks, fewer late nights, fewer 'works on my machine' excuses.",
    name: "DevOps Lead",
    company: "Platform Team",
    avatar: "lumenis-avatar-6",
  },
  {
    quote:
      "We gave them absolutely no direction, two contradictory tickets, and one half-faked architecture diagram — and somehow they made something clean and maintainable. They're either magic or just very patient.",
    name: "Engineering Manager",
    company: "Full-Stack Team",
    avatar: "lumenis-avatar-7",
  },
  {
    quote:
      "They understood our system's constraints better than we did. I'm pretty sure they read every line of our legacy code, mapped the dependencies, and came back with a plan. Hire them before a competitor does.",
    name: "CTO",
    company: "Startup",
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
                <p className="paragraph-title">what collaborators say</p>
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
