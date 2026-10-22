"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "nerms",
    title: "NERMS",
    category: "Emergency Response System",
    year: "2024",
    image: "/assets/images/gallery/norms.jpg",
    mainImage: "/assets/images/gallery/norms.jpg",
    alt: "National Emergency Response Management System dashboard",
    description:
      "A nationwide incident response command center that visualizes live emergency dispatches across Pakistan using GPS tracking and interactive maps. Features an admin operations portal for managing emergency services (Rescue 1122, Edhi, Police), tracking critical resources, and filtering incidents by urgency. Includes a public citizen portal where users can report emergencies in under 30 seconds and view live geo-tagged incident alerts.",
    tech: ["React", "Leaflet", "WebSockets", "PostgreSQL", "TypeScript"],
  },
  {
    id: "serviceflow",
    title: "ServiceFlow",
    category: "Home Services Platform",
    year: "2024",
    image: "/assets/images/gallery/serviceflow.jpg",
    mainImage: "/assets/images/gallery/serviceflow.jpg",
    alt: "ServiceFlow operational dashboard",
    description:
      "An all-in-one business management and dispatch platform designed for residential home services like HVAC, plumbing, and electrical work. Provides an operational dashboard for tracking customer leads, assigning field technicians, and analyzing six-month revenue funnels. Features a customer-facing booking site where homeowners can request instant diagnostic quotes and schedule appointments online.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind", "TypeScript"],
  },
  {
    id: "sift-ai",
    title: "Sift.ai",
    category: "AI Lead Generation",
    year: "2024",
    image: "/assets/images/gallery/saftai.jpg",
    mainImage: "/assets/images/gallery/saftai.jpg",
    alt: "Sift.ai autonomous pipeline dashboard",
    description:
      "An autonomous B2B lead generation platform powered by a five-agent AI pipeline that discovers and audits local business opportunities. Scans target regions and niches to identify underperforming business websites, scoring issues and preparing personalized outreach pitches automatically. Features an operations dashboard allowing operators to launch pipeline runs, approve drafts, and track email reply analytics.",
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL", "React"],
  },
  {
    id: "zafora",
    title: "Zafora Holdings",
    category: "Infrastructure Investment Platform",
    year: "2023",
    image: "/assets/images/gallery/zafora.jpg",
    mainImage: "/assets/images/gallery/zafora.jpg",
    alt: "Zafora Holdings corporate portal",
    description:
      "An enterprise corporate portal and investment platform focused on structuring, funding, and delivering critical infrastructure projects. Backed by a clean CMS and admin dashboard for organizing project pipelines across transport, energy, healthcare, and water sectors. Includes built-in CRM tooling to manage investor inquiries, publish partner updates, and maintain public-facing site content.",
    tech: ["Next.js", "Contentful", "PostgreSQL", "GraphQL", "TypeScript"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="section-spacing">
        <div className="container gray">
          <div className="section-inside">
            <div className="grid-title">
              <div className="grid-title-container">
                <div className="fade-in-on-scroll">
                  <p className="paragraph-title">projects</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="heading-holder">
                    <div className="fade-in-on-scroll">
                      <h1 className="h4-style">Digital Experiences Selected Works.</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  A selection of production systems I've designed, built, and deployed — from emergency
                  response platforms to AI-driven lead generation pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="project-list-wrapper mt-16">
          <div className="project-list-container">
            {projects.map((project) => (
              <div key={project.id} role="listitem" className="project-list-item">
                <a href={`/project/${project.id}`} className="project-link-wrapper">
                  {/* Background image */}
                  <div className="project-image-holder">
                    <div className="overlay" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      className="project-image"
                    />
                  </div>

                  <div className="container">
                    <div className="project-main-wrapper">
                      <div className="project-main">
                        <div className="project-title-holder">
                          <h1 className="diffrence">{project.title}</h1>
                        </div>
                        <div className="project-category-wrapper">
                          <p className="project-category-text">({project.category})</p>
                        </div>
                      </div>

                      <div className="project-main">
                        <div className="project-main-image-holderr">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.mainImage}
                            alt={project.alt}
                            loading="lazy"
                            className="project-main-image"
                          />
                          <div className="discover">
                            <p className="paragraph-title text-white">View Project</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="project-counter-holder">
                      <span>1</span>
                      <span>/</span>
                      <span>4</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}