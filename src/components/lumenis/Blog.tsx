"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* one wide featured card + two lime blob cards, per the reference.
   cover image reuses a gallery asset until a real blog cover exists;
   wire real post URLs on the Read More anchors */
const posts = [
  {
    title: "Shipping AI features that survive production",
    desc: "What actually made it to users in three AI builds, and what looked great in the demo but died on the way there.",
    image: "/assets/images/gallery/aihub.jpg",
    wide: true,
  },
  {
    title: "State management without the abstractions",
    wide: false,
  },
  {
    title: "Performance budgets for marketing sites",
    wide: false,
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* header rises in */
      gsap.utils.toArray<HTMLElement>(".blog-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            delay: i * 0.09,
            scrollTrigger: { trigger: ".blog-head", start: "top 85%" },
          }
        );
      });

      /* cards deal in from below */
      gsap.fromTo(
        ".blog-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".blog-grid", start: "top 88%" },
        }
      );

      /* the featured cover drifts against the scroll — GSAP owns the
         wrapper, CSS owns the img hover scale, so the two never collide */
      gsap.utils.toArray<HTMLElement>(".blog-imgwrap").forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.closest(".blog-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      /* the lime watermarks breathe with the scroll */
      gsap.utils.toArray<HTMLElement>(".blog-blob").forEach((blob, i) => {
        gsap.fromTo(
          blob,
          { yPercent: i % 2 === 0 ? -10 : -4 },
          {
            yPercent: i % 2 === 0 ? 10 : 4,
            ease: "none",
            scrollTrigger: {
              trigger: blob.closest(".blog-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog-section" ref={sectionRef} className="section">
      <div className="section-spacing">
        <div className="container">
          {/* header */}
          <div className="blog-head flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="blog-fade flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-[#8ba356]">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[#8ba356]" aria-hidden="true" />
                The Blog
              </p>
              <h2
                className="blog-fade mt-3 text-[clamp(27px,3.2vw,44px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ship notes
                <br />
                for{" "}
                <span className="text-secondary">the build-obsessed</span>
              </h2>
            </div>

            {/* read-all like the reference's top-right link */}
            <a
              href="#contact-section"
              className="blog-fade group inline-flex items-center gap-3 pb-1.5"
              aria-label="Read all posts"
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors duration-300 group-hover:text-neutral-600"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Read all posts
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-500 group-hover:rotate-45">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </div>

          {/* card row — one wide + two lime blob cards */}
          <div className="blog-grid mt-10 grid gap-5 lg:grid-cols-[1.7fr_1fr_1fr]">
            {/* featured */}
            <article className="blog-card group flex flex-col rounded-[24px] bg-[#eef0ea] transition-[translate] duration-500 hover:-translate-y-1.5 sm:grid sm:grid-cols-2 sm:overflow-hidden">
              <div className="flex flex-col p-6 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    AI
                  </span>
                  <span
                    className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Production
                  </span>
                </div>
                <h3
                  className="mt-4 text-[21px] font-semibold leading-snug tracking-[-0.01em] text-primary"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {posts[0].title}
                </h3>
                <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-neutral-500">
                  {posts[0].desc}
                </p>
                <a
                  href="#contact-section"
                  className="mt-auto inline-flex items-center gap-3 pt-6 text-[12.5px] font-semibold text-primary transition-colors duration-300 hover:text-neutral-700"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Read more
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              </div>

              <div className="mt-5 mr-5 mb-5 sm:mt-4 sm:mr-4 sm:mb-4 lg:mt-5 lg:mr-5 lg:mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="blog-imgwrap h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posts[0].image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full scale-[1.08] object-cover transition-transform duration-700 group-hover:scale-[1.16]"
                  />
                </div>
              </div>
            </article>

            {/* lime blob cards */}
            {posts.slice(1).map((post, i) => (
              <article
                key={post.title}
                className="blog-card group relative flex min-h-[280px] flex-col overflow-hidden rounded-[24px] bg-[#e6efcf] p-6 transition-[translate] duration-500 hover:-translate-y-1.5"
              >
                {/* watermark circles */}
                <span
                  className={`blog-blob pointer-events-none absolute -top-12 ${i === 0 ? "-right-14" : "-left-16"} h-48 w-48 rounded-full bg-secondary/25`}
                  aria-hidden="true"
                />
                <span
                  className={`blog-blob pointer-events-none absolute -bottom-20 ${i === 0 ? "-left-16" : "-right-20"} h-64 w-64 rounded-full bg-secondary/20`}
                  aria-hidden="true"
                />

                <h3
                  className="relative text-[19px] font-semibold leading-snug tracking-[-0.01em] text-primary"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {post.title}
                </h3>

                <a
                  href="#contact-section"
                  className="relative mt-auto inline-flex items-center gap-3 pt-6 text-[12.5px] font-semibold text-primary transition-colors duration-300 hover:text-neutral-700"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Read more
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
