"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------- project data ------------------------------ */

type GalleryProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  aspect: string;
};

const galleryProjects: GalleryProject[] = [
  {
    id: "chain-gpt-pad",
    title: "ChainGPT Pad & DeCharge",
    category: "Web3 Launchpad",
    year: "2024",
    description:
      "A Web3 IDO launchpad and decentralized fundraising hub tailored for emerging crypto and AI projects. Features a tiered staking system (Explorer to Pioneer) enabling users to lock tokens, boost pool multipliers, and qualify for tier allocations. Integrates detailed project discovery cards, interactive financial metrics, and live token sale progress monitors.",
    tech: ["React", "Web3.js", "Solidity", "Tailwind", "TypeScript"],
    image: "/assets/images/gallery/launhpad.jpg",
    aspect: "4/3",
  },
  {
    id: "chain-gpt-ai-hub",
    title: "ChainGPT AI Hub / Foresight AI",
    category: "Web3 Intelligence",
    year: "2024",
    description:
      "A real-time Web3 intelligence suite that consolidates market analytics, AI narratives, and crypto sentiment indicators. Features interactive narrative heatmaps that track volume and bullish/bearish tension across major market themes. Equips traders with integrated TradingView candlestick charts, automated smart contract vulnerability scanning, and instant price alerts.",
    tech: ["React", "TradingView", "Python", "FastAPI", "TypeScript"],
    image: "/assets/images/gallery/aihub.jpg",
    aspect: "1/1",
  },
  {
    id: "chain-gpt-nft",
    title: "ChainGPT AI NFT Generator",
    category: "AI NFT Platform",
    year: "2024",
    description:
      "An AI-driven NFT creation platform allowing creators to mint custom digital assets using natural language prompts and multi-style filters. Provides native multi-chain deployment and minting support across networks like Solana, Ethereum, BNB Chain, Polygon, and Avalanche. Hosts an interactive campaign hub showcasing ecosystem events, prize pools, and partner quests integrated with Galxe and Zealy.",
    tech: ["React", "Stable Diffusion", "Web3.js", "IPFS", "TypeScript"],
    image: "/assets/images/gallery/nft.jpg",
    aspect: "3/4",
  },
  {
    id: "cryptoskope",
    title: "CryptoSkope",
    category: "Crypto Analytics",
    year: "2023",
    description:
      "A crypto market analytics platform offering global screener data, 24-hour volume metrics, and fear-and-greed sentiment tracking. Provides deep ecosystem coverage with interactive OHLC candlestick charts and technical indicators (MA, RSI, MACD) for Theta Network tokens. Integrates a news aggregator delivering up-to-the-minute headlines from crypto outlets like CoinDesk and CryptoCompare.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL", "TypeScript"],
    image: "/assets/images/gallery/marketplace.jpg",
    aspect: "4/3",
  },
  {
    id: "digitx",
    title: "DigitX Agency",
    category: "Agency Website",
    year: "2023",
    description:
      "A modern, dark-mode agency website built to showcase digital strategy, UI/UX design, web development, and digital marketing services. Features an editorial layout with high-contrast typography, interactive service breakdowns, and featured client case studies. Includes social proof sections, client testimonials, and clear call-to-action touchpoints for prospective project inquiries.",
    tech: ["Next.js", "Framer Motion", "Tailwind", "Contentful", "TypeScript"],
    image: "/assets/images/gallery/digiX.jpg",
    aspect: "1/1",
  },
  {
    id: "al-nasr",
    title: "Al-Nasr English Academy",
    category: "Education Portal",
    year: "2023",
    description:
      "An educational institution web portal built to present English language learning programs for young learners, teens, and adults. Displays clear program overviews, interactive class timetables, fee tiers, and instructor credentials. Features video learning showcases, student achievement highlights, and direct enrollment registration forms.",
    tech: ["Next.js", "Sanity CMS", "PostgreSQL", "Tailwind", "TypeScript"],
    image: "/assets/images/gallery/alnasr.jpg",
    aspect: "4/3",
  },
  {
    id: "azura-yachts",
    title: "Azura Luxury Yachts",
    category: "Luxury Charter",
    year: "2024",
    description:
      "A luxury maritime charter website presenting a curated fleet of superyachts, sailing vessels, and expedition boats. Showcases comprehensive vessel specifications, onboard amenities, and high-definition photography capturing charter experiences. Features an interactive booking interface allowing clients to customize charter dates, destinations, guest counts, and tailored itineraries.",
    tech: ["Next.js", "GSAP", "Three.js", "Tailwind", "TypeScript"],
    image: "/assets/images/gallery/azura.jpg",
    aspect: "3/4",
  },
];

