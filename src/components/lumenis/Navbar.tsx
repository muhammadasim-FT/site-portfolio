const links = [
  { label: "Home", href: "#hero-section", active: true },
  { label: "Work", href: "#projects-section" },
  { label: "About", href: "#about-section" },
  { label: "Services", href: "#services-section" },
  { label: "Contact", href: "#booking-section" },
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="navbar flex items-center justify-between rounded-b-2xl px-2 py-4">
          {/* Brand */}
          <a href="#hero-section" className="brand text-white" aria-label="Lumenis home">
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Lumenis
            </span>
          </a>

          {/* Nav links */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:block">
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
            {/* compass */}
            <a
              href="#about-section"
              aria-label="About"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-secondary hover:text-secondary lg:flex"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M15.5 8.5 13.4 13.4 8.5 15.5l2.1-4.9 4.9-2.1z" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href="#booking-section"
              className="nav-cta flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[13px] font-semibold text-[#0b140f] transition-colors hover:bg-[#e8f4e4]"
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
          </div>
        </div>
      </div>
    </div>
  );
}
