"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------- review data -------------------------------- */

type ClientReview = {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  projectDescription: string;
  tech: string[];
  image: string;
  avatar: string;
};

const clientReviews: ClientReview[] = [
  {
    id: "review-1",
    client: "Sarah Chen",
    role: "CTO",
    company: "DataFlow Systems",
    quote:
      "We handed them a tangled monolith and a two-page brief. They came back with a clean service architecture, clear documentation, and a migration path that actually worked.",
    project: "Service Migration",
    projectDescription:
      "Migrated a 50K-line monolith to event-driven microservices. Zero downtime, 40% faster response times, and a team that finally understands the codebase.",
    tech: ["Node.js", "Kafka", "Docker", "Kubernetes"],
    image: "client-review-1",
    avatar: "client-avatar-1",
  },
  {
    id: "review-2",
    client: "Marcus Webb",
    role: "VP Engineering",
    company: "CloudScale",
    quote:
      "Not only did they write clean, well-tested code — they understood the edge cases we hadn't thought of, nailed the API design, and even spotted a performance bug in our existing stack.",
    project: "API Redesign",
    projectDescription:
      "Redesigned a public REST API serving 2M requests/day. Added rate limiting, caching layers, and comprehensive documentation. Reduced p99 latency by 65%.",
    tech: ["TypeScript", "Redis", "PostgreSQL", "AWS"],
    image: "client-review-2",
    avatar: "client-avatar-2",
  },
  {
    id: "review-3",
    client: "Priya Sharma",
    role: "Engineering Director",
    company: "FinTech Labs",
    quote:
      "Working with them felt like a masterclass in software design. We laughed, we refactored (a little), and now we have a codebase that new engineers can actually understand.",
    project: "Codebase Overhaul",
    projectDescription:
      "Led a 3-month codebase modernization. Introduced TypeScript, automated testing, and CI/CD pipelines. Onboarding time for new engineers dropped from 3 weeks to 3 days.",
    tech: ["TypeScript", "Jest", "GitHub Actions", "Next.js"],
    image: "client-review-3",
    avatar: "client-avatar-3",
  },
  {
    id: "review-4",
    client: "James Okafor",
    role: "Head of Platform",
    company: "LogiTrack",
    quote:
      "We asked for a simple REST API. They gave us clean, well-documented, AND scalable. They even got our team lead to say 'this is exactly what I wanted' — which they usually only say about coffee.",
    project: "Logistics Platform",
    projectDescription:
      "Built a real-time logistics tracking platform. WebSocket-based live updates, route optimization algorithms, and a driver mobile app. Processes 10K shipments daily.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "client-review-4",
    avatar: "client-avatar-4",
  },
  {
    id: "review-5",
    client: "Elena Rodriguez",
    role: "Product Manager",
    company: "HealthBridge",
    quote:
      "They took our 'just make it faster' request and turned it into a proper caching strategy and query optimization plan. Wizards? Possibly. Engineers? Absolutely.",
    project: "Performance Optimization",
    projectDescription:
      "Optimized a healthcare dashboard loading patient records for 50K+ users. Implemented Redis caching, database query optimization, and lazy loading. Load time dropped from 8s to 1.2s.",
    tech: ["Redis", "PostgreSQL", "React", "Cloudflare"],
    image: "client-review-5",
    avatar: "client-avatar-5",
  },
  {
    id: "review-6",
    client: "David Kim",
    role: "DevOps Lead",
    company: "StreamLine",
    quote:
      "They took our 'just make it work' deployment process and turned it into a proper CI/CD pipeline. Fewer rollbacks, fewer late nights, fewer 'works on my machine' excuses.",
    project: "CI/CD Pipeline",
    projectDescription:
      "Designed and implemented a full CI/CD pipeline with GitHub Actions. Automated testing, Docker builds, and Kubernetes deployments. Deploy time reduced from 45 min to 6 min.",
    tech: ["GitHub Actions", "Docker", "Kubernetes", "Terraform"],
    image: "client-review-6",
    avatar: "client-avatar-6",
  },
];

/* ------------------------------- detail overlay ----------------------------- */

function ReviewOverlay({
  review,
  onClose,
}: {
  review: ClientReview;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-12"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details for ${review.project}`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 grid max-h-full w-full max-w-5xl overflow-y-auto rounded-xl bg-white md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl md:aspect-auto md:rounded-l-xl md:rounded-tr-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${review.image}/1200/900`}
            alt={review.project}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 p-6 md:p-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {review.project}
            </p>
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-black md:text-4xl">
              {review.project}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${review.avatar}/100/100`}
              alt={review.client}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-black">{review.client}</p>
              <p className="text-xs text-neutral-500">
                {review.role}, {review.company}
              </p>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-neutral-600">
            {review.projectDescription}
          </p>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
              Tech Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {review.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-3 pt-4">
            <a
              href={`/project/${review.id}`}
              className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              View Full Case Study
            </a>
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-50"
              autoFocus
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- section ---------------------------------- */

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReview, setActiveReview] = useState<ClientReview | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".review-item");

      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveIndex(i);
            animateImage();
          },
          onEnterBack: () => {
            setActiveIndex(i);
            animateImage();
          },
        });
      });

      /* ---- scroll reveal for the section header ---- */
      gsap.fromTo(
        ".reviews-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".reviews-header", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateImage = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  };

  const handleOpen = useCallback((review: ClientReview) => {
    setActiveReview(review);
  }, []);

  const handleClose = useCallback(() => {
    setActiveReview(null);
  }, []);

  const active = clientReviews[activeIndex];

  return (
    <section ref={sectionRef} id="client-reviews" className="section bg-white">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="reviews-header mb-16 text-center">
            <p className="paragraph-title text-neutral-400">Client reviews</p>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-black md:text-5xl">
              What collaborators say
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
              Feedback from engineers, product managers, and founders I've built with.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — scrollable review list */}
            <div className="flex flex-col">
              {clientReviews.map((review, i) => (
                <button
                  key={review.id}
                  onClick={() => handleOpen(review)}
                  className={`review-item group border-b border-neutral-200 py-10 text-left transition-opacity duration-500 lg:py-12 ${
                    i === activeIndex ? "opacity-100" : "opacity-35"
                  }`}
                  aria-label={`Open review from ${review.client}`}
                >
                  <div className="flex items-start gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${review.avatar}/80/80`}
                      alt={review.client}
                      loading="lazy"
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-heading text-[clamp(18px,2vw,24px)] font-semibold leading-snug tracking-tight text-black">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-black">{review.client}</p>
                          <p className="text-xs text-neutral-500">
                            {review.role}, {review.company}
                          </p>
                        </div>
                        <span className="ml-auto text-xs font-medium text-neutral-400 transition-colors group-hover:text-black">
                          {review.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right — sticky client image */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div
                  ref={imageRef}
                  className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={active.id}
                    src={`https://picsum.photos/seed/${active.image}/800/1000`}
                    alt={active.project}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="text-sm font-semibold text-white">{active.project}</p>
                    <p className="text-xs text-white/70">
                      {active.client} - {active.company}
                    </p>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {activeReview && <ReviewOverlay review={activeReview} onClose={handleClose} />}
    </section>
  );
}
