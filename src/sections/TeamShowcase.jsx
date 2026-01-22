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
        {
          name: "Jason",
          role: "Brandswaggin",
          type: "vimeo",
          videoId: "1069396395",
          hash: "bb23cc33a8",
        },
        {
          name: "Chantale",
          role: "Branding Co.",
          type: "vimeo",
          videoId: "1069396364",
          hash: "c2d31c6f1a",
        },
        {
          name: "Catherine Luparello",
          role: "Evoblocs",
          type: "vimeo",
          videoId: "1069396416",
          hash: "acfe425787",
        },
      ],
      []
    );
    

  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(0);

  const smoothRef = useRef({ p: 0 });

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const vh = window.innerHeight || 800;
      const r = section.getBoundingClientRect();

      const active = r.top <= 0 && r.bottom >= vh;
      pin.classList.toggle("is-fixed", active);
      pin.classList.toggle("is-top", r.top > 0);
      pin.classList.toggle("is-bottom", r.bottom < vh);

      const total = Math.max(1, r.height - vh);
      const pTarget = clamp01((-r.top) / total);

      smoothRef.current.p = lerp(smoothRef.current.p, pTarget, 0.11);
      const p = smoothRef.current.p;

      const PIN_Y = -55;

      const A_START = 0.0;
      const A_END = 0.1;
      const aT = easeOutCubic(clamp01((p - A_START) / (A_END - A_START)));

      if (headerRef.current) {
        const titleY = lerp(0, -195, aT);
        headerRef.current.style.setProperty("--titleY", `${titleY.toFixed(2)}px`);
      }

      const firstStartY = 300;
      const firstY = lerp(firstStartY, PIN_Y, aT);

      const B_START = 0.3;
      const B_END = 0.8;
      const bPhase = clamp01((p - B_START) / (B_END - B_START));

      const perDelay = 0.2;
      const perDur = 0.44;
      const FROM_BOTTOM = vh * 2.2;

      const C_START = 0.8;
      const C_END = 1.0;
      const cT = easeOutCubic(clamp01((p - C_START) / (C_END - C_START)));

      const CARD_WIDTH = 420; // matches max width in CSS
      const spreadGapX = CARD_WIDTH + 80; // real visible gap
            const centerIndex = (people.length - 1) / 2;

      const getRevealT = (i) => {
        if (i <= 0) return 1;
        const start = 0.06 + (i - 1) * perDelay;
        const end = start + perDur;
        return easeOutCubic(clamp01((bPhase - start) / (end - start)));
      };

      for (let i = 0; i < people.length; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        card.style.setProperty("--z", `${50 + i}`);

        let xStack = 0;
        let yStack = PIN_Y;
        let oStack = 1;
        let scStack = 1;

        if (i === 0) {
          const pinLock = pTarget >= A_END;
          yStack = pinLock ? PIN_Y : firstY;
        } else {
          const t = getRevealT(i);
          const yFrom = FROM_BOTTOM + i * 160;
          yStack = lerp(yFrom, PIN_Y, t);
          oStack = lerp(0, 1, t);
          scStack = lerp(0.992, 1, t);
        }

        const xSpread = (i - centerIndex) * spreadGapX;

        const xFinal = lerp(xStack, xSpread, cT);
        const yFinal = lerp(yStack, 0, cT);
        const oFinal = lerp(oStack, 1, cT);
        const scFinal = lerp(scStack, 1, cT);

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
              A passionate team of designers, developers, and strategists crafting
              bold digital experiences that drive impact and innovation.
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
                    {p.type === "vimeo" ? (
                      <iframe
                      className="team-video-el"
                      src={`https://player.vimeo.com/video/${p.videoId}?h=${p.hash}&autoplay=1&muted=1&loop=1&playsinline=1&controls=1`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      title={p.name}
                    />
                    
                    ) : (
                      <video
                        className="team-video-el"
                        src={p.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}

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
