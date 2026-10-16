const services = [
  { name: "Backend Systems", seed: "lumenis-service-media", alt: "Server architecture diagram" },
  { name: "Frontend Interfaces", seed: "lumenis-service-branding", alt: "Code on a screen" },
  { name: "Cloud Infrastructure", seed: "lumenis-service-art", alt: "Data center servers" },
  { name: "API Development", seed: "lumenis-service-webflow", alt: "Laptop with API docs" },
];

export default function Services() {
  return (
    <section className="section">
      <div className="section-spacing">
        <div className="container">
          <div className="section-inside">
            <div className="grid-title">
              <div className="grid-title-container">
                <div className="fade-in-on-scroll">
                  <p className="paragraph-title">What I do</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="heading-holder l">
                    <div className="fade-in-on-scroll">
                      <h1 className="h4-style">
                        I build end-to-end software solutions.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  From database schema design to deployment pipelines — I handle the full lifecycle
                  of software development.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky-services-holder mt-16">
          <div className="container">
            <div className="sticky-services">
              <div className="services">
                <div className="services-text-holder">
                  <div className="services-title">
                    <p className="paragraph-title white-text">Core competencies</p>
                  </div>
                  <div className="services-text-container">
                    {services.map((s) => (
                      <div key={s.name} className="services-text">
                        <div className="h2-style">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="yellow-box spacings">
                  <p className="paragraph-title">Expertise</p>
                </div>
              </div>

              <div className="services-images-holder">
                {services.map((s) => (
                  <div key={s.name} className="overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${s.seed}/600/600`}
                      alt={s.alt}
                      loading="lazy"
                      className="services-images"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
