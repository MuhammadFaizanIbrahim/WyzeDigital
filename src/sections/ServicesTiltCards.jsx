import React, { useMemo, useRef, useState, useEffect } from "react";
import RedMarks from "../svgs/RedMarks";

export default function ServicesTiltCards({ className = "" }) {
  const cards = useMemo(
    () => [
      {
        num: "001",
        title: "UI/UX design",
        desc: "Intuitive, engaging, and user-focused interfaces.",
        popImg: "/images/Services1.png",
      },
      {
        num: "002",
        title: "Custom illustration",
        desc: "Unique visuals tailored to your brand.",
        popImg: "/images/Services2.png",
      },
      {
        num: "003",
        title: "Web development",
        desc: "Fast, responsive, and scalable websites.",
        popImg: "/images/Services3.png",
      },
      {
        num: "004",
        title: "Digital marketing",
        desc: "Strategies that boost reach and engagement.",
        popImg: "/images/Services4.png",
      },
      {
        num: "005",
        title: "Brand identity",
        desc: "Cohesive visuals that define your presence.",
        popImg: "/images/Services5.png",
      },
    ],
    []
  );

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const rafRef = useRef(0);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  // store per-card smoothed tilt in refs
  const tiltRef = useRef(
    cards.map(() => ({
      rx: 0,
      ry: 0,
      tx: 0,
      ty: 0,
      prx: 0,
      pry: 0,
      ptx: 0,
      pty: 0,
    }))
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  // ✅ smoother + slower easing (premium)
  const FOLLOW = 0.085; // lower = smoother/longer ease

  const tick = () => {
    const list = tiltRef.current;

    let anyMoving = false;

    for (let i = 0; i < list.length; i++) {
      const t = list[i];

      t.prx += (t.rx - t.prx) * FOLLOW;
      t.pry += (t.ry - t.pry) * FOLLOW;
      t.ptx += (t.tx - t.ptx) * FOLLOW;
      t.pty += (t.ty - t.pty) * FOLLOW;

      const el = cardRefs.current[i];
      if (!el) continue;

      el.style.setProperty("--rx", `${t.prx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${t.pry.toFixed(3)}deg`);
      el.style.setProperty("--tx", `${t.ptx.toFixed(3)}px`);
      el.style.setProperty("--ty", `${t.pty.toFixed(3)}px`);

      // keep RAF running only while something is still easing
      if (
        Math.abs(t.rx - t.prx) > 0.01 ||
        Math.abs(t.ry - t.pry) > 0.01 ||
        Math.abs(t.tx - t.ptx) > 0.05 ||
        Math.abs(t.ty - t.pty) > 0.05
      ) {
        anyMoving = true;
      }
    }

    if (anyMoving) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
    }
  };

  const ensureRAF = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  // ✅ fixed hover pose (down-left)
  const setHoverPose = (idx, on) => {
    const t = tiltRef.current[idx];
    if (!t) return;

    if (reduceMotion) {
      // no motion: just snap states
      const el = cardRefs.current[idx];
      if (el) {
        el.style.setProperty("--rx", on ? "10deg" : "0deg");
        el.style.setProperty("--ry", on ? "-12deg" : "0deg");
        el.style.setProperty("--tx", on ? "-12px" : "0px");
        el.style.setProperty("--ty", on ? "10px" : "0px");
      }
      return;
    }

    // 🔥 tune these values to match screenshot feel
    if (on) {
      t.rx = 10; // down tilt (rotateX positive = bottom toward viewer)
      t.ry = -12; // left tilt (negative rotateY = left toward viewer)
      t.tx = -14; // pop image drifts left
      t.ty = 10; // pop image drifts down
    } else {
      t.rx = 0;
      t.ry = 0;
      t.tx = 0;
      t.ty = 0;
    }

    ensureRAF();
  };

  const onEnter = (idx) => {
    setActiveIdx(idx);
    setHoverPose(idx, true);
  };

  const onLeave = (idx) => {
    setActiveIdx(-1);
    setHoverPose(idx, false);
  };

  return (
    <section className={["services-section", className].join(" ")}>
      <div className="services-container">
        {/* Header row */}
        <div className="services-header">
          <h2 className="services-title">
            What we{" "}
            <span className="services-title-do">
              do
              <RedMarks className="services-title-marks" />
            </span>
            <br />
            differently here
          </h2>

          <p className="services-subtitle">
            From design systems to web development, we create distinct visuals
            that amplify your digital presence.
          </p>
        </div>

        {/* Cards */}
        <div className="services-list">
          {cards.map((c, idx) => (
            <div
              key={c.num}
              ref={(node) => (cardRefs.current[idx] = node)}
              className={[
                "service-card",
                activeIdx === idx ? "is-active" : "",
              ].join(" ")}
              onPointerEnter={() => onEnter(idx)}
              onPointerLeave={() => onLeave(idx)}
            >
              {/* content */}
              <div className="service-card-inner">
                <div className="service-num">{c.num}</div>
                <div className="service-main">{c.title}</div>
                <div className="service-desc">{c.desc}</div>
              </div>

              {/* pop image */}
              <div className="service-pop" aria-hidden="true">
                <img
                  className="service-pop-img"
                  src={c.popImg}
                  alt=""
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
