"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { stat: "99.9%", label: "Uptime across deployed production systems" },
  { stat: "50+", label: "APIs designed and shipped to production" },
  { stat: "4.9", label: "Average code review rating from collaborators" },
  { stat: "12x", label: "Query performance improved after optimization" },
  { stat: "-68%", label: "Reduction in infrastructure costs after migration" },
  { stat: "850K", label: "Requests processed daily at peak load" },
  { stat: "14 days", label: "From idea to first production deployment" },
];

export default function Benchmark() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".benchmark-item");

      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveIndex(i);
            animateStat(metrics[i].stat);
          },
          onEnterBack: () => {
            setActiveIndex(i);
            animateStat(metrics[i].stat);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateStat = useCallback((newStat: string) => {
    if (!statRef.current) return;
    const el = statRef.current;
    gsap.to(el, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        el.textContent = newStat;
        gsap.to(el, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="section bg-[#f4f4f2]">
      <div className="section-spacing">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left — sticky stat */}
            <div className="lg:sticky lg:top-32 self-start">
              <p className="paragraph-title text-neutral-400">Up to</p>
              <div className="mt-2 flex items-start overflow-hidden">
                <span
                  ref={statRef}
                  className="font-heading text-[clamp(72px,10vw,140px)] font-bold leading-none tracking-tight text-primary"
                >
                  12x
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
                Faster delivery than traditional development workflows, without
                compromising on code quality or system reliability.
              </p>
            </div>

            {/* Right — scrolling list */}
            <div className="flex flex-col">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`benchmark-item border-b border-[#e0e0de] py-10 lg:py-12 transition-opacity duration-500 ${
                    i === activeIndex
                      ? "opacity-100"
                      : "opacity-35"
                  }`}
                >
                  <p
                    className={`font-heading text-[clamp(20px,2.5vw,28px)] font-semibold tracking-tight transition-colors duration-500 ${
                      i === activeIndex ? "text-black" : "text-neutral-400"
                    }`}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}