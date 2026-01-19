import React, { useEffect, useMemo, useRef } from "react";
import ProjectsYellowStar from "../svgs/ProjectsYellowStar";
import RedMarks from "../svgs/RedMarks";
import HomeButtonLine from "../svgs/HomeButtonLine";
import ButtonArrow from "../svgs/ButtonArrow";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ProjectsShowcase({ className = "" }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const projects = useMemo(
    () => [
      {
        tag: "Brand identity",
        date: "14/12/2025",
        title: "Conference speaker id design",
        desc: "A clear, structured event badge designed for professional conferences and high-quality presentations.",
        image: "/images/card1.avif",
      },
      {
        tag: "UI/UX design",
        date: "06/01/2026",
        title: "Mobile app dashboard system",
        desc: "A modular interface system built for speed, clarity, and scalable product growth.",
        image: "/images/card2.avif",
      },
      {
        tag: "Web development",
        date: "22/01/2026",
        title: "Neo-brutal portfolio site",
        desc: "A bold, playful website build with strong typography, hard shadows, and buttery interactions.",
        image: "/images/card3.avif",
      },
    ],
    []
  );

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(0);

  // per-card smoothed state
  const stateRef = useRef(
    projects.map(() => ({
      p: 0,
      pp: 0,
    }))
  );

  useEffect(() => {
    if (reduce) return;
  
    const tick = () => {
      const vh = window.innerHeight || 800;
  
      // starts later + finishes later (your current tuning)
      const start = vh * 0.80;
      const end   = vh * 0.26;
      const DELAY = 0.22;
  
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
  
        const r = el.getBoundingClientRect();
  
        // ✅ viewport-based (page scroll)
        const raw = (start - r.top) / (start - end);
        const p0 = clamp01(raw);
  
        // delay remap (keeps it flat longer)
        const p1 = clamp01((p0 - DELAY) / (1 - DELAY));
  
        const ep = easeOutCubic(p1);
  
        const st = stateRef.current[i];
        st.p = ep;
        st.pp = lerp(st.pp, st.p, 0.085);
  
        // flat pose direction (your tuned values)
        const RX_START = 72;
        const RY_START = 0;
        const RZ_START = -40;
        const TX_START = 22;
        const TY_START = 32;
  
        const rx = lerp(RX_START, 0, st.pp);
        const ry = lerp(RY_START, 0, st.pp);
        const rz = lerp(RZ_START, 0, st.pp);
        const tx = lerp(TX_START, 0, st.pp);
        const ty = lerp(TY_START, 0, st.pp);
        const sc = lerp(0.985, 1, st.pp);
  
        el.style.setProperty("--p", st.pp.toFixed(4));
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--rz", `${rz.toFixed(2)}deg`);
        el.style.setProperty("--tx", `${tx.toFixed(2)}px`);
        el.style.setProperty("--ty", `${ty.toFixed(2)}px`);
        el.style.setProperty("--sc", `${sc.toFixed(4)}`);
      }
  
      rafRef.current = requestAnimationFrame(tick);
    };
  
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [reduce, projects.length]);
  

  const btnRef = useRef(null);

  const handleMove = (e) => {
    const el = btnRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1

    // center to -0.5..0.5 then scale
    const dx = (x - 0.5) * 12; // strength
    const dy = (y - 0.5) * 6;

    el.style.setProperty("--mx", `${dx.toFixed(2)}px`);
    el.style.setProperty("--my", `${dy.toFixed(2)}px`);
  };

  const handleLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
  };

  return (
    <section
      ref={sectionRef}
      className={["projects-section", className].join(" ")}
    >
      <div className="projects-container">
        <div className="projects-grid">
          {/* LEFT (sticky) */}
          <div className="projects-left">
            <div className="projects-left-inner">
              <h2 className="projects-title">
                Selected{" "}
                <span className="projects-title-word-project">
                  projects
                  <RedMarks className="projects-title-marks" />
                </span>
                we’re proud of
              </h2>
              <p className="projects-subtitle">
                Explore our latest collaborations and creative experiments that
                redefine digital possibilities.
              </p>

              <div className="mt-8">
                <a
                  href="#"
                  ref={btnRef}
                  className="btn-secondary btn-magnet relative text-black"
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  {/* ✅ line above button (rises on hover) */}
                  <span className="btn-line pointer-events-none absolute -left-1 -top-1.5">
                    <HomeButtonLine className="h-5.75 w-4.75" />
                  </span>

                  {/* ✅ text that follows mouse */}
                  <span className="btn-label">See More Projects</span>

                  <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                    <ButtonArrow className="h-2.25 w-2.75" />
                  </span>
                </a>
              </div>

              {/* decorative star (simple) */}
              <div className="projects-star-wrap">
                <span className="projects-star-rotator">
                  <ProjectsYellowStar className="projects-star-pulser" />
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT (scrolling cards) */}
          <div className="projects-right">
            <div className="projects-cards">
              {projects.map((p, idx) => (
                <article
                  key={p.title}
                  ref={(node) => (cardRefs.current[idx] = node)}
                  className="project-card"
                >
                  <div className="project-card-shell">
                    <div className="project-media">
                      <div className="project-media-frame">
                        <img
                          className="project-media-img"
                          src={p.image}
                          alt={p.title}
                        />
                      </div>
                    </div>

                    <div className="project-meta">
                      <span className="project-tag">{p.tag}</span>
                      <span className="project-date">{p.date}</span>
                    </div>

                    <h3 className="project-name">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
