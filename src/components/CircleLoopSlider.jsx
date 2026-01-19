import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CircleLoopSlider({
  size = 200,
  gap = 25,
  speed = 50,
  borderWidth = 3,
  className = "",
}) {
  const baseItems = useMemo(
    () => [
      { src: "/images/circleImg1.png", alt: "Character 1", bg: "#FEB8FF", border: "#A765E2" },
      { src: "/images/circleImg2.png", alt: "Character 2", bg: "#FA6147", border: "#A765E2" },
      { src: "/images/circleImg6.png", alt: "Character 6", bg: "#5CFFF1", border: "#A765E2" },
      { src: "/images/circleImg3.png", alt: "Character 3", bg: "#F0C61A", border: "#A765E2" },
      { src: "/images/circleImg4.png", alt: "Character 4", bg: "#FA6147", border: "#A765E2" },
      { src: "/images/circleImg5.png", alt: "Character 5", bg: "#5CFFF1", border: "#A765E2" },
    ],
    []
  );

  const viewportRef = useRef(null);
  const firstSetRef = useRef(null);
  const [loopPx, setLoopPx] = useState(0);
  const [repeatCount, setRepeatCount] = useState(2);

  // ✅ build a longer set by repeating your base items
  const items = useMemo(() => {
    const out = [];
    for (let i = 0; i < repeatCount; i++) out.push(...baseItems);
    return out;
  }, [baseItems, repeatCount]);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current) return;

      const vpW = viewportRef.current.getBoundingClientRect().width;

      // estimate how wide one base set is
      const approxBaseSetW = baseItems.length * size + (baseItems.length - 1) * gap;

      // ✅ ensure one set is comfortably wider than viewport
      const neededRepeats = Math.max(2, Math.ceil((vpW * 1.6) / approxBaseSetW));

      if (neededRepeats !== repeatCount) {
        setRepeatCount(neededRepeats);
        return;
      }

      if (!firstSetRef.current) return;
      const w = firstSetRef.current.getBoundingClientRect().width;
      setLoopPx(Math.max(0, Math.round(w)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [baseItems, gap, size, repeatCount]);

  return (
    <section className={["w-full overflow-hidden -mt-4", className].join(" ")}>
      <div
        ref={viewportRef}
        className="circle-loop-viewport"
        style={{
          ["--circle-size"]: `${size}px`,
          ["--circle-gap"]: `${gap}px`,
          ["--circle-speed"]: `${speed}s`,
          ["--circle-border"]: `${borderWidth}px`,
          ["--circle-loop-px"]: `${loopPx}px`,
          ["--circle-play"]: loopPx > 0 ? "running" : "paused",
        }}
      >
        <div className="circle-loop-track">
          {/* First set (measured) */}
          <div ref={firstSetRef} className="circle-loop-set">
            {items.map((it, idx) => (
              <div
                key={`${it.src}-${idx}`}
                className="circle-loop-item"
                style={{ background: it.bg, borderColor: it.border }}
              >
                <img src={it.src} alt={it.alt} className="circle-loop-img" draggable={false} />
              </div>
            ))}
          </div>

          {/* Second set */}
          <div className="circle-loop-set" aria-hidden="true">
            {items.map((it, idx) => (
              <div
                key={`${it.src}-dup-${idx}`}
                className="circle-loop-item"
                style={{ background: it.bg, borderColor: it.border }}
              >
                <img src={it.src} alt="" className="circle-loop-img" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
