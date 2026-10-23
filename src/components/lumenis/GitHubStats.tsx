"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* magnetic bubble field: how far the effect reaches, as a multiple of cell pitch */
const MAGNET_RADIUS = 3.4;
/* how hard the pointer blob swells the nearest dots */
const MAGNET_BOOST = 0.85;
/* how far neighbors get shoved away, as a multiple of cell pitch */
const MAGNET_PUSH = 0.55;

type DotHandle = {
  x: gsap.QuickToFunc;
  y: gsap.QuickToFunc;
  s: gsap.QuickToFunc;
};


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

  /* interaction refs */
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const graphBoxRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const tipChipRef = useRef<HTMLDivElement>(null);
  const tipLevelRef = useRef<HTMLSpanElement>(null);
  const tipCountRef = useRef<HTMLSpanElement>(null);
  const tipDateRef = useRef<HTMLSpanElement>(null);
  const revealDoneRef = useRef(false);

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
          clearProps: "transform",
          onComplete: () => {
            /* only then does the magnetic field switch on */
            revealDoneRef.current = true;
          },
          scrollTrigger: { trigger: ".gh-graph", start: "top 92%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [grid]);

  /* -------- magnetic bubble field + designed cursor tooltip -------- */
  useEffect(() => {
    if (!grid) return;
    const box = graphBoxRef.current;
    const tip = tipRef.current;
    if (!box || !tip) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cols = grid.weeks.length;
    let activeKeys = new Set<string>();
    let activeCell = "";
    const magnets = new Map<string, DotHandle>();

    const measure = () => {
      const r = box.getBoundingClientRect();
      const gap = window.innerWidth >= 640 ? 3 : 2;
      const size = (r.width - gap * (cols - 1)) / cols;
      return { r, gap, size, pitch: size + gap };
    };

    const dotAt = (ci: number, ri: number) =>
      ci >= 0 && ci < cols && ri >= 0 && ri < 7 ? dotRefs.current[ci * 7 + ri] : null;

    const handle = (el: HTMLSpanElement): DotHandle => {
      let h = magnets.get(el.dataset.key ?? "");
      if (!h) {
        h = {
          x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
          s: gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" }),
        };
        magnets.set(el.dataset.key ?? "", h);
      }
      return h;
    };

    const release = (el: HTMLSpanElement) => {
      const h = handle(el);
      h.x(0);
      h.y(0);
      h.s(1);
    };

    const magnetize = (clientX: number, clientY: number) => {
      const { r, size, pitch } = measure();
      const col = Math.min(Math.max(Math.floor((clientX - r.left) / pitch), 0), cols - 1);
      const row = Math.min(Math.max(Math.floor((clientY - r.top) / pitch), 0), 6);

      const touched = new Set<string>();
      const reach = Math.ceil(MAGNET_RADIUS);

      for (let ci = col - reach; ci <= col + reach; ci++) {
        for (let ri = 0; ri < 7; ri++) {
          const el = dotAt(ci, ri);
          if (!el) continue;
          const cx = r.left + ci * pitch + size / 2;
          const cy = r.top + ri * pitch + size / 2;
          const d = Math.hypot(clientX - cx, clientY - cy);
          const fall = Math.max(0, 1 - d / (pitch * MAGNET_RADIUS));
          if (fall <= 0) continue;

          /* the closer the dot, the bigger it swells and the harder
             it is shoved away from the pointer */
          const push = fall * fall * pitch * MAGNET_PUSH;
          const minD = Math.max(d, size * 0.6);
          const dx = ((cx - clientX) / minD) * push;
          const dy = ((cy - clientY) / minD) * push;
          const scale = 1 + fall * fall * MAGNET_BOOST;

          const h = handle(el);
          h.x(dx);
          h.y(dy);
          h.s(scale);
          touched.add(el.dataset.key ?? "");
        }
      }

      /* anything no longer touched springs home */
      for (const key of activeKeys) {
        if (!touched.has(key)) {
          const el = dotRefs.current[Number(key)];
          if (el) release(el);
        }
      }
      activeKeys = touched;
    };

    const relax = () => {
      for (const key of activeKeys) {
        const el = dotRefs.current[Number(key)];
        if (el) release(el);
      }
      activeKeys = new Set();
    };

    const showTip = (cell: Cell) => {
      if (tipLevelRef.current) tipLevelRef.current.style.backgroundColor = LEVEL_COLORS[Math.max(cell.level, 0)];
      if (tipCountRef.current) {
        tipCountRef.current.textContent = `${cell.count} ${cell.count === 1 ? "contribution" : "contributions"}`;
      }
      if (tipDateRef.current && cell.date) {
        tipDateRef.current.textContent = new Date(`${cell.date}T00:00:00Z`).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }
        );
      }
      const firstShow = tip.style.opacity === "0" || !tip.style.opacity;
      gsap.to(tip, { autoAlpha: 1, duration: reduce ? 0 : 0.25, overwrite: "auto" });
      if (firstShow && tipChipRef.current && !reduce) {
        gsap.fromTo(
          tipChipRef.current,
          { scale: 0.7 },
          { scale: 1, duration: 0.45, ease: "back.out(3)", transformOrigin: "left bottom" }
        );
      }
    };

    const hideTip = () => {
      gsap.to(tip, { autoAlpha: 0, duration: reduce ? 0 : 0.2, overwrite: "auto" });
      activeCell = "";
    };

    let tipX: gsap.QuickToFunc | null = null;
    let tipY: gsap.QuickToFunc | null = null;
    if (tip && !reduce) {
      tipX = gsap.quickTo(tip, "x", { duration: 0.35, ease: "power3.out" });
      tipY = gsap.quickTo(tip, "y", { duration: 0.35, ease: "power3.out" });
    }

    const tipShowAt = (cell: Cell, clientX: number, clientY: number) => {
      const key = cell.date ?? "";
      if (key !== activeCell) {
        activeCell = key;
        showTip(cell);
      }
      if (tipX && tipY) {
        tipX(clientX);
        tipY(clientY);
      } else {
        gsap.set(tip, { x: clientX, y: clientY });
      }
    };

    const onMove = (e: PointerEvent) => {
      const { r, pitch } = measure();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) {
        hideTip();
        relax();
        return;
      }

      const col = Math.min(Math.max(Math.floor((e.clientX - r.left) / pitch), 0), cols - 1);
      const row = Math.min(Math.max(Math.floor((e.clientY - r.top) / pitch), 0), 6);
      const cell = grid.weeks[col]?.[row];

      if (cell && cell.date !== null) {
        tipShowAt(cell, e.clientX, e.clientY);
      } else {
        hideTip();
      }

      if (
        !reduce &&
        window.matchMedia("(pointer: fine)").matches &&
        revealDoneRef.current
      ) {
        magnetize(e.clientX, e.clientY);
      }
    };

    const onLeave = () => {
      hideTip();
      relax();
    };
    const onScroll = () => hideTip();

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      magnets.forEach((_, key) => {
        const el = dotRefs.current[Number(key)];
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, { clearProps: "transform" });
        }
      });
      if (tip) gsap.killTweensOf(tip);
    };
  }, [grid]);

  /* no data → the band simply doesn't render */
  if (!grid) return null;

  const columns = `repeat(${grid.weeks.length}, minmax(0, 1fr))`;
  const today = new Date().toISOString().slice(0, 10);

  /* fine pointers get the magnetic field; coarse pointers keep a plain hover */
  const isRender = typeof window !== "undefined";
  const pointerFine = isRender && window.matchMedia("(pointer: fine)").matches;

  return (
    <section ref={sectionRef} className="section">
      <div className="container section-spacing">
        <div className="gh-graph relative" ref={graphBoxRef}>
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
                    ref={(element) => {
                      dotRefs.current[ci * 7 + ri] = element;
                    }}
                    data-key={ci * 7 + ri}
                    className={`gh-dot block aspect-square w-full rounded-[22%] ${
                      pointerFine ? "" : "transition-transform duration-200 hover:scale-125"
                    } ${cell.date === today ? "gh-today" : ""}`}
                    style={{ backgroundColor: LEVEL_COLORS[Math.max(cell.level, 0)] ?? LEVEL_COLORS[0] }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* cursor tooltip — follows the pointer, never blocks it */}
          <div ref={tipRef} className="pointer-events-none fixed top-0 left-0 z-50 invisible opacity-0">
            <div className="-translate-x-1/2 -translate-y-[135%]">
              <div
                ref={tipChipRef}
                className="flex items-center gap-2 rounded-full bg-[#14261c]/95 py-1.5 pr-3.5 pl-2.5 text-[11px] font-medium whitespace-nowrap text-[#f4f4f1] shadow-[0_8px_24px_rgba(11,20,15,0.25)]" /* taste-skill-ignore: tooltip is a floating overlay — the one element allowed a resting shadow */
              >
                <span ref={tipLevelRef} className="h-2 w-2 shrink-0 rounded-full" />
                <span ref={tipCountRef} className="font-semibold text-secondary" />
                <span ref={tipDateRef} className="text-[#b9c8b6]" />
              </div>
            </div>
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
