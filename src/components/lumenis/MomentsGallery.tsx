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
    id: "task-engine",
    title: "Task Engine",
    category: "Full-Stack",
    year: "2024",
    description:
      "A distributed task queue built with Node.js, Redis, and BullMQ. Handles job retries, rate limiting, and real-time status tracking across multiple worker processes.",
    tech: ["Node.js", "Redis", "BullMQ", "TypeScript"],
    image: "moments-project-1",
    aspect: "3/4",
  },
  {
    id: "realtime-collar",
    title: "Realtime Collar",
    category: "WebSocket",
    year: "2024",
    description:
      "A WebSocket-based live data streaming platform. Sub-100ms latency for 10K concurrent connections using a custom event-driven architecture.",
    tech: ["Socket.io", "Node.js", "Redis", "Docker"],
    image: "moments-project-2",
    aspect: "1/1",
  },
  {
    id: "query-layer",
    title: "Query Layer",
    category: "API",
    year: "2023",
    description:
      "A GraphQL federation layer that unifies five microservices into a single endpoint. Schema stitching with automatic type generation and query depth limiting.",
    tech: ["GraphQL", "Apollo", "PostgreSQL", "TypeScript"],
    image: "moments-project-3",
    aspect: "4/3",
  },
  {
    id: "pipeline",
    title: "Pipeline",
    category: "DevOps",
    year: "2023",
    description:
      "A CI/CD automation pipeline with GitHub Actions, Docker multi-stage builds, and Kubernetes rolling deployments. Reduced deploy time from 45 min to 6 min.",
    tech: ["GitHub Actions", "Docker", "Kubernetes", "Terraform"],
    image: "moments-project-4",
    aspect: "1/1",
  },
  {
    id: "event-flow",
    title: "Event Flow",
    category: "Full-Stack",
    year: "2023",
    description:
      "An event-driven microservices platform using Apache Kafka. Handles 850K events per day with exactly-once processing semantics and dead-letter recovery.",
    tech: ["Kafka", "Node.js", "MongoDB", "gRPC"],
    image: "moments-project-5",
    aspect: "3/4",
  },
  {
    id: "auth-vault",
    title: "Auth Vault",
    category: "Security",
    year: "2024",
    description:
      "A zero-trust authentication service with JWT rotation, refresh token reuse detection, and hardware key support. Passed third-party security audit.",
    tech: ["Node.js", "OAuth2", "WebAuthn", "PostgreSQL"],
    image: "moments-project-6",
    aspect: "4/5",
  },
  {
    id: "data-mesh",
    title: "Data Mesh",
    category: "Infrastructure",
    year: "2023",
    description:
      "A serverless data mesh architecture on AWS Lambda and Step Functions. Processes 2TB daily with automatic schema evolution and data lineage tracking.",
    tech: ["AWS Lambda", "Step Functions", "S3", "DynamoDB"],
    image: "moments-project-7",
    aspect: "1/1",
  },
  {
    id: "edge-cache",
    title: "Edge Cache",
    category: "Performance",
    year: "2024",
    description:
      "A distributed edge caching layer using Cloudflare Workers and KV storage. Reduced API response times by 78% globally with intelligent cache invalidation.",
    tech: ["Cloudflare Workers", "KV", "TypeScript", "REST"],
    image: "moments-project-8",
    aspect: "4/3",
  },
  {
    id: "stream-line",
    title: "Stream Line",
    category: "Full-Stack",
    year: "2024",
    description:
      "A real-time collaborative document editing platform using CRDTs and WebSockets. Supports 500+ concurrent editors with conflict-free merging.",
    tech: ["CRDT", "WebSockets", "React", "Node.js"],
    image: "moments-project-9",
    aspect: "1/1",
  },
  {
    id: "metric-hub",
    title: "Metric Hub",
    category: "Observability",
    year: "2023",
    description:
      "A centralized observability platform aggregating logs, metrics, and traces from 20+ microservices. Custom alerting engine with anomaly detection.",
    tech: ["Prometheus", "Grafana", "ELK", "Go"],
    image: "moments-project-10",
    aspect: "3/4",
  },
  {
    id: "deploy-bot",
    title: "Deploy Bot",
    category: "DevOps",
    year: "2024",
    description:
      "A Slack-integrated deployment bot with canary releases, automatic rollbacks, and deployment analytics. Used by 5 engineering teams daily.",
    tech: ["Slack API", "Node.js", "Docker", "AWS"],
    image: "moments-project-11",
    aspect: "1/1",
  },
  {
    id: "code-sight",
    title: "Code Sight",
    category: "Developer Tools",
    year: "2023",
    description:
      "A static analysis tool that detects code smells, security vulnerabilities, and performance bottlenecks. Integrates with CI/CD pipelines via GitHub Actions.",
    tech: ["TypeScript", "AST", "Node.js", "GitHub API"],
    image: "moments-project-12",
    aspect: "4/5",
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 grid max-h-full w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-2xl md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl md:aspect-auto md:rounded-l-xl md:rounded-tr-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${project.image}/1200/900`}
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
  const row1 = galleryProjects.slice(0, 6);
  const row2 = galleryProjects.slice(6);

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
        isHovered ? "z-10 shadow-2xl" : "z-0"
      }`}
      style={{
        width: "clamp(200px, 25vw, 380px)",
        aspectRatio: project.aspect,
      }}
      aria-label={`Open project: ${project.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${project.image}/600/750`}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
