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
    id: "review-nerms",
    client: "Ahmed Hassan",
    role: "Director of Operations",
    company: "Rescue 1122",
    quote:
      "The NERMS platform transformed how we coordinate emergency response across the nation. What used to take hours of phone calls now happens in seconds on a live map.",
    project: "NERMS",
    projectDescription:
      "A nationwide incident response command center that visualizes live emergency dispatches across Pakistan using GPS tracking and interactive maps. Features an admin operations portal for managing emergency services (Rescue 1122, Edhi, Police), tracking critical resources, and filtering incidents by urgency.",
    tech: ["React", "Leaflet", "WebSockets", "PostgreSQL", "TypeScript"],
    image: "/assets/images/gallery/norms.jpg",
    avatar: "/assets/images/gallery/norms.jpg",
  },
  {
    id: "review-serviceflow",
    client: "Sarah Mitchell",
    role: "Operations Manager",
    company: "Summit Home Services",
    quote:
      "ServiceFlow gave us a single pane of glass for our entire operation — leads, dispatch, invoicing, and revenue tracking all in one place. Our technician utilization jumped 40% in the first quarter.",
    project: "ServiceFlow",
    projectDescription:
      "An all-in-one business management and dispatch platform designed for residential home services like HVAC, plumbing, and electrical work. Provides an operational dashboard for tracking customer leads, assigning field technicians, and analyzing six-month revenue funnels. Features a customer-facing booking site where homeowners can request instant diagnostic quotes and schedule appointments online.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind", "TypeScript"],
    image: "/assets/images/gallery/serviceflow.jpg",
    avatar: "/assets/images/gallery/serviceflow.jpg",
  },
  {
    id: "review-sift",
    client: "Marcus Chen",
    role: "VP of Sales",
    company: "GrowthOps Agency",
    quote:
      "Sift.ai's five-agent pipeline does in hours what used to take our team weeks. The quality of leads and personalized outreach drafts is indistinguishable from human work.",
    project: "Sift.ai",
    projectDescription:
      "An autonomous B2B lead generation platform powered by a five-agent AI pipeline that discovers and audits local business opportunities. Scans target regions and niches to identify underperforming business websites, scoring issues and preparing personalized outreach pitches automatically. Features an operations dashboard allowing operators to launch pipeline runs, approve drafts, and track email reply analytics.",
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL", "React"],
    image: "/assets/images/gallery/saftai.jpg",
    avatar: "/assets/images/gallery/saftai.jpg",
  },
  {
    id: "review-zafora",
    client: "James Okafor",
    role: "Head of Platform",
    company: "LogiTrack",
    quote:
      "We asked for a simple REST API. They gave us clean, well-documented, AND scalable. They even got our team lead to say 'this is exactly what I wanted' — which they usually only say about coffee.",
    project: "Zafora Holdings",
    projectDescription:
      "An enterprise corporate portal and investment platform focused on structuring, funding, and delivering critical infrastructure projects. Backed by a clean CMS and admin dashboard for organizing project pipelines across transport, energy, healthcare, and water sectors. Includes built-in CRM tooling to manage investor inquiries, publish partner updates, and maintain public-facing site content.",
    tech: ["Next.js", "Contentful", "PostgreSQL", "GraphQL", "TypeScript"],
    image: "/assets/images/gallery/zafora.jpg",
    avatar: "/assets/images/gallery/zafora.jpg",
  },
  {
    id: "review-chain-gpt",
    client: "Elena Rodriguez",
    role: "Product Manager",
    company: "ChainGPT Labs",
    quote:
      "They took our 'just make it faster' request and turned it into a proper caching strategy and query optimization plan. Wizards? Possibly. Engineers? Absolutely. Performance experts.",
    project: "ChainGPT Pad & DeCharge",
    projectDescription:
      "A Web3 IDO launchpad and decentralized fundraising hub tailored for emerging crypto and AI projects. Features a tiered staking system (Explorer to Pioneer) enabling users to lock tokens, boost pool multipliers, and qualify for tier allocations. Integrates detailed project discovery cards, interactive financial metrics, and live token sale progress monitors.",
    tech: ["React", "Web3.js", "Solidity", "Tailwind", "TypeScript"],
    image: "/assets/images/gallery/launhpad.jpg",
    avatar: "/assets/images/gallery/launhpad.jpg",
  },
  {
    id: "review-crypto-skope",
    client: "David Kim",
    role: "DevOps Lead",
    company: "StreamLine",
    quote:
      "They took our 'just make it work' deployment process and turned it into a proper CI/CD pipeline. Fewer rollbacks, fewer late nights, fewer 'works on my machine' excuses.",
    project: "CryptoSkope",
    projectDescription:
      "A crypto market analytics platform offering global screener data, 24-hour volume metrics, and fear-and-greed sentiment tracking. Provides deep ecosystem coverage with interactive OHLC candlestick charts and technical indicators (MA, RSI, MACD) for Theta Network tokens. Integrates a news aggregator delivering up-to-the-minute headlines from crypto outlets like CoinDesk and CryptoCompare.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL", "TypeScript"],
    image: "/assets/images/gallery/marketplace.jpg",
    avatar: "/assets/images/gallery/marketplace.jpg",
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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 grid max-h-full w-full max-w-5xl overflow-y-auto rounded-xl bg-white md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl md:aspect-auto md:rounded-l-xl md:rounded-tr-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.image}
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
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
              {review.project}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={review.avatar}
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
    <section ref={sectionRef} id="reviews-section" className="section bg-white">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="reviews-header mb-10 text-center sm:mb-16">
            <p className="paragraph-title text-neutral-400">Client reviews</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
              What collaborators say
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-neutral-500 sm:text-[15px]">
              Feedback from engineers, product managers, and founders I've built with.
            </p>
          </div>

          <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — scrollable review list */}
            <div className="flex flex-col">
              {clientReviews.map((review, i) => (
                <button
                  key={review.id}
                  onClick={() => handleOpen(review)}
                  className={`review-item group border-b border-neutral-200 py-7 text-left transition-opacity duration-500 sm:py-10 lg:py-12 ${
                    i === activeIndex ? "opacity-100" : "opacity-35"
                  }`}
                  aria-label={`Open review from ${review.client}`}
                >
                  <div className="flex items-start gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={review.avatar}
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
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-square overflow-hidden bg-neutral-100 lg:aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={active.id}
                  src={active.image}
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

      {/* Overlay */}
      {activeReview && <ReviewOverlay review={activeReview} onClose={handleClose} />}
    </section>
  );
}