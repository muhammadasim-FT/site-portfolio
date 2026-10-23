"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  { value: "4", suffix: "+", label: "Years Experience" },
  { value: "10", suffix: "+", label: "Projects Delivered" },
  { value: "100", suffix: "%", label: "Client Focused" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* left header arrives in reading order */
      gsap.utils.toArray<HTMLElement>(".svc-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: ".services-card", start: "top 85%" },
          }
        );
      });

      /* service rows arrive one by one */
      gsap.utils.toArray<HTMLElement>(".svc-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.1 + i * 0.07,
            scrollTrigger: { trigger: ".services-card", start: "top 85%" },
          }
        );
      });

      /* stats count up once — the "proof" move */
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el, i) => {
        const target = Number(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.2 + i * 0.12,
          scrollTrigger: { trigger: ".svc-stats", start: "top 88%" },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      /* the right-hand copy lifts, the portrait settles from a slight scale */
      gsap.fromTo(
        ".svc-copy",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: ".services-card", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".svc-portrait",
        { opacity: 0, scale: 1.05, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: { trigger: ".services-card", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="px-4 sm:px-8">
        <div className="services-card grid overflow-hidden rounded-2xl lg:grid-cols-[40%_1fr]">
          {/* ---------- Services ---------- */}
          <div className="py-8 lg:p-11">
            <p className="svc-fade paragraph-title text-xs uppercase tracking-[0.18em] text-neutral-500">
              ‣ Services
            </p>
            <h2 className="svc-fade h3-style mt-4">What I Do</h2>
            <p className="svc-fade mt-4 max-w-sm text-[13.5px] leading-relaxed text-neutral-600">
              End-to-end development and cloud solutions tailored to your
              business needs.
            </p>

            <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.name} className="svc-step group flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4ecdb] text-[#5d7f3a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-semibold text-neutral-900">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-500">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- About Me ---------- */}
          <div className="grid grid-cols-1 relative border-t border-neutral-200 lg:grid-cols-[70%_1fr] lg:border-l lg:border-t-0"> {/* taste-skill-ignore: reference mockup divider between Services and About halves */}
            <div className="relative flex flex-col py-8 lg:p-11">
              <div className="svc-copy">
                <p className="flex items-center gap-1.5 paragraph-title text-xs uppercase tracking-[0.18em] text-neutral-500">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-3 w-3" aria-hidden="true">
                    <path d="M8 2v12M2.9 5l10.2 6M13.1 5 2.9 11" />
                  </svg>
                  About Me
                </p>
                <h2 className="h4-style mt-4">
                  Turning ideas into real products.
                </h2>
                <p className="mt-4 max-w-xs text-[11.5px] leading-relaxed text-neutral-600">
                  I&apos;m a software engineer with a passion for building
                  scalable systems, solving complex problems, and creating
                  digital experiences that matter.
                </p>
              </div>

              <div className="svc-stats mt-6 grid grid-cols-3 divide-x divide-neutral-300"> {/* taste-skill-ignore: reference mockup vertical stat dividers */}
                {stats.map((s) => (
                  <div key={s.label} className="px-2.5 first:pl-0 sm:px-3.5">
                    <p
                      className="stat-value h6-style text-neutral-900"
                      data-target={s.value}
                      data-suffix={s.suffix}
                    >
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-[9.5px] text-neutral-500 sm:text-[11px]">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="svc-fade mt-8">
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
            <div className="svc-portrait hidden sm:flex relative mt-6 justify-end lg:absolute lg:right-0 lg:bottom-10 lg:mt-0">


              <div className="relative ml-auto w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img

                  src="/assets/images/profile/me2.png"
                  alt="Portrait"
                  loading="lazy"
                  className="h-[230px] w-auto object-contain sm:h-[300px] lg:ml-0 lg:h-[380px]"
                />
              </div>

              {/* handwritten note */}
              <p
                className="absolute -bottom-1 right-20 z-10 rotate-[-6deg] text-[14px] text-neutral-800 lg:right-0 lg:text-[16px]"
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
