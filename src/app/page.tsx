"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/lumenis/Navbar";
import Hero from "@/components/lumenis/Hero";
import About from "@/components/lumenis/About";
import Projects from "@/components/lumenis/Projects";
import MomentsGallery from "@/components/lumenis/MomentsGallery";
import Services from "@/components/lumenis/Services";
import WhyWorkWithMe from "@/components/lumenis/WhyWorkWithMe";
import Faq from "@/components/lumenis/Faq";
import Benchmark from "@/components/lumenis/Benchmark";
import ClientReviews from "@/components/lumenis/ClientReviews";
import HowIWork from "@/components/lumenis/HowIWork";
import Stack from "@/components/lumenis/Stack";
import BookingCalendar from "@/components/lumenis/BookingCalendar";
import CtaBand from "@/components/lumenis/CtaBand";
import Testimonials from "@/components/lumenis/Testimonials";
import Footer from "@/components/lumenis/Footer";
import KineticTypography from "@/components/lumenis/KineticTypography";
import GitHubStats from "@/components/lumenis/GitHubStats";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lenis smooth scroll
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (reduce) {
      gsap.set(".logo-hero-text, .animate-on-load, .fade-in-on-scroll, .partner, .split-word", {
        clearProps: "all",
        opacity: 1,
        y: 0,
      });
      return () => lenis.destroy();
    }

    /* did this browser already see the kinetic intro this session? */
    let introPlayed = false;
    try {
      introPlayed = sessionStorage.getItem("lumenis-intro") === "1";
    } catch {
      introPlayed = false;
    }
    const stageIntro = !introPlayed;

    /* the intro lifts the curtain, then the hero lands */
    const onIntroDone = () => {
      gsap.fromTo(
        ".navbar",
        { y: "-100%" },
        { y: 0, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".navbar",
        { backgroundColor: "rgba(11,20,15,0)" },
        { backgroundColor: "rgba(11,20,15,0.95)", duration: 0.5 }
      );
      gsap.fromTo(
        ".nav-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, delay: 0.2, stagger: 0.1 }
      );
      gsap.fromTo(
        ".animate-on-load",
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: "power3.out" }
      );
      ScrollTrigger.refresh();
    };

    if (stageIntro) {
      window.addEventListener("kinetic:done", onIntroDone, { once: true });
    }

    const ctx = gsap.context(() => {
      /* ---------- intro timeline ---------- */
      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          gsap.set(".intro-fade, .intro-reveal, .intro-wipe, .intro-cover, .intro-cover-pair", {
            display: "none",
          });
        },
      });

      intro.fromTo(
        ".intro-reveal",
        { width: "0%" },
        { width: "100%", duration: 1.21, ease: "power4.inOut" },
        0.3
      );

      intro.fromTo(".intro-wipe", { height: "100%" }, { height: "0px", duration: 0.5 }, 1.5);

      intro.fromTo(
        ".intro-cover",
        { width: "100%", height: "100%" },
        { width: "45%", height: "55%", duration: 0.8, ease: "power3.out" },
        3.06
      );

      intro.fromTo(
        ".intro-cover-pair",
        { x: "104%", y: "104%" },
        { x: "45%", y: "55%", duration: 0.8, ease: "power3.out" },
        2.4
      );

      intro.to(".intro-fade", { opacity: 0, duration: 0.5 }, 1.5);

      /* ---------- animate-on-load (replayed after the intro on first visit) ---------- */
      if (!stageIntro) {
        gsap.fromTo(
          ".animate-on-load",
          { y: 65, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
            stagger: 0.35,
          }
        );

        /* ---------- navbar ---------- */
        gsap.fromTo(".navbar", { y: "-100%" }, { y: 0, duration: 0.5, delay: 0.94 });
        gsap.fromTo(
          ".navbar",
          { backgroundColor: "rgba(11,20,15,0)" },
          { backgroundColor: "rgba(11,20,15,0.95)", duration: 0.5, delay: 0.94 }
        );
        gsap.fromTo(
          ".nav-link",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, delay: 1.16, stagger: 0.2 }
        );
      }

      /* ---------- scroll reveals ---------- */
      gsap.utils.toArray<HTMLElement>(".fade-in-on-scroll").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      /* ---------- partners ---------- */
      gsap.fromTo(
        ".partner",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.5,
          scrollTrigger: { trigger: ".partner-grid", start: "top 80%" },
        }
      );

      /* ---------- split text scrub ---------- */
      gsap.utils.toArray<HTMLElement>(".split-text").forEach((el) => {
        const words = el.textContent?.trim().split(/\s+/).filter(Boolean) ?? [];
        el.innerHTML = words
          .map((w, i) => `<span class="split-word" style="transition-delay:${i * 50}ms">${w}</span>`)
          .join(" ");
        const wordEls = el.querySelectorAll(".split-word");
        wordEls.forEach((w) => {
          gsap.fromTo(
            w,
            { opacity: 0.2 },
            {
              opacity: 1,
              duration: 0.05,
              stagger: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        });
      });

      /* ---------- project rows ---------- */
      gsap.utils.toArray<HTMLElement>(".project-list-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      /* ---------- testimonial cards ---------- */
      gsap.fromTo(
        ".testimonial-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".testimonial-holder", start: "top 80%" },
        }
      );
    }, mainRef);

    // Hard fallback: remove intro overlay after 6 seconds max
    const fallbackTimer = setTimeout(() => {
      gsap.set(".intro-fade, .intro-reveal, .intro-wipe, .intro-cover, .intro-cover-pair", {
        display: "none",
      });
    }, 6000);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("kinetic:done", onIntroDone);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Intro overlay — hidden by default via CSS, shown only when JS runs */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none"
        id="intro-overlay"
        aria-hidden="true"
      >
        <div className="intro-fade absolute inset-0 bg-white" />
        <div className="intro-reveal absolute top-0 left-0 h-full bg-black" style={{ width: 0 }} />
        <div className="intro-wipe absolute bottom-0 left-0 w-full bg-black" />
        <div className="intro-cover absolute top-0 left-0 bg-white" />
        <div className="intro-cover-pair absolute top-0 left-0 w-1 h-1 bg-black" />
      </div>

      {/* first-visit fullscreen intro (self-unmounts when done) */}
      <KineticTypography />

      <Navbar />
      <div id="hero-section"><Hero /></div>
      <div id="services-section"><Services /></div>
      <HowIWork />
      <GitHubStats username="foxlancerr" />
      <Stack />
      <WhyWorkWithMe />
      <div id="about-section"><About /></div>
      <div id="projects-section"><Projects /></div>
      <div id="gallery-section"><MomentsGallery /></div>
      <div id="benchmark-section"><Benchmark /></div>
      <div id="reviews-section"><ClientReviews /></div>
      <div id="booking-section"><BookingCalendar /></div>
        <CtaBand />
      <div id="testimonials-section"><Testimonials /></div>
      <Faq />
      <div id="contact-section"><Footer /></div>
    </div>
  );
}
