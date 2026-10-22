"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* theme palette */
const DARK = "#0b140f";
const CREAM = "#f4f4f1";
const LIME = "#b8f04d";
const INK = "#14261c";

type Scene = {
  bg: string;
  color: string;
  size: "hero" | "normal" | "stacked";
  text?: string;
  support?: string;
  large?: string;
};

/* "we don't just code — we build … impact." */
const scenes: Scene[] = [
  { text: "we", bg: DARK, color: CREAM, size: "hero" },
  { support: "we don't", large: "just code", bg: DARK, color: CREAM, size: "stacked" },
  { text: "we", bg: DARK, color: LIME, size: "hero" },
  { text: "build", bg: LIME, color: INK, size: "normal" },
  { text: "design", bg: DARK, color: CREAM, size: "normal" },
  { text: "ship", bg: CREAM, color: INK, size: "normal" },
  { text: "systems", bg: DARK, color: CREAM, size: "normal" },
  { text: "ai", bg: DARK, color: CREAM, size: "normal" },
  { text: "impact.", bg: LIME, color: INK, size: "normal" },
];

export default function KineticTypography() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("lumenis-intro") === "1";
    } catch {
      seen = false;
    }

    /* repeat visits and reduced-motion users skip straight to the site */
    if (seen || reduce) {
      setFinished(true);
      return;
    }

    /* hold the page still while the reel plays */
    document.documentElement.classList.add("intro-lock");

    const sceneElements = sceneRefs.current.filter(
      (scene): scene is HTMLDivElement => scene !== null
    );

    /* -------- finish: flag, unlock, hand off to the site -------- */
    const finish = () => {
      try {
        sessionStorage.setItem("lumenis-intro", "1");
      } catch {
        /* private browsing */
      }
      document.documentElement.classList.remove("intro-lock");
      window.dispatchEvent(new Event("kinetic:done"));
      setFinished(true);
    };

    /* -------- the curtain lift -------- */
    let exited = false;
    const main = gsap.timeline();
    const exitNow = () => {
      if (exited) return;
      exited = true;
      main.kill();
      gsap
        .timeline({ onComplete: finish })
        .to(stage.querySelectorAll(".kinetic-scene, .kinetic-logo, .kinetic-skip"), {
          autoAlpha: 0,
          duration: 0.14,
          ease: "power2.in",
        })
        .to(stage, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, ">-0.05");
    };

    const skipButton = stage.querySelector(".kinetic-skip");
    stage.addEventListener("kinetic:skip", exitNow);
    main.set(skipButton, { autoAlpha: 0 });
    main.to(skipButton, { autoAlpha: 1, duration: 0.4 }, 0.6);
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") exitNow();
    });

    /* -------- opening: "we" unfocuses into view -------- */
    main.set(sceneElements, { autoAlpha: 0 });
    main.set(sceneElements[0], { autoAlpha: 1 });
    main.fromTo(
      sceneElements[0].querySelector(".kinetic-text"),
      { scale: 0.88, filter: "blur(12px)", autoAlpha: 0 },
      { scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 0.55, ease: "power3.out" }
    );
    main.to({}, { duration: 0.2 });

    /* -------- rapid-fire scenes; every tween appends at the end -------- */
    sceneElements.slice(1).forEach((scene) => {
      const text = scene.querySelector(".kinetic-text");

      main.set(sceneElements, { autoAlpha: 0 });
      main.set(scene, { autoAlpha: 1 });

      const isStacked = scene.dataset.size === "stacked";
      main.fromTo(
        text,
        { autoAlpha: 0, y: isStacked ? 26 : 14, scale: isStacked ? 0.94 : 1.06, filter: "blur(5px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: isStacked ? 0.42 : 0.26,
          ease: "power3.out",
        }
      );

      /* lime accents and the finale breathe a beat longer than the rapid words */
      const hold = scene.dataset.accent ? 0.5 : scene.dataset.finale ? 0.95 : isStacked ? 0.28 : 0.12;
      main.to({}, { duration: hold });
    });

    /* -------- then the lift -------- */
    main.call(exitNow);

    return () => {
      main.kill();
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  if (finished) return null;

  return (
    <section ref={stageRef} className="kinetic-stage" aria-label="Intro animation" role="presentation">
      <div className="kinetic-logo" aria-hidden="true">
        Lumenis.
      </div>

      <button type="button" className="kinetic-skip" onClick={() => stageRef.current?.dispatchEvent(new Event("kinetic:skip"))}>
        Skip
      </button>

      {scenes.map((scene, index) => (
        <div
          key={`${scene.text ?? scene.large}-${index}`}
          ref={(element) => {
            sceneRefs.current[index] = element;
          }}
          className="kinetic-scene"
          data-size={scene.size}
          data-accent={scene.text === "build" ? "build" : undefined}
          data-finale={scene.text === "impact." ? "finale" : undefined}
          style={{ backgroundColor: scene.bg, color: scene.color }}
          aria-hidden="true"
        >
          {scene.size === "stacked" ? (
            <div className="kinetic-stacked">
              <span className="kinetic-support">{scene.support}</span>
              <span className="kinetic-text kinetic-large">{scene.large}</span>
            </div>
          ) : (
            <div className={`kinetic-text kinetic-${scene.size}`}>{scene.text}</div>
          )}
        </div>
      ))}

      <div className="kinetic-grain" aria-hidden="true" />
    </section>
  );
}
