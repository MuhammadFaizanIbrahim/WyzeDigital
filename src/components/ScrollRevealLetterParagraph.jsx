import React, { useEffect, useMemo, useRef } from "react";

const DEFAULT_TEXT =
  "WyzeDigital is a digital agency that blends bold creativity with raw honesty. We design unapologetically crafting digital experiences that are functional, striking, and human. Guided by Neo Brutalism, we challenge trends, break perfection, and build brands that speak truth through simplicity and powerful visual storytelling.";

function buildTokens(text) {
  // keeps spaces as tokens so wrapping matches exactly
  return text.split(/(\s+)/);
}

export default function ScrollRevealLetterParagraph({ text = DEFAULT_TEXT }) {
  const sectionRef = useRef(null);
  const pRef = useRef(null);

  const tokens = useMemo(() => buildTokens(text), [text]);

  // count only revealable characters (exclude whitespace)
  const revealCount = useMemo(() => {
    let c = 0;
    for (const t of tokens) {
      if (/^\s+$/.test(t)) continue;
      c += Array.from(t).length;
    }
    return Math.max(1, c);
  }, [tokens]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const pEl = pRef.current;
    if (!sectionEl || !pEl) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      pEl.style.setProperty("--t", "1");
      return;
    }

    let raf = 0;
    let current = 0;

    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    const update = () => {
      const r = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      const start = vh * 0.78;
      const end = vh * 0.22;

      const raw = (start - r.top) / (start - end);
      const target = clamp01(raw);

      current = lerp(current, target, 0.2);
      pEl.style.setProperty("--t", current.toFixed(4));

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // one renderer used by BOTH layers (so layout is identical)
  const RenderSpanText = ({ reveal = false }) => {
    let revealIndex = -1;

    return (
      <>
        {tokens.map((tok, tokIdx) => {
          if (/^\s+$/.test(tok)) {
            return (
              <span key={`s-${tokIdx}`} className="lr-space">
                {tok}
              </span>
            );
          }

          const letters = Array.from(tok);
          return (
            <span key={`w-${tokIdx}`} className="lr-word">
              {letters.map((ch, i) => {
                revealIndex += 1;
                return (
                  <span
                    key={`c-${tokIdx}-${i}`}
                    className={reveal ? "lr-char lr-char-reveal" : "lr-char lr-char-base"}
                    style={reveal ? { ["--i"]: revealIndex } : undefined}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="letter-reveal-section">
      <div className="letter-reveal-container">
        <p
          ref={pRef}
          className="letter-reveal-text"
          style={{ ["--count"]: revealCount }}
        >
          {/* Base layer: SAME spans, just faded */}
          <span className="lr-base" aria-hidden="true">
            <RenderSpanText reveal={false} />
          </span>

          {/* Reveal layer: SAME spans, clipped by scroll */}
          <span className="lr-reveal" aria-hidden="true">
            <RenderSpanText reveal={true} />
          </span>

          <span className="sr-only">{text}</span>
        </p>
      </div>
    </section>
  );
}