/* ------------------------------ gallery overlay ----------------------------- */

function GalleryOverlay({
  project,
  onClose,
}: {
  project: GalleryProject;
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
      aria-label={project.title}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 grid max-h-full w-full max-w-5xl overflow-y-auto bg-white md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl md:aspect-auto md:rounded-l-xl md:rounded-tr-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 p-6 md:p-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {project.category} - {project.year}
            </p>
            <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-black md:text-4xl">
              {project.title}
            </h3>
          </div>

          <p className="text-[15px] leading-relaxed text-neutral-600">
            {project.description}
          </p>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
              Tech Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((t) => (
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
              href={`/project/${project.id}`}
              className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              View Case Study
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

/* --------------------------------- gallery --------------------------------- */

export default function MomentsGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      /* ---- scroll reveal for the section header ---- */
      gsap.fromTo(
        ".moments-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".moments-header", start: "top 85%" },
        }
      );

      /* ---- magnetic cursor effect on gallery items ---- */
      itemRefs.current.forEach((item) => {
        if (!item) return;

        const xTo = gsap.quickTo(item, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(item, "y", { duration: 0.6, ease: "power3.out" });
        const scaleTo = gsap.quickTo(item, "scale", { duration: 0.5, ease: "power3.out" });

        item.addEventListener("mousemove", (e) => {
          const rect = item.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const maxDist = 200;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 24;
            const angle = Math.atan2(dy, dx);
            xTo(-Math.cos(angle) * force);
            yTo(-Math.sin(angle) * force);
            scaleTo(1.06);
          }
        });

        item.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
          scaleTo(1);
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = useCallback((project: GalleryProject) => {
    setActiveProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject(null);
  }, []);

  // Split projects into two rows for the marquee
  const row1 = galleryProjects.slice(0, 4);
  const row2 = galleryProjects.slice(4);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafafa] py-24"
    >
      {/* Header */}
      <div className="moments-header container mb-12 text-center">
        <p className="paragraph-title text-neutral-400">Selected moments</p>
        <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-black md:text-5xl">
          Project Gallery
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
          A floating collection of projects. Move your cursor through the gallery —
          each one responds. Click to explore the details.
        </p>
      </div>

      {/* Dense collage marquee — no gaps, full bleed */}
      <div className="relative flex flex-col gap-2">
        {/* Row 1 — left to right */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...row1, ...row1].map((p, i) => (
              <GalleryCard
                key={`${p.id}-r1-${i}`}
                project={p}
                isHovered={hoveredId === p.id}
                onHover={setHoveredId}
                onOpen={handleOpen}
                registerRef={(el) => {
                  if (el) itemRefs.current.set(`${p.id}-r1-${i}`, el);
                }}
              />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="marquee-container">
          <div className="marquee-track marquee-reverse">
            {[...row2, ...row2].map((p, i) => (
              <GalleryCard
                key={`${p.id}-r2-${i}`}
                project={p}
                isHovered={hoveredId === p.id}
                onHover={setHoveredId}
                onOpen={handleOpen}
                registerRef={(el) => {
                  if (el) itemRefs.current.set(`${p.id}-r2-${i}`, el);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {activeProject && <GalleryOverlay project={activeProject} onClose={handleClose} />}
    </section>
  );
}

/* -------------------------------- gallery card ------------------------------ */

import { forwardRef } from "react";

const GalleryCard = forwardRef<
  HTMLButtonElement,
  {
    project: GalleryProject;
    isHovered: boolean;
    onHover: (id: string | null) => void;
    onOpen: (p: GalleryProject) => void;
    registerRef: (el: HTMLButtonElement | null) => void;
  }
>(({ project, isHovered, onHover, onOpen, registerRef }, ref) => {
  return (
    <button
      ref={(el) => {
        registerRef(el);
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className={`group relative block flex-shrink-0 overflow-hidden bg-white text-left transition-all duration-500 ${
        isHovered ? "z-10" : "z-0"
      }`}
      style={{
        width: "clamp(160px, 40vw, 320px)",
        aspectRatio: project.aspect,
      }}
      aria-label={`Open project: ${project.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ opacity: 0, transition: "opacity 0.5s ease, transform 0.7s ease-out" }}
        onLoad={(e) => {
          (e.target as HTMLImageElement).style.opacity = "1";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white">{project.title}</p>
        <p className="text-xs text-white/70">{project.category} - {project.year}</p>
      </div>
    </button>
  );
});

GalleryCard.displayName = "GalleryCard";