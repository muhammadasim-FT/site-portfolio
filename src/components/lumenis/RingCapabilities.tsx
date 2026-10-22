"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------- ring data --------------------------------- */

type Ring = {
  label: string;
  value: number; // 0–100
  display: string;
  color: string;
};

const rings: Ring[] = [
  { label: "Full-Stack", value: 95, display: "95%", color: "#000000" },
  { label: "DevOps & Cloud", value: 90, display: "90%", color: "#404040" },
  { label: "AI & LLM", value: 85, display: "85%", color: "#737373" },
  { label: "Web3 & Blockchain", value: 80, display: "80%", color: "#a3a3a3" },
  { label: "Architecture", value: 92, display: "92%", color: "#d4d4d4" },
];

/* --------------------------------- section ---------------------------------- */

export default function RingCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      /* ---- ring stroke draw on scroll ---- */
      gsap.utils.toArray<SVGCircleElement>(".ring-circle").forEach((circle, i) => {
        const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r") ?? "0");
        gsap.set(circle, {
          strokeDasharray: `${circumference}`,
          strokeDashoffset: `${circumference}`,
        });
        gsap.to(circle, {
          strokeDashoffset: circumference * (1 - rings[i].value / 100),
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".rings-container",
            start: "top 70%",
            end: "top 30%",
            scrub: 0.5,
          },
        });
      });

      /* ---- labels fade in after rings draw ---- */
      gsap.fromTo(
        ".ring-label",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".rings-container",
            start: "top 50%",
          },
        }
      );

      /* ---- heading reveal ---- */
      gsap.fromTo(
        ".capabilities-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".capabilities-header", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---- geometry ---- */
  const size = 400;
  const center = size / 2;
  const strokeWidth = 2;
  const maxRadius = (size / 2) - 20;
  const gap = (maxRadius - 30) / rings.length;

  return (
    <section ref={sectionRef} id="capabilities-section" className="section bg-white">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="capabilities-header mb-16 max-w-lg">
            <p className="paragraph-title text-neutral-400">Technical depth</p>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-black md:text-5xl">
              Capabilities, measured.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
              Years of building production systems, distilled into numbers. Each ring represents
              a core area of engineering depth — from full-stack product delivery to smart contract auditing.
            </p>
          </div>

          {/* Rings */}
          <div className="rings-container mx-auto max-w-3xl">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="mx-auto w-full max-w-[400px]"
              role="img"
              aria-label="Technical capability rings showing proficiency across five engineering domains"
            >
              {/* Half-ring arcs */}
              {rings.map((ring, i) => {
                const radius = maxRadius - i * gap;
                const circumference = Math.PI * radius; // half circle
                return (
                  <g key={ring.label}>
                    {/* Track */}
                    <circle
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="none"
                      stroke="#ececec"
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${circumference} ${circumference * 2}`}
                      transform={`rotate(180 ${center} ${center})`}
                    />
                    {/* Progress */}
                    <circle
                      className="ring-circle"
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="none"
                      stroke={ring.color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      transform={`rotate(180 ${center} ${center})`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
              {rings.map((ring) => (
                <div key={ring.label} className="ring-label flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: ring.color }}
                  />
                  <span className="text-sm font-medium text-black">{ring.label}</span>
                  <span className="text-sm text-neutral-400">{ring.display}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}