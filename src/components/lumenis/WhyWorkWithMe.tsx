"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Clean Code",
    description: "Maintainable and scalable solutions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5.5l-4 13" />
      </svg>
    ),
  },
  {
    title: "Modern Tech Stack",
    description: "Using the latest tools and best practices.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
      </svg>
    ),
  },
  {
    title: "On-Time Delivery",
    description: "Respecting your time and goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    title: "Long-Term Support",
    description: "Beyond launch, I'm here for you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="M5.8 5.8l3.5 3.5M14.7 14.7l3.5 3.5M18.2 5.8l-3.5 3.5M9.3 14.7l-3.5 3.5" />
      </svg>
    ),
  },
  {
    title: "Client Focused",
    description: "Your success is my priority.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* eyebrow and heading arrive first, in reading order */
      gsap.utils.toArray<HTMLElement>(".why-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: ".why-header", start: "top 88%" },
          }
        );
      });

      /* cards arrive one by one across the row */
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.1 + i * 0.07,
            scrollTrigger: { trigger: ".why-grid", start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="why-header">
            <p className="why-fade flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.18em] text-[#8ba356]">
              Why Work With Me
            </p>
            <h2
              className="why-fade mt-3 max-w-md text-[clamp(22px,2.2vw,27px)] font-semibold leading-[1.25] tracking-[-0.02em] text-primary"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Trusted by clients <br></br> across different industries.
            </h2>
          </div>

          {/* Cards */}
          <div className="why-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="why-card group flex min-h-[128px] flex-col justify-between rounded-xl bg-[#fbfbf8] p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  {r.icon}
                </span>
                <div className="mt-3">
                  <h3 className="text-[13px] font-semibold text-primary">{r.title}</h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-500">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
