"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "#hero-section" },
      { label: "About", href: "#about-section" },
      { label: "Projects", href: "#projects-section" },
      { label: "Gallery", href: "#gallery-section" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Client Reviews", href: "#reviews-section" },
      { label: "Book a Call", href: "#booking-section" },
      { label: "Testimonials", href: "#testimonials-section" },
      { label: "Contact", href: "#contact-section" },
    ],
  },
  {
    title: "Profiles",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/foxlancerr/", external: true },
      { label: "GitHub", href: "https://github.com/foxlancerr", external: true },
      { label: "Twitter (X)", href: "https://x.com/foxlancerr", external: true },
      { label: "Instagram", href: "https://www.instagram.com/foxlancerr/", external: true },
    ],
  },
  {
    title: "Marketplaces",
    links: [
      { label: "Upwork", href: "https://www.upwork.com/freelancers/~01b77693cd51962916", external: true },
      { label: "Fiverr", href: "https://www.fiverr.com/users/foxlancerr/", external: true },
      { label: "Facebook", href: "https://www.facebook.com/foxlancerr", external: true },
      { label: "Threads", href: "https://www.threads.net/@foxlancerr", external: true },
    ],
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-brand-text",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".footer-brand-text", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer-grid", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-section" className="bg-[#fafafa] pt-24 pb-0">
      <div className="container">
        {/* Top grid */}
        <div className="footer-grid grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          {/* Left — newsletter */}
          <div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Stay in the know
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Updates on new projects, engineering blog posts, and availability for collaborations.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="footer-col">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-sm text-neutral-600 transition-colors hover:text-black"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
          <div className="flex items-center gap-4">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              M
            </span>
            <p className="text-xs text-neutral-400">
              &copy;2026. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="#hero-section" className="transition-colors hover:text-black">Privacy</a>
            <a href="#hero-section" className="transition-colors hover:text-black">Terms</a>
            <a href="#hero-section" className="transition-colors hover:text-black">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Giant brand text — cut off at bottom */}

      {/* Oversized footer wordmark */}
      {/* True bottom crop */}
      <div className="relative h-[20vw] w-full overflow-hidden">
        <p
          className="footer-brand-text absolute -left-12 top-0 m-0 p-0 font-heading text-[32vw] font-bold leading-[0.9] tracking-[-0.06em] text-primary whitespace-nowrap"
          aria-hidden="true"
        >
          Lumenis
        </p>
      </div>
    </section>
  );
}
