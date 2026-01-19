import React, { useRef } from "react";
import RedMarks from "../svgs/RedMarks.jsx";
import ButtonArrow from "../svgs/ButtonArrow.jsx";
import HomeButtonLine from "../svgs/HomeButtonLine.jsx";
import HomeBlueStar from "../svgs/HomeBlueStar.jsx";

export default function Hero() {
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
    <section className="relative w-full">
      <div className="mx-auto px-75">
        <div className="min-h-[78vh] pb-16 pt-20 md:pt-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left content */}
            <div className="relative w-220">
              <h1 className="home-banner-title-one relative">
                <span className="relative inline-block">
                  Where chaos meets
                  <RedMarks className="absolute -right-14 -top-2 hidden h-10 w-10 md:block" />
                </span>
                <br />
                clean design
              </h1>

              <p className="home-banner-description-text mt-6 w-125">
                We craft raw, honest, and impactful digital experiences that
                make your brand stand out in a world of sameness.
              </p>

              <div className="mt-8">
                <a
                  href="#"
                  ref={btnRef}
                  className="btn-primary btn-magnet relative"
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  {/* ✅ line above button (rises on hover) */}
                  <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                    <HomeButtonLine className="h-5.75 w-4.75" />
                  </span>

                  {/* ✅ text that follows mouse */}
                  <span className="btn-label">Book a Project</span>

                  <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center text-white">
                    <ButtonArrow className="h-2.25 w-2.75" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right empty space like screenshot */}
            <div className="hidden md:block" />
          </div>

          {/* ✅ replace teal svg with your blue star asset */}
          <div className="pointer-events-none mt-20 ml-70 flex justify-start">
            <span className="blue-star-rotator">
              <HomeBlueStar className="blue-star-pulser h-18 w-auto select-none" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
