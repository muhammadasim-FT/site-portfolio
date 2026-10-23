"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#hero-section", active: true },
  { label: "Work", href: "#projects-section" },
  { label: "About", href: "#about-section" },
  { label: "Services", href: "#services-section" },
  { label: "Contact", href: "#booking-section" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /* lock the page while the menu is open, restore on close/unmount */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* close on Escape for keyboard users */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="navbar flex flex-col rounded-b-2xl px-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Top row: brand + right cluster */}
          <div className="flex w-full items-center justify-between sm:w-full sm:justify-between sm:gap-4">
            {/* Brand */}
            <a
              href="#hero-section"
              className="brand text-white"
              aria-label="Lumenis home"
              onClick={() => setOpen(false)}
            >
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Lumenis
              </span>
            </a>

            {/* Nav links (desktop) */}
            <nav
              role="navigation"
              aria-label="Main navigation"
              className="hidden md:block"
            >
              <ul className="flex items-center gap-7">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`nav-link text-[13px] transition-colors hover:text-secondary ${
                        link.active ? "font-semibold text-secondary" : "text-[#c7d8cd]"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`mt-1 block h-[2px] w-full rounded-full ${link.active ? "bg-secondary" : "bg-transparent"}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-4">
              <a
                href="#booking-section"
                className="nav-cta hidden items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[13px] font-semibold text-[#0b140f] transition-colors hover:bg-[#e8f4e4] sm:flex"
              >
                Get In Touch
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 text-[#0b140f]"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="nav-mobile-button md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile panel */}
          <nav
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className={`nav-mobile-panel md:hidden ${open ? "open" : ""}`}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-mobile-link ${link.active ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 opacity-60"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            ))}

            {/* CTA inside the panel */}
            <a
              href="#booking-section"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[#0b140f]"
            >
              Get In Touch
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-[#0b140f]"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
