const partners = [
  { name: "Next.js", seed: "lumenis-partner-1" },
  { name: "TypeScript", seed: "lumenis-partner-2" },
  { name: "PostgreSQL", seed: "lumenis-partner-3" },
  { name: "Node.js", seed: "lumenis-partner-4" },
  { name: "Docker", seed: "lumenis-partner-5" },
  { name: "AWS", seed: "lumenis-partner-6" },
  { name: "Redis", seed: "lumenis-partner-7" },
  { name: "GraphQL", seed: "lumenis-partner-8" },
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
                  <p className="paragraph-title">About me</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="fade-in-on-scroll">
                    <h1 className="h4-style split-text">
                      Software engineer building robust digital products from database to interface.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-8">
                <p className="paragraph-title">technologies I work with</p>
              </div>
            </div>

            <div className="partner-grid mt-12">
              {partners.map((p) => (
                <div key={p.name} className="partner">
                  <p className="partner-logo" style={{ fontSize: "16px", fontWeight: 600 }}>
                    {p.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
