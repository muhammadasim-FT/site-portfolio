"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The NERMS platform transformed how we coordinate emergency response across the nation. What used to take hours of phone calls now happens in seconds on a live map.",
    name: "Ahmed Hassan",
    company: "Rescue 1122",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "ServiceFlow gave us a single pane of glass for our entire operation — leads, dispatch, invoicing, and revenue tracking all in one place. Our technician utilization jumped 40% in the first quarter.",
    name: "Sarah Mitchell",
    company: "Summit Home Services",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "Sift.ai's five-agent pipeline does in hours what used to take our team weeks. The quality of leads and personalized outreach drafts is indistinguishable from human work.",
    name: "Marcus Chen",
    company: "GrowthOps Agency",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "We asked for a simple REST API. They gave us clean, well-documented, AND scalable. They even got our team lead to say 'this is exactly what I wanted' — which they usually only say about coffee.",
    name: "James Okafor",
    company: "LogiTrack",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "They took our 'just make it faster' request and turned it into a proper caching strategy and query optimization plan. Wizards? Possibly. Engineers? Absolutely. Performance experts.",
    name: "Elena Rodriguez",
    company: "ChainGPT Labs",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "They took our 'just make it work' deployment process and turned it into a proper CI/CD pipeline. Fewer rollbacks, fewer late nights, fewer 'works on my machine' excuses.",
    name: "David Kim",
    company: "StreamLine",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "We gave them absolutely no direction, two contradictory tickets, and one half-faked architecture diagram — and somehow they made something clean and maintainable. They're either magic or just very patient.",
    name: "Engineering Manager",
    company: "Full-Stack Team",
    avatar: "/assets/images/images/mockup1.jpg",
  },
  {
    quote:
      "They understood our system's constraints better than we did. I'm pretty sure they read every line of our legacy code, mapped the dependencies, and came back with a plan. Hire them before a competitor does.",
    name: "CTO",
    company: "Startup",
    avatar: "/assets/images/images/mockup1.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".logo-animation-holder",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".logo-animation-holder", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="section-spacing">
        <div className="container">
          <div className="section-inside">
            <div className="content">
              <div className="center-text-holder text-center">
                <p className="paragraph-title">what collaborators say</p>
              </div>

              {/* Repeating logo animation */}
              <div className="logo-animation-holder">
                <div className="logo-animation-half _1">
                  <div className="logo-text">Lumenis</div>
                </div>
                <div className="logo-animation-half _2">
                  <div className="logo-text">Lumenis</div>
                </div>
                <div className="logo-animation-half _3">
                  <div className="logo-text">Lumenis</div>
                </div>
                <div className="logo-animation-full">
                  <div className="logo-text">Lumenis</div>
                </div>
              </div>
            </div>

            <div className="testimonial-holder">
              {testimonials.map((t, i) => (
                <div key={`${t.name}-${i}`} className="testimonial-item">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-user-holder">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="testimonial-user"
                    />
                    <div className="testimonial-content">
                      <p className="paragraph-title">{t.name}</p>
                      <p className="no-margins">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}