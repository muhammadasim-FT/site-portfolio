"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const projects = [
  { name: "Neeraj", sub: "Emergency Response Dashboard", img: "/assets/images/gallery/norms.jpg", depth: 70, offset: -14 },
  { name: "ServiceFlow", sub: "Operations Dashboard", img: "/assets/images/gallery/serviceflow.jpg", depth: 30, offset: 10 },
  { name: "Saft.ai", sub: "Lead Generation Pipeline", img: "/assets/images/gallery/saftai.jpg", depth: 0, offset: -6 },
  // { name: "ChainGPT Pad", sub: "Launchpad Interface", img: "/assets/images/gallery/launhpad.jpg", depth: 45, offset: 14 },
  { name: "CryptoScope", sub: "Analytics Platform", img: "/assets/images/gallery/marketplace.jpg", depth: 10, offset: -10 },
  // { name: "AI-Hub Academy", sub: "Education Portal", img: "/assets/images/gallery/aihub.jpg", depth: 55, offset: 6 },
  { name: "Azura", sub: "Luxury Yachts Charter", img: "/assets/images/gallery/azura.jpg", depth: 25, offset: -8 },
  // { name: "DigiX", sub: "Agency Website", img: "/assets/images/gallery/digiX.jpg", depth: 0, offset: 12 },
  { name: "Al-Nasr Academy", sub: "Executive Portfolio", img: "/assets/images/gallery/alnasr.jpg", depth: 40, offset: -12 },
];

const checklist = ["Full-Stack", "DevOps & Cloud", "AI & LLM", "Web3 & Blockchain"];

export default function Hero() {
  const planeRef = useRef<HTMLDivElement>(null);

  /* subtle mouse parallax on the 3D wall */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const plane = planeRef.current;
    if (!plane) return;

    const rotY = gsap.quickTo(plane, "rotateY", { duration: 0.8, ease: "power3.out" });
    const rotX = gsap.quickTo(plane, "rotateX", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rotY(-22 + nx * 6);
      rotX(8 - ny * 5);
    };

    gsap.fromTo(
      plane,
      { rotateY: -34, rotateX: 16, opacity: 0 },
      { rotateY: -22, rotateX: 8, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.6 }
    );

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#0b140f] pt-24 text-white sm:pt-28">
      {/* faint bird decorations */}
      <svg
        viewBox="0 0 64 32"
        fill="none"
        stroke="#8fae97"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="pointer-events-none absolute top-24 left-[46%] hidden opacity-[0.18] lg:block"
        aria-hidden="true"
      >
        <path d="M2 22c10-12 18-12 22-4 3-6 9-6 12 2M34 18c8-10 16-10 20-2" />
      </svg>

      <div className="container relative z-10">
        <div className="grid min-h-[calc(100svh-8rem)] items-center gap-10 pb-12 sm:gap-14 sm:pb-16 lg:grid-cols-[43%_1fr]">
          {/* ---------- Left: copy ---------- */}
          <div className="max-w-xl">
            <div className="animate-on-load flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
              <p className="text-[13px] text-[#c7d8cd]">Software Engineer &amp; Digital Builder</p>
            </div>

            <div className="animate-on-load mt-4 sm:mt-5">
              <h1
                className="text-white text-[clamp(31px,7.5vw,56px)] font-medium leading-[1.06] tracking-[-0.03em] sm:text-[clamp(38px,4vw,56px)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                I build digital products that help businesses <br className="hidden sm:block"></br>{" "}
                <em className="italic text-secondary">grow.</em>
              </h1>
            </div>

            <div className="animate-on-load mt-5 sm:mt-6">
              <p className="max-w-md text-[14px] leading-relaxed text-[#9db4a6] sm:text-[15px]">
                Full-stack development, AI automation, DevOps &amp; Cloud, and Web3
                solutions — turning ideas into scalable products that create
                real value.
              </p>
            </div>

            <div className="animate-on-load mt-5 flex flex-wrap gap-3 sm:mt-6">
              <a
                href="#projects-section"
                className="flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-[13.5px] font-semibold text-[#0b140f] transition-colors hover:bg-[#c9fa5e] sm:px-6 sm:py-3.5 sm:text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                View My Work
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href="#booking-section"
                className="rounded-full border border-white/25 px-5 py-3 text-[13.5px] font-medium text-white transition-colors hover:border-secondary hover:text-secondary sm:px-6 sm:py-3.5 sm:text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Discuss a Project
              </a>
            </div>

            {/* capability checklist */}
            <div className="animate-on-load mt-5 flex flex-wrap gap-x-4 gap-y-2.5 sm:mt-6 sm:gap-y-3">
              {checklist.map((item) => (
                <span key={item} className="flex items-center gap-2 text-[13px] text-[#c7d8cd]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b8f04d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12.5 2 2 5-5" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- Right: 3D project catalog ---------- */}
          <div className="hero-wall relative hidden lg:block" aria-label="Project catalog">
            <div ref={planeRef} className="hero-wall-plane" style={{ transform: "rotateY(-34deg) rotateX(16deg)" }}>
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="hero-card"
                  style={{ transform: `translate3d(0, ${p.offset}px, ${p.depth}px)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.sub}`}
                    loading="eager"
                    className="hero-card-img"
                  />
                  <div className="hero-card-meta">
                    <p className="text-[13px] font-semibold leading-none">{p.name}</p>
                    <p className="mt-1.5 text-[11px] leading-none text-[#8fa89a]">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* vertical scroll hint */}
            <div className="pointer-events-none absolute top-1/2 -right-15 flex -translate-y-1/2 flex-col items-center gap-3" aria-hidden="true">
              <svg viewBox="0 0 12 14" fill="none" stroke="#7e9486" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-2.5">
                <path d="M6 1v11M2 8.5 6 12l4-3.5" />
              </svg>
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-[#7e9486]"
                style={{ writingMode: "vertical-rl" }}
              >
                Scroll
              </span>
            </div>
          </div>

          {/* Mobile fallback: same cards without the 3D tilt */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            {projects.map((p) => (
              <div key={p.name} className="hero-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.sub}`}
                  loading="lazy"
                  className="hero-card-img"
                />
                <div className="hero-card-meta">
                  <p className="text-[13px] font-semibold leading-none">{p.name}</p>
                  <p className="mt-1.5 text-[11px] leading-none text-[#8fa89a]">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
