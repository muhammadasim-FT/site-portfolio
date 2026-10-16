const partners = [
  { name: "Partner 1", seed: "lumenis-partner-1" },
  { name: "Partner 2", seed: "lumenis-partner-2" },
  { name: "Partner 3", seed: "lumenis-partner-3" },
  { name: "Partner 4", seed: "lumenis-partner-4" },
  { name: "Partner 5", seed: "lumenis-partner-5" },
  { name: "Partner 6", seed: "lumenis-partner-6" },
  { name: "Partner 7", seed: "lumenis-partner-7" },
  { name: "Partner 8", seed: "lumenis-partner-8" },
];

export default function About() {
  return (
    <section className="section">
      <div className="section-spacing">
        <div className="line mb-16" />
        <div className="container no-padding-bot">
          <div className="section-inside">
            <div className="grid-title">
              <div className="grid-title-container">
                <div className="fade-in-on-scroll">
                  <p className="paragraph-title">About the studio</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="fade-in-on-scroll">
                    <h1 className="h4-style split-text">
                      Production studio shaping story-driven digital experiences for leading brands.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-8">
                <p className="paragraph-title">meet our partners</p>
              </div>
            </div>

            <div className="partner-grid mt-12">
              {partners.map((p) => (
                <div key={p.name} className="partner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${p.seed}/200/80`}
                    alt={p.name}
                    loading="lazy"
                    className="partner-logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
