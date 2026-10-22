const services = [
  {
    name: "Full-Stack Development",
    description: "Modern, scalable web applications with clean architecture.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.3-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z" />
      </svg>
    ),
  },
  {
    name: "DevOps & Cloud",
    description: "CI/CD, infrastructure, and cloud optimization for high performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M17.5 19a4.5 4.5 0 0 0 .4-9A7 7 0 0 0 4.7 12.2 3.5 3.5 0 0 0 6.5 19h11z" />
        <path d="M12 11.5l-2 2 2 2M15 11.5l2 2-2 2" />
      </svg>
    ),
  },
  {
    name: "AI & LLM",
    description: "Intelligent automation, AI agents, and LLM integrations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="5" y="7" width="14" height="12" rx="3" />
        <path d="M12 4v3M9 12h.01M15 12h.01M9.5 16h5M2 12h3M19 12h3" />
      </svg>
    ),
  },
  {
    name: "Web3 & Blockchain",
    description: "DApp development, smart contracts, and Web3 integrations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1l8-4.6z" />
        <path d="M12 12l8-4.9M12 12L4 7.1M12 12v9.5" />
      </svg>
    ),
  },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Focused" },
];

export default function Services() {
  return (
    <section className="section">
      <div className="px-8">
        <div className="grid overflow-hidden rounded-2xl lg:grid-cols-[40%_1fr]">
          {/* ---------- Services ---------- */}
          <div className="fade-in-on-scroll p-10 lg:p-14">
            <p className="paragraph-title text-xs uppercase tracking-[0.18em] text-neutral-500">
              ‣ Services
            </p>
            <h2 className="h3-style mt-5">What I Do</h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-neutral-600">
              End-to-end development and cloud solutions tailored to your
              business needs.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.name} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4ecdb] text-[#5d7f3a]">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-neutral-900">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- About Me ---------- */}
          <div className="grid grid-cols-[70%_1fr] relative border-t border-neutral-200 lg:border-l lg:border-t-0">
            <div className="relative flex flex-col p-10 lg:p-14">
              <div className="fade-in-on-scroll">
                <p className="paragraph-title text-xs uppercase tracking-[0.18em] text-neutral-500">
                  ✳ About Me
                </p>
                <h2 className="h4-style mt-5">
                  Turning ideas into real products.
                </h2>
                <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-neutral-600">
                  I&apos;m a software engineer with a passion for building
                  scalable systems, solving complex problems, and creating
                  digital experiences that matter.
                </p>
              </div>

              <div className="fade-in-on-scroll mt-8 grid grid-cols-3 divide-x divide-neutral-300">
                {stats.map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <p className="h6-style text-neutral-900">{s.value}</p>
                    <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="fade-in-on-scroll mt-10">
                <a href="#booking-section" className="button secondary">
                  <span className="button-text-holder">
                    <span className="button-text">Learn More</span>
                    <span className="button-text">Learn More</span>
                  </span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="button-icon">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>


            {/* ---------- Portrait column ---------- */}
            <div className="fade-in-on-scroll flex h-auto absolute bottom-10 right-0">


              <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img

                  src="/assets/images/profile/me2.png"
                  alt="Portrait"
                  loading="lazy"
                  className="h-[380px] w-auto object-contain"
                />
              </div>

              {/* handwritten note */}
              <p
                className="absolute -bottom-1 right-2 z-10 rotate-[-6deg] text-lg text-neutral-800 lg:right-0"
                style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
              >
                Better options,
                <br />
                Bigger possibilities.
                {/* green scribble */}
                <svg
                  viewBox="0 0 120 90"
                  fill="none"
                  className="absolute top-12 right-0 z-10 w-20 lg:w-24"
                >
                  <path
                    d="M6 74 C 30 70, 24 20, 44 22 C 60 24, 40 62, 60 58 C 82 53, 60 14, 84 16 C 100 18, 96 44, 114 38"
                    stroke="#7db34a"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
