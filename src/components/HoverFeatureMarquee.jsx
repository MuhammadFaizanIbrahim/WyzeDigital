import React, { useMemo, useRef, useLayoutEffect } from "react";

import MarqueeIconTransparentProcess from "../svgs/MarqueeIconTransparentProcess.jsx";
import MarqueeIconScalableGrowth from "../svgs/MarqueeIconScalableGrowth.jsx";
import MarqueeIconUserCentric from "../svgs/MarqueeIconUserCentric.jsx";
import MarqueeIconBoldCreativity from "../svgs/MarqueeIconBoldCreativity.jsx";
import MarqueeIconFastDelivery from "../svgs/MarqueeIconFastDelivery.jsx";

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
  const trackRef = useRef(null);
  const setRef = useRef(null);

  const lastXRef = useRef(0);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);

  /* Measure one set & start centered */
  useLayoutEffect(() => {
    if (!viewportRef.current || !setRef.current) return;

    const w = setRef.current.getBoundingClientRect().width;
    setWidthRef.current = w;

    // Start centered on middle set
    offsetRef.current = -w;
    trackRef.current.style.transform = `translateX(${-w}px)`;
  }, []);

  const onEnter = (e) => {
    lastXRef.current = e.clientX;
  
    // Initial nudge on hover
    const nudge = 20; // tweak this value for how much initial slide
    offsetRef.current -= nudge;
  
    const el = trackRef.current;
    if (el) {
      el.style.transform = `translateX(${offsetRef.current}px)`;
    }
  };
  

  const onMove = (e) => {
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    offsetRef.current += dx * 0.35;

    const w = setWidthRef.current;

    /* 🔁 Seamless wrap */
    if (offsetRef.current > 0) {
      offsetRef.current -= w;
    } else if (offsetRef.current < -w * 2) {
      offsetRef.current += w;
    }

    const el = trackRef.current;
    if (el) {
      el.style.transform = `translateX(${offsetRef.current}px)`;
    }
  };

  const onLeave = () => {
    const w = setWidthRef.current;
    offsetRef.current = -w;

    const el = trackRef.current;
    if (el) {
      el.style.transform = `translateX(${-w}px)`;
    }
  };

  return (
    <section className={["feature-marquee", className].join(" ")}>
      <div
        ref={viewportRef}
        className="feature-marquee-viewport"
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div ref={trackRef} className="feature-marquee-track">
          {/* Set 1 */}
          <div ref={setRef} className="feature-marquee-set">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={label}>
                <span className="marquee-icon">
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
                <span className="marquee-icon">
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
                <span className="marquee-icon">
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
