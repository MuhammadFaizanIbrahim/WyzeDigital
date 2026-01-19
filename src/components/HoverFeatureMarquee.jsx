import React, { useEffect, useMemo, useRef, useState } from "react";

import MarqueeIconTransparentProcess from "../svgs/MarqueeIconTransparentProcess.jsx";
import MarqueeIconScalableGrowth from "../svgs/MarqueeIconScalableGrowth.jsx";
import MarqueeIconUserCentric from "../svgs/MarqueeIconUserCentric.jsx";
import MarqueeIconBoldCreativity from "../svgs/MarqueeIconBoldCreativity.jsx";
import MarqueeIconFastDelivery from "../svgs/MarqueeIconFastDelivery.jsx";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function HoverFeatureMarquee({ className = "" }) {
  const items = useMemo(
    () => [
      { label: "Transparent process", Icon: MarqueeIconTransparentProcess },
      { label: "Scalable growth", Icon: MarqueeIconScalableGrowth },
      { label: "User-centric design", Icon: MarqueeIconUserCentric },
      { label: "Bold creativity", Icon: MarqueeIconBoldCreativity },
      { label: "Fast delivery", Icon: MarqueeIconFastDelivery },
    ],
    []
  );

  const viewportRef = useRef(null);
  const firstSetRef = useRef(null);

  const rafRef = useRef(0);
  const lastTRef = useRef(0);

  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const setWidthRef = useRef(0);

  const lastXRef = useRef(0);
  const hoveringRef = useRef(false);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const vp = viewportRef.current;
    const set = firstSetRef.current;
    if (!vp || !set) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const measure = () => {
      const w = Math.round(set.getBoundingClientRect().width);
      setWidthRef.current = w;

      // Start in middle copy so wrapping is seamless
      vp.scrollLeft = w;
      currentRef.current = w;
      targetRef.current = w;

      setReady(w > 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(set);

    // ✅ tuning
    const DRAG_MULT = 1.35; // bigger = more movement per mouse move
    const POS_EASE = 0.16;  // bigger = snappier follow
    const FRICTION = 0.92;  // closer to 1 = more glide

    let inertialVel = 0;

    const tick = (t) => {
      const vpEl = viewportRef.current;
      if (!vpEl) return;

      const w = setWidthRef.current || 1;

      const last = lastTRef.current || t;
      const dt = Math.min(0.05, (t - last) / 1000);
      lastTRef.current = t;

      // apply small inertia (only if user stopped moving)
      if (!hoveringRef.current) {
        inertialVel *= Math.pow(FRICTION, dt * 60);
        targetRef.current += inertialVel;
      } else {
        // while hovering, inertia fades
        inertialVel *= 0.85;
      }

      // smooth follow target
      currentRef.current = lerp(currentRef.current, targetRef.current, POS_EASE);
      vpEl.scrollLeft = currentRef.current;

      // ✅ seamless wrap (3 sets: [0..w], [w..2w], [2w..3w])
      if (currentRef.current < w * 0.5) {
        currentRef.current += w;
        targetRef.current += w;
        vpEl.scrollLeft = currentRef.current;
      } else if (currentRef.current > w * 2.5) {
        currentRef.current -= w;
        targetRef.current -= w;
        vpEl.scrollLeft = currentRef.current;
      }

      const moving =
        Math.abs(currentRef.current - targetRef.current) > 0.2 ||
        Math.abs(inertialVel) > 0.2 ||
        hoveringRef.current;

      if (moving) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
        lastTRef.current = 0;
      }
    };

    const startRAF = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
      hoveringRef.current = !reduce;
      lastXRef.current = e.clientX;
      startRAF();
    };

    const onLeave = () => {
      hoveringRef.current = false;
      startRAF();
    };

    const onMove = (e) => {
      if (!hoveringRef.current) return;

      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;

      // ✅ drag-like feel:
      // move mouse right => content moves right (scrollLeft decreases)
      const delta = -dx * DRAG_MULT;

      targetRef.current += delta;

      // store inertia for smooth tail
      inertialVel = lerp(inertialVel, delta, 0.35);

      startRAF();
    };

    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    vp.addEventListener("pointermove", onMove);

    return () => {
      ro.disconnect();
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
      vp.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastTRef.current = 0;
    };
  }, []);

  return (
    <section className={["feature-marquee", className].join(" ")}>
      <div
        ref={viewportRef}
        className="feature-marquee-viewport"
        aria-label="Features marquee"
        data-ready={ready ? "true" : "false"}
      >
        <div className="feature-marquee-track">
          {/* Set 1 (measured) */}
          <div ref={firstSetRef} className="feature-marquee-set">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={label}>
                <span className="marquee-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>

          {/* Set 2 */}
          <div className="feature-marquee-set" aria-hidden="true">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={`${label}-2`}>
                <span className="marquee-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>

          {/* Set 3 */}
          <div className="feature-marquee-set" aria-hidden="true">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={`${label}-3`}>
                <span className="marquee-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
