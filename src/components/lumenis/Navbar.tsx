import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container">
        <div className="navbar flex items-center justify-between py-5">
          {/* Brand */}
          <a href="/" className="brand flex items-center gap-2" aria-label="Mehfil home">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              M
            </span>
            <span className="text-sm font-semibold tracking-tight text-black">Mehfil</span>
          </a>

          {/* Nav links */}
          <nav role="navigation" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.label} className="nav-link-wrapper">
                  <a
                    href={link.href}
                    className="nav-link text-sm font-medium text-black transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </a>
                  <div className="nav-line" />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
