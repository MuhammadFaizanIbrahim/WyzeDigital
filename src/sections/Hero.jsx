import React, { useRef } from "react";
import RedMarks from "../svgs/RedMarks.jsx";
import ButtonArrow from "../svgs/ButtonArrow.jsx";
import HomeButtonLine from "../svgs/HomeButtonLine.jsx";
import HomeBlueStar from "../svgs/HomeBlueStar.jsx";
import HomePinkStar from "../svgs/HomePinkStar.jsx";

export default function Hero() {
  const btnRef = useRef(null);

  const handleMove = (e) => {
    const el = btnRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    const dx = (x - 0.5) * 12;
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
    <section className="relative w-full hero-shell">
      <div className="mx-auto px-75 hero-wrap">
        <div className="min-h-[78vh] pb-16 pt-20 md:pt-24 hero-block">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left content */}
            <div className="relative w-200 hero-left">
              <h1 className="home-banner-title-one relative">
                <span className="relative inline-block hero-title-line">
                  Where chaos meets clean
                  {/* show on mobile too, but different placement via CSS */}
                  <RedMarks className="hero-redmarks absolute right-50 -top-2 h-10 w-10" />
                </span>
                <br />
                design
              </h1>

              <p className="home-banner-description-text mt-6 w-125 hero-desc">
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
                  <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                    <HomeButtonLine className="h-5.75 w-4.75" />
                  </span>

                  <span className="btn-label">Book a Project</span>

                  {/* remove inline-flex + text-white duplication (CSS handles arrow layout/colors) */}
                  <span className="btn-arrow h-7 w-7 items-center justify-center">
                    <ButtonArrow className="h-2.25 w-2.75" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right empty space like screenshot */}
            <div className="hidden md:block" />
          </div>

          <div className="pointer-events-none mt-10 ml-140 flex justify-start hero-star-row">
            <span className="pink-star-rotator">
              <HomePinkStar className="pink-star-pulser h-24 w-auto select-none" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
