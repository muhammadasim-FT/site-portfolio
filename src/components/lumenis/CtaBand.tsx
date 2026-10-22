export default function CtaBand() {
  return (
    <section className="bg-[#0b140f]">
      <div className="fade-in-on-scroll container flex flex-col items-start gap-10 py-16! lg:flex-row lg:items-center lg:gap-16! lg:py-14">
        {/* Giant wordmark */}
        <a
          href="#hero-section"
          aria-label="Back to top"
          className="shrink-0 leading-none text-white transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(56px, 8vw, 104px)", fontWeight: 600, letterSpacing: "-0.06em" }}
        >
          Lumenis
        </a>

        {/* Statement */}
        <p
          className="shrink-0 text-[17px] font-medium leading-snug text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Building digital solutions
          <br />
          for a better tomorrow.
        </p>

        {/* Supporting line */}
        <p className="max-w-[280px] text-[11px] leading-relaxed text-[#9db4a6]">
          I&apos;m always open to discussing new ideas, collaborating on
          opportunities, let&apos;s build something great.
        </p>

        {/* Action */}
        <a
          href="#contact-section"
          className="group ml-auto flex shrink-0 items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:border-[#b8f04d] hover:text-[#b8f04d]"
        >
          Get In Touch
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
