"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* each row of the reference — numbered categories, chip pills */
const groups = [
  {
    num: "01", // taste-skill-ignore: numbered stack categories are the reference mockup's design; real ordered sequence
    title: "Language",
    tools: ["TypeScript", "JavaScript", "Python"],
  },
  {
    num: "02", // taste-skill-ignore
    title: "Frontend",
    tools: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Base UI",
      "Motion",
      "Expo",
      "TanStack",
      "MobX-State-Tree",
    ],
  },
  {
    num: "03", // taste-skill-ignore
    title: "Backend & Database",
    tools: ["Node.js", "Bun", "PostgreSQL", "MongoDB", "Redis", "nginx"],
  },
  {
    num: "04", // taste-skill-ignore
    title: "Workflow & AI",
    tools: ["Claude", "Cursor", "Gemini", "ChatGPT", "Git", "GitHub", "Docker", "Vercel"],
  },
  {
    num: "05", // taste-skill-ignore
    title: "Analytics",
    tools: ["OpenPanel", "PostHog"],
  },
  {
    num: "06", // taste-skill-ignore
    title: "Design",
    tools: ["Figma", "Paper", "Photoshop"],
  },
];

/* simple-icons slugs for the CDN logos (undefined → text-only chip) */
const SLUGS: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  React: "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  "shadcn/ui": "shadcnui",
  "Radix UI": "radixui",
  "Base UI": "baseui",
  Motion: "motion",
  Expo: "expo",
  TanStack: "tanstack",
  "MobX-State-Tree": "mobxstatetree",
  "Node.js": "nodedotjs",
  Bun: "bun",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Redis: "redis",
  nginx: "nginx",
  Claude: "claude",
  Cursor: "cursor",
  Gemini: "googlegemini",
  ChatGPT: "openai",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  Vercel: "vercel",
  OpenPanel: "openpanel",
  PostHog: "posthog",
  Figma: "figma",
  Paper: "paper",
  Photoshop: "adobephotoshop",
};

const ICON_TINT = "%23b8f04d";

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* header rises first */
      gsap.utils.toArray<HTMLElement>(".stack-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: ".stack-header", start: "top 85%" },
          }
        );
      });

      /* the tool count ticks up with the header */
      gsap.utils.toArray<HTMLElement>(".stack-count").forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stack-header", start: "top 80%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      /* signature: scroll itself is the progress bar — and it self-calibrates.
         each row is measured, and owns roughly the slice of scroll it takes
         to scroll past it: wake (brighten, step forward, number ignites) →
         chips fill lime one by one → recede lit, hand the head down.
         the window runs from first sight to the section leaving, so the last
         row lands as the section completes its pass — no rows left queued
         when the bottom arrives. scrub 0.9 makes the pass feel slow+gliding.
         GSAP owns transform on the chips; hover lift is CSS `translate` —
         the two never fight over the same property. */
      const rows = gsap.utils.toArray<HTMLElement>(".stack-row");
      gsap.set(rows, { opacity: 0.5 });
      /* queued chips read as text-only; logos fade in pre-inked at ignition
         (full filter lists on both ends so GSAP can interpolate) */
      rows.forEach((row) => {
        gsap.set(row.querySelectorAll(".stack-chip img"), {
          opacity: 0,
          filter: "brightness(100%) saturate(100%)",
        });
      });

      const list = rows[0]?.parentElement;
      if (list) {
        /* measured px heights = each row's scroll slice */
        const rowPx = rows.map((row) => row.offsetHeight);

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: list,
            start: "top 65%",
            end: "bottom 25%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        let t = 0;
        rows.forEach((row, i) => {
          const h = rowPx[i]; /* px of scroll this row's pass owns */
          const chips = row.querySelectorAll(".stack-chip");
          const icons = row.querySelectorAll(".stack-chip img");
          const num = row.querySelector(".stack-num");
          const stagger = Math.min(
            h * 0.05,
            (h * 0.34) / Math.max(chips.length - 1, 1)
          );

          /* the row wakes: brightens and steps forward */
          tl.to(row, { opacity: 1, x: 10, duration: h * 0.22 }, t);
          if (num) tl.to(num, { color: "#b8f04d", duration: h * 0.22 }, t);

          /* chips ignite one by one — pop, lime fill, inked logos */
          tl.fromTo(
            chips,
            { scale: 0.84 },
            {
              scale: 1,
              duration: h * 0.3,
              stagger,
              immediateRender: false,
            },
            t + h * 0.08
          );
          tl.to(
            chips,
            {
              backgroundColor: "#b8f04d",
              color: "#14261c",
              duration: h * 0.25,
              stagger,
            },
            t + h * 0.15
          );
          tl.to(
            icons,
            {
              opacity: 1,
              filter: "brightness(0.08) saturate(0%)",
              duration: h * 0.25,
              stagger,
            },
            t + h * 0.15
          );

          /* the head recedes and hands the light to the next row */
          tl.to(row, { opacity: 0.9, x: 0, duration: h * 0.22 }, t + h * 0.75);

          t += h;
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-primary">
      <div className="section-spacing">
        <div className="container">
          {/* header */}
          <div className="stack-header">
            <p className="stack-fade text-[11.5px] uppercase tracking-[0.18em] text-[#8ba356]">
              Toolset
            </p>
            <h2
              className="stack-fade mt-2 text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Stack
            </h2>
            <p className="stack-fade mt-2 max-w-md text-[14px] leading-relaxed text-[#9db4a6]">
              The daily drivers behind every build —{" "}
              <span
                className="stack-count font-semibold text-white"
                data-target={groups.reduce((n, g) => n + g.tools.length, 0)}
              >
                {groups.reduce((n, g) => n + g.tools.length, 0)}
              </span>{" "}
              tools across six disciplines.
            </p>
          </div>

          {/* rows */}
          <ol className="mt-8">
            {groups.map((group) => (
              <li
                key={group.num}
                className="stack-row grid items-start gap-4 py-4 sm:grid-cols-[250px_1fr]"
              >
                <div className="flex items-center gap-4">
                  <span className="stack-num pt-0.5 text-[12px] font-semibold tracking-[0.08em] text-[#9db4a6]">
                    {group.num}
                  </span>
                  <h3
                    className="pt-0.5 text-[14.5px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="stack-chip inline-flex items-center gap-2 rounded-full bg-secondary/[0.14] px-3.5 py-2 text-[12.5px] font-medium text-[#e2ead9] transition-[translate] duration-300 hover:-translate-y-0.5"
                    >
                      {SLUGS[tool] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`https://cdn.simpleicons.org/${SLUGS[tool]}/${ICON_TINT}`}
                          alt=""
                          loading="lazy"
                          width="14"
                          height="14"
                          className="shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      {tool}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
