const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://fb.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

const webflowLinks = [
  { label: "Style Guide", href: "/style-guide" },
  { label: "Licensing", href: "/licensing" },
  { label: "Instructions", href: "/instructions" },
  { label: "Change Log", href: "/change-log" },
  { label: "GET TEMPLATE", href: "https://webflow.com/templates" },
];

const socialIcons = [
  // Instagram
  <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>,
  // Twitter/X
  <svg key="tw" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  // Mail
  <svg key="mail" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>,
];

export default function Footer() {
  return (
    <section className="section">
      <div className="footer-holder">
        <div className="footer-container">
          <div className="container">
            <div className="footer-wrapper">
              {/* Newsletter */}
              <div className="footer-signup-holder">
                <p className="title-small">Join our newsletter</p>
                <form
                  className="form mt-4"
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Newsletter signup"
                >
                  <div className="flex gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Email@example.com"
                      className="text-field grey flex-1"
                      aria-label="Email address"
                    />
                    <button type="submit" className="button form-button">
                      Sign up
                    </button>
                  </div>
                </form>

                <div className="social-media-holder mt-6 flex gap-3">
                  {socialIcons.map((icon, i) => (
                    <a
                      key={i}
                      href={socialLinks[i]?.href ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-media-container"
                      aria-label={socialLinks[i]?.label ?? "Social link"}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              <div className="footer-content grid grid-cols-2 gap-8 md:grid-cols-3">
                <div className="footer-block">
                  <p className="title-small">Company</p>
                  {companyLinks.map((l) => (
                    <div key={l.label} className="nav-link-wrapper">
                      <a href={l.href} className="footer-link">
                        {l.label}
                      </a>
                      <div className="nav-line" />
                    </div>
                  ))}
                </div>

                <div className="footer-block">
                  <p className="title-small">Social media</p>
                  {socialLinks.map((l) => (
                    <div key={l.label} className="nav-link-wrapper">
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                        {l.label}
                      </a>
                      <div className="nav-line" />
                    </div>
                  ))}
                </div>

                <div className="footer-block">
                  <p className="title-small">Webflow stuff</p>
                  {webflowLinks.map((l) => (
                    <div key={l.label} className="nav-link-wrapper">
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="footer-link"
                      >
                        {l.label}
                      </a>
                      <div className="nav-line" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-divider">
              <div className="footer-copyright-holder">
                <p className="footer-copyright-center">
                  Created by{" "}
                  <a href="http://madebyoversight.com/" target="_blank" rel="noopener noreferrer" className="dark-link">
                    OVERSIGHT
                  </a>
                </p>
              </div>
              <div className="footer-copyright-holder">
                <p className="footer-copyright-center">
                  Powered by{" "}
                  <a href="https://webflow.com/" target="_blank" rel="noopener noreferrer" className="dark-link">
                    WEBFLOW
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
