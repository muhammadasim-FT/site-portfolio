"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* two FAQ groups — the left rail swaps its copy as you scroll between them */
const groups = [
  {
    label: "General FAQs",
    blurb: "Everything you need to know about working with me. Can't find your answer? Just ask directly.",
    items: [
      {
        q: "What kind of projects do you take on?",
        a: "Mostly product work: SaaS dashboards, marketing sites, and cross-platform app builds. React/Next.js on the front, Node or Bun behind, with the polish that makes it feel finished.",
      },
      {
        q: "What does your process look like?",
        a: "A short discovery call, then a scoped proposal with milestones. You get a staging link from week one and see every commit. No black-box months.",
      },
      {
        q: "How long does a typical project take?",
        a: "Landing pages ship in 1–2 weeks; full products usually run 4–8 weeks depending on scope. You'll get a realistic timeline before we start, and I keep it.",
      },
      {
        q: "Can you work with my existing codebase?",
        a: "Yes: audits, refactors and feature work on live Next.js, React Native and Node projects. I read before I write, and I leave the campsite cleaner than I found it.",
      },
      {
        q: "What do you need from me to start?",
        a: "A rough brief or even a voice note, access to what already exists, and one decision-maker for feedback. I handle the rest.",
      },
      {
        q: "Do you offer support after launch?",
        a: "Every build includes 30 days of free fixes. After that, a light monthly retainer covers updates, monitoring and small features.",
      },
    ],
  },
  {
    label: "Billing FAQs",
    blurb: "How pricing, payments and scope changes work. Nothing hidden in the fine print.",
    items: [
      {
        q: "How do you price projects?",
        a: "Fixed price per milestone, quoted after the discovery call. You always know the number before work starts. No hourly meter running in the background.",
      },
      {
        q: "Do you take an upfront payment?",
        a: "Yes: a 40% deposit books the slot, and the rest is split across milestones. Work on your project starts the day the deposit lands.",
      },
      {
        q: "What if the scope changes midway?",
        a: "Small pivots fold in for free. Bigger ones become a short change-order with a new quote — and you approve it before anything shifts.",
      },
      {
        q: "What is your cancellation policy?",
        a: "You can stop anytime. You pay only for the milestones already delivered, and you keep every file, repo and asset produced so far.",
      },
      {
        q: "How do payments work?",
        a: "One invoice per milestone by card, bank transfer or Wise. Net-7 terms, receipts included, and you're never billed for a month you didn't approve.",
      },
      {
        q: "Can I pause a project?",
        a: "Yes: a slot can be frozen for up to 30 days and resumed with priority. Beyond that, the slot is freed and offered to the next project.",
      },
    ],
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".faq-panel");

      if (reduce) {
        /* static page: first panel only, everything visible */
        gsap.set(panels.slice(1), { display: "none" });
        return;
      }

      /* left rail: later panels queued off, crossfaded by scroll */
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 14 });
      let activePanel = 0;
      const swapTo = (gi: number) => {
        if (gi === activePanel) return;
        const from = panels[activePanel];
        activePanel = gi;
        gsap.to(from, {
          autoAlpha: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.fromTo(
          panels[gi],
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.1,
            overwrite: "auto",
          }
        );
      };

      /* right rail: questions + dividers arrive with the group */
      gsap.utils.toArray<HTMLElement>(".faq-group").forEach((groupEl, gi) => {
        /* the group owns matching viewport space — its zone drives the swap */
        ScrollTrigger.create({
          trigger: groupEl,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) swapTo(gi);
          },
        });

        gsap.fromTo(
          groupEl.querySelectorAll(".faq-item"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: groupEl, start: "top 82%" },
          }
        );
        gsap.fromTo(
          groupEl.querySelectorAll(".faq-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.out",
            transformOrigin: "left center",
            stagger: 0.07,
            scrollTrigger: { trigger: groupEl, start: "top 82%" },
          }
        );
      });

      /* closing band */
      gsap.fromTo(
        ".faq-cta",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-cta", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* accordion: GSAP height tween, icon rotates + into × */
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const panel = btn.nextElementSibling as HTMLElement | null;
    const icon = btn.querySelector(".faq-icon");
    const open = btn.dataset.open === "1";

    if (open) {
      btn.dataset.open = "0";
      btn.setAttribute("aria-expanded", "false");
      gsap.to(panel, { height: 0, duration: 0.4, ease: "power3.inOut" });
      gsap.to(icon, { rotate: 0, duration: 0.4, ease: "power3.out" });
    } else {
      btn.dataset.open = "1";
      btn.setAttribute("aria-expanded", "true");
      gsap.to(panel, { height: "auto", duration: 0.5, ease: "power3.inOut" });
      gsap.to(icon, { rotate: 45, duration: 0.4, ease: "power3.out" });
    }
  };

  return (
    <section ref={sectionRef} className="section">
      <div className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-20">
            {/* sticky left rail — the copy swaps per group */}
            <aside className="self-start lg:sticky lg:top-28">
              <div className="grid">
                {groups.map((group, i) => (
                  <div
                    key={group.label}
                    className="faq-panel [grid-area:1/1]"
                    style={i > 0 ? { visibility: "hidden" } : undefined}
                  >
                    <h2
                      className="text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-primary"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {group.label}
                    </h2>
                    <p className="mt-3 max-w-[300px] text-[13.5px] leading-relaxed text-neutral-500">
                      {group.blurb.split("Just ask directly.")[0]}
                      <a
                        href="#booking-section"
                        className="font-medium text-primary underline decoration-secondary decoration-2 underline-offset-4 hover:text-secondary"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        just ask directly
                      </a>
                      .
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            {/* right rail — accordion groups */}
            <div>
              {groups.map((group, gi) => (
                <div
                  key={group.label}
                  className={`faq-group${gi > 0 ? " mt-16 lg:mt-24" : ""}`}
                >
                  <ul>
                    {group.items.map((item) => (
                      <li
                        key={item.q}
                        className="faq-item group"
                      >
                        <button
                          type="button"
                          onClick={toggle}
                          aria-expanded="false"
                          data-open="0"
                          className="flex w-full cursor-pointer items-center gap-6 py-5 text-left"
                        >
                          <span
                            className="flex-1 text-[15px] font-semibold text-primary transition-colors duration-300 group-hover:text-neutral-700"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {item.q}
                          </span>
                          <span className="faq-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/[0.14] transition-[background-color] duration-300 group-hover:bg-secondary">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              className="h-3.5 w-3.5 text-primary"
                              aria-hidden="true"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </span>
                        </button>
                        <div className="overflow-hidden" style={{ height: 0 }}>
                          <p className="max-w-xl pb-5 pr-12 text-[13.5px] leading-relaxed text-neutral-500">
                            {item.a}
                          </p>
                        </div>
                        <div
                          className="faq-line h-px bg-black/[0.07] transition-colors duration-300 group-hover:bg-secondary/50" // taste-skill-ignore: FAQ row dividers are the reference design's separators, not decoration
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* closing band — "Still have questions?" */}
          <div className="faq-cta mt-16 rounded-3xl bg-[#0b140f] px-7 py-12 sm:px-12 lg:mt-24 lg:px-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2
                  className="text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.02em] text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Still have questions?
                </h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#9db4a6]">
                  Tell me about your idea and I&apos;ll come back with a plan,
                  a timeline and a number, usually within a day.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#booking-section"
                    className="rounded-full bg-secondary px-6 py-3 text-[13px] font-semibold text-primary transition-[translate,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Book a call
                  </a>
                  <a
                    href="#projects-section"
                    className="rounded-full px-6 py-3 text-[13px] font-medium text-[#9db4a6] transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    See recent work
                  </a>
                </div>
              </div>

              {/* live availability card */}
              <div className="w-full max-w-xs justify-self-start rounded-2xl bg-white/[0.04] p-6 lg:justify-self-end">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8ba356]">
                  Next opening
                </p>
                <p
                  className="mt-2 text-[22px] font-semibold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  December 2026
                </p>
                <div className="mt-4 space-y-2 text-[12.5px] text-[#9db4a6]">
                  <p className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    2 project slots left
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3a5343]" aria-hidden="true" />
                    Replies within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
