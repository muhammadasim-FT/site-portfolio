const services = [
  { name: "Digital Media", seed: "lumenis-service-media", alt: "Person holding smartphone at sunset" },
  { name: "Branding", seed: "lumenis-service-branding", alt: "Hand holding coffee cup with droplets" },
  { name: "Art Direction", seed: "lumenis-service-art", alt: "Man in pinstripe blazer sitting in car" },
  { name: "Webflow", seed: "lumenis-service-webflow", alt: "Laptop on grass displaying app screen" },
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
                  <p className="paragraph-title">Services we can help</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="heading-holder l">
                    <div className="fade-in-on-scroll">
                      <h1 className="h4-style">
                        We offer studio shaping story-driven Digital campaigns .
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper amet diam duis lacus ut
                  tincidunt vel mauris. Elementum tortor elit nisi viverra purus. Quam lacus;
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
                    <p className="paragraph-title white-text">Why work with us</p>
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
                  <p className="paragraph-title">Services</p>
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
