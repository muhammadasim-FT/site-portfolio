"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* lime ramp of the theme — drawn on the white ground */
const LEVEL_COLORS = [
  "rgba(20,38,28,0.2)", // empty day — a whisper of ink, not a hole
  "#2f431d", // quiet
  "#527a2b",
  "#8fc143",
  "#b8f04d", // your busiest days
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Day = { date: string; count: number; level: number };
type Cell = { level: number; count: number; date: string | null }; // level -1 → leading blank

export default function GitHubStats({ username }: { username: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [grid, setGrid] = useState<{ weeks: Cell[][]; labels: string[]; total: number } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/contributions?u=${username}`);
        if (!res.ok) return;
        const data = (await res.json()) as
          | { total: { lastYear: number }; contributions: Day[] }
          | undefined;
        const days: Day[] = data?.contributions ?? [];
        if (days.length === 0) return;

        /* lay the flat day list out into GitHub-style week columns (Sun → Sat) */
        const weeks: Cell[][] = [];
        const labels: string[] = [];
        let leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
        let week: Cell[] = [];
        let lastMonth = -1;

        while (leading-- > 0) {
          week.push({ level: -1, count: 0, date: null });
        }

        days.forEach((day) => {
          const d = new Date(`${day.date}T00:00:00Z`);
          /* the first week of a month earns its label */
          if (d.getUTCDate() <= 7 && d.getUTCMonth() !== lastMonth) {
            lastMonth = d.getUTCMonth();
            labels[weeks.length] = MONTHS[lastMonth];
          }
          week.push({ level: day.level, count: day.count, date: day.date });
          if (week.length === 7) {
            weeks.push(week);
            week = [];
          }
        });
        /* pad the final partial week so the last column is complete */
        while (week.length < 7 && week.length > 0) {
          week.push({ level: -1, count: 0, date: null });
        }
        if (week.length > 0) weeks.push(week);

        setGrid({ weeks, labels, total: data?.total?.lastYear ?? 0 });
      } catch {
        /* stay out of the way when the graph can't be fetched */
      }
    }
    load();
  }, [username]);

  useEffect(() => {
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gh-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: ".gh-header", start: "top 85%" },
          }
        );
      });

      /* the total counts up once */
      gsap.utils.toArray<HTMLElement>(".gh-count").forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gh-header", start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      /* signature move: the year of dots waves in column by column */
      gsap.fromTo(
        ".gh-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
          stagger: { amount: 0.9 },
          clearProps: "transform", // let CSS hover scaling take back the transform
          scrollTrigger: { trigger: ".gh-graph", start: "top 92%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [grid]);

  /* no data → the band simply doesn't render */
  if (!grid) return null;

  const columns = `repeat(${grid.weeks.length}, minmax(0, 1fr))`;
  const today = new Date().toISOString().slice(0, 10);

  const tooltip = (cell: Cell) =>
    cell.date === null
      ? undefined
      : `${cell.count} ${cell.count === 1 ? "contribution" : "contributions"} on ${new Date(
          `${cell.date}T00:00:00Z`
        ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}`;

  return (
    <section ref={sectionRef} className="section">
      <div className="container section-spacing">
        <div className="gh-graph">
          {/* month labels — same column template, so alignment always holds */}
          <div className="grid gap-[2px] sm:gap-[3px]" style={{ gridTemplateColumns: columns }}>
            {grid.weeks.map((_, ci) => (
              <div
                key={`label-${ci}`}
                className="text-[9.5px] font-medium leading-none text-neutral-400"
              >
                {grid.labels[ci] ?? ""}
              </div>
            ))}
          </div>

          {/* the grid — fluid cells that stretch the full width */}
          <div
            className="mt-1.5 grid gap-[2px] sm:gap-[3px]"
            style={{ gridTemplateColumns: columns }}
          >
            {grid.weeks.map((week, ci) => (
              <div key={`week-${ci}`} className="flex flex-col gap-[2px] sm:gap-[3px]">
                {week.map((cell, ri) => (
                  <span
                    key={`dot-${ci}-${ri}`}
                    className={`gh-dot block aspect-square w-full rounded-[22%] transition-transform duration-200 hover:scale-125 ${
                      cell.level === -1 ? "cursor-default" : ""
                    } ${cell.date === today ? "gh-today" : ""}`}
                    style={{ backgroundColor: LEVEL_COLORS[Math.max(cell.level, 0)] ?? LEVEL_COLORS[0] }}
                    title={tooltip(cell)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* legend + caption */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-[10px] text-neutral-400">Last 12 months · updated daily</p>
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              Less
              {LEVEL_COLORS.map((c, i) => (
                <span key={i} className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: c }} />
              ))}
              More
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
