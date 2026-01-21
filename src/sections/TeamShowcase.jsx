import React, { useEffect, useMemo, useRef } from "react";
import RedMarks from "../svgs/RedMarks";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function TeamShowcase() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const people = useMemo(
    () => [
      { name: "Aiden clark", role: "Creative director", video: "/videos/video.webm" },
      { name: "Noah bennett", role: "Lead UI/UX designer", video: "/videos/store-scroll.webm" },
      { name: "Maya lopez", role: "Web developer", video: "/videos/scientific.webm" },
    //   { name: "Sofia nguyen", role: "Digital marketing strategist", video: "/videos/global.webm" },
    ],
    []
  );

  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(0);

  // smoothed progress
  const smoothRef = useRef({ p: 0 });

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const vh = window.innerHeight || 800;
      const r = section.getBoundingClientRect();

      // pin logic
      const active = r.top <= 0 && r.bottom >= vh;
      pin.classList.toggle("is-fixed", active);
      pin.classList.toggle("is-top", r.top > 0);
      pin.classList.toggle("is-bottom", r.bottom < vh);

      // progress 0..1 across the section
      const total = Math.max(1, r.height - vh);
      const pTarget = clamp01((-r.top) / total);

      smoothRef.current.p = lerp(smoothRef.current.p, pTarget, 0.11);
      const p = smoothRef.current.p;

      // ----------------------------
      // TUNING
      // ----------------------------
      const PIN_Y = -55; // frame 1 pinned a bit upper (negative = up)

      // Delay pin so heading + para are fully readable before pin
      const A_START = 0.01;
      const A_END = 0.38;
      const aT = easeOutCubic(clamp01((p - A_START) / (A_END - A_START)));

      // heading slides out during A
      if (headerRef.current) {
        const titleY = lerp(0, -195, aT);
        headerRef.current.style.setProperty("--titleY", `${titleY.toFixed(2)}px`);
      }

      // card 1 starts under heading, then moves to pin
      const firstStartY = 300;
      const firstY = lerp(firstStartY, PIN_Y, aT);

      // ----------------------------
      // PHASE B: other frames come from deep bottom -> stack exactly on top of card 1
      // ----------------------------
      const B_START = 0.30;
      const B_END = 0.80;
      const bPhase = clamp01((p - B_START) / (B_END - B_START));

      const perDelay = 0.20;
      const perDur = 0.44;

      const FROM_BOTTOM = vh * 2.2; // deeper bottom entry

      // ----------------------------
      // PHASE C: spread side-by-side
      // ----------------------------
      const C_START = 0.80;
      const C_END = 1.0;
      const cT = easeOutCubic(clamp01((p - C_START) / (C_END - C_START)));

      const spreadGapX = 340;
      const centerIndex = (people.length - 1) / 2;

      // reveal function (only for coming in, NOT for hiding others)
      const getRevealT = (i) => {
        if (i <= 0) return 1; // frame 1 always present
        const start = 0.06 + (i - 1) * perDelay;
        const end = start + perDur;
        const t0 = clamp01((bPhase - start) / (end - start));
        return easeOutCubic(t0);
      };

      for (let i = 0; i < people.length; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        // later cards always on top
        card.style.setProperty("--z", `${50 + i}`);

        let xStack = 0;
        let yStack = PIN_Y;
        let oStack = 1;
        let scStack = 1;

        if (i === 0) {
          // card 1: move to pin during A, then lock at pin
          const pinLock = pTarget >= A_END;
          yStack = pinLock ? PIN_Y : firstY;

          xStack = 0;
          oStack = 1; // ✅ NO fade-out ever
          scStack = 1;
        } else {
          // cards 2+: come from deep bottom, land exactly at PIN_Y (full cover stack)
          const t = getRevealT(i);

          const yFrom = FROM_BOTTOM + i * 160;
          const yTo = PIN_Y; // ✅ exact stack position
          yStack = lerp(yFrom, yTo, t);

          xStack = 0;
          oStack = lerp(0, 1, t); // only fades IN while arriving (not fading previous out)
          scStack = lerp(0.992, 1, t);
        }

        // spread targets
        const xSpread = (i - centerIndex) * spreadGapX;
        const ySpread = 0;

        // when spreading, make sure all are fully visible
        const oFinal = lerp(oStack, 1, cT);
        const scFinal = lerp(scStack, 1, cT);

        const xFinal = lerp(xStack, xSpread, cT);
        const yFinal = lerp(yStack, ySpread, cT);

        card.style.setProperty("--x", `${xFinal.toFixed(2)}px`);
        card.style.setProperty("--y", `${yFinal.toFixed(2)}px`);
        card.style.setProperty("--o", `${oFinal.toFixed(3)}`);
        card.style.setProperty("--sc", `${scFinal.toFixed(3)}`);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [reduce, people.length]);

  return (
    <section ref={sectionRef} className="team-section">
      <div ref={pinRef} className="team-pin is-top">
        <div className="team-container">
          <div ref={headerRef} className="team-header">
            <h2 className="team-title">
              Meet the minds behind{" "}
              <span className="team-title-word">
               Wyze Digital
                <RedMarks className="team-title-marks" />
              </span>
            </h2>

            <p className="team-subtitle">
              A passionate team of designers, developers, and strategists crafting bold
              digital experiences that drive impact and innovation.
            </p>
          </div>

          <div className="team-stage">
            {people.map((p, idx) => (
              <article
                key={p.name}
                ref={(n) => (cardRefs.current[idx] = n)}
                className="team-card"
              >
                <div className="team-card-shell">
                  <div className="team-video">
                    <video
                      className="team-video-el"
                      src={p.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="team-card-label">
                      <div className="team-card-name">{p.name}</div>
                      <div className="team-card-role">{p.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
