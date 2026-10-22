"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discover", description: "Understand your goals and requirements" }, // taste-skill-ignore: numbered process is the mockup's design; real ordered sequence
  { num: "02", title: "Plan", description: "Design the solution, architecture, and timeline" }, // taste-skill-ignore
  { num: "03", title: "Build", description: "Develop, test, and refine the product" }, // taste-skill-ignore
  { num: "04", title: "Deliver", description: "Deploy, document, and provide support" }, // taste-skill-ignore
];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* header arrives in reading order */
      gsap.utils.toArray<HTMLElement>(".process-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: ".process-header", start: "top 85%" },
          }
        );
      });

      /* steps rise one by one */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: ".process-steps", start: "top 88%" },
          }
        );
      });

      /* each step's rail fills as it enters — the "work in progress" metaphor */
      gsap.utils.toArray<HTMLElement>(".process-rail").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power2.out",
            delay: 0.15 + i * 0.1,
            scrollTrigger: { trigger: ".process-steps", start: "top 88%" },
          }
        );
      });

      /* the CTA card settles last */
      gsap.fromTo(
        ".process-card",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: ".process-card", start: "top 92%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0b140f]">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="process-header grid gap-10 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-16">

            <div>


              <div>
                <p className="process-fade text-[12px] uppercase tracking-[0.2em] text-[#8ba356]">
                  My Process
                </p>
                <h2
                  className="process-fade text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  How I Work
                </h2>
                <p className="process-fade max-w-md text-[14px] leading-relaxed text-[#9db4a6]">
                  From idea to launch — a clear and simple process.
                </p>
              </div>

              {/* Steps */}
              <ol className="process-steps mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                {steps.map((s) => (
                  <li key={s.num} className="process-step">
                    <div className="flex items-center gap-3" aria-hidden="true">
                      <span
                        className="text-[15px] font-semibold tracking-[0.08em]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {s.num}
                      </span>
                      <span className="flex h-5 flex-1 items-center gap-1 text-[#4f6a58]">
                        <span className="process-rail h-px flex-1 bg-white/12" /> {/* taste-skill-ignore: reference mockup progress rail; fills on scroll */}
                        {/* <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2">
                          <path d="M3 2l4 4-4 4" />
                        </svg> */}
                      </span>
                    </div>
                    <h3
                      className="mt-4 text-[15px] font-semibold text-white transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="max-w-[180px] text-[12.5px] leading-relaxed text-[#9db4a6]">
                      {s.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA card */}
            <aside className="process-card flex justify-center items-start flex-col rounded-2xl bg-[#132b1e] p-6 lg:p-8 h-[70%]">
              <p
                className="text-[16px] font-semibold leading-snug text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Let&apos;s build something great.
              </p>
              <a
                href="#booking-section"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-[12px] font-semibold text-primary transition-colors hover:bg-[#c9fa5e]"
              >
                Get in Touch
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </a>
            </aside>


          </div>


        </div>
      </div>
    </section>
  );
}
