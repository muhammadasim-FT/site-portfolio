const services = ["Full-Stack", "Cloud & DevOps", "API Design", "System Architecture"];
const locations = ["Based in", "Los angeles", "London", "Milano"];
const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter", href: "https://x.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
];

const heroImages = [
  { seed: "lumenis-hero-1", alt: "Server rack in a data center" },
  { seed: "lumenis-hero-2", alt: "Lines of code on a screen" },
  { seed: "lumenis-hero-3", alt: "Developer workspace with multiple monitors" },
  { seed: "lumenis-hero-4", alt: "Cloud infrastructure diagram" },
  { seed: "lumenis-hero-5", alt: "Code editor with dark theme" },
  { seed: "lumenis-hero-6", alt: "Terminal window with build output" },
  { seed: "lumenis-hero-7", alt: "Architecture whiteboard sketch" },
  { seed: "lumenis-hero-8", alt: "Laptop on a desk with coffee" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background image grid */}
      <div className="image_wrap absolute inset-0">
        <div className="grid h-full grid-cols-4 gap-2 opacity-60">
          {heroImages.map((img) => (
            <div key={img.seed} className="content_img-wrap overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${img.seed}/600/800`}
                alt={img.alt}
                loading="lazy"
                className="content_img h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        <div className="flex min-h-[calc(100vh-6rem)] flex-col justify-center py-16">
          {/* Logo hero text */}
          <div className="logo-holder mb-12">
            <h1 className="logo-hero-text">Mehfil</h1>

            {/* Rails */}
            <div className="hero-links-holder mt-8 flex flex-wrap items-start justify-between gap-8">
              <div className="hero-content flex flex-wrap gap-8">
                <div className="hero-content-holder">
                  {services.slice(0, 2).map((s) => (
                    <div key={s} className="animate-on-load">
                      <p className="small-text">{s}</p>
                    </div>
                  ))}
                </div>
                <div className="hero-content-holder">
                  {services.slice(2).map((s) => (
                    <div key={s} className="animate-on-load">
                      <p className="small-text">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-content flex flex-wrap gap-8">
                <div className="hero-content-holder">
                  {locations.map((l) => (
                    <div key={l} className="animate-on-load">
                      <p className="small-text">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-content no-gird">
                <div className="hero-content-holder right">
                  {socials.map((s) => (
                    <div key={s.label} className="animate-on-load">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="small-link"
                      >
                        <p className="small-text">
                          {s.label} <span aria-hidden="true">&#8599;</span>
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div className="hero-holder">
              <div className="animate-on-load">
                <h5 className="no-margins h5-style max-w-md">
                  Software engineer crafting reliable, scalable systems from database to interface.
                </h5>
              </div>
            </div>

            <div className="hero-paragraph-container">
              <div className="animate-on-load">
                <p className="max-w-md text-[15px] leading-relaxed text-neutral-600">
                  I design and build software that solves real problems — from low-level backend
                  infrastructure to polished frontend experiences.
                </p>
              </div>

              <div className="hero-button-holder mt-6 flex flex-wrap gap-3">
                <div className="animate-on-load">
                  <a href="/contact" className="button">
                    <span className="button-text-holder">
                      <span className="button-text">Get in Touch</span>
                      <span className="button-text">Get in Touch</span>
                    </span>
                    <svg
                      className="button-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                </div>
                <div className="animate-on-load">
                  <a href="/about" className="button secondary">
                    <span className="button-text-holder">
                      <span className="button-text">Learn More</span>
                      <span className="button-text">Learn More</span>
                    </span>
                    <span className="red-circle black" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
