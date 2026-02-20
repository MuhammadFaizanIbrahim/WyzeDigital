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
      <div className="mx-auto px-55 hero-wrap">
        <div className="min-h-[78vh] pb-16 md:pt-24 hero-block">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left content */}
            <div className="relative w-200 hero-left">
              <h1 className="home-banner-title-one relative">
                <span className="relative inline-block">
                Scale Your <br /> Agency Without
                  {/* show on mobile too, but different placement via CSS */}
                  <RedMarks className="hero-redmarks absolute right-20 md:right-50 -top-2 h-6 w-6 md:h-10 md:w-10" />
                </span>
                <br />
                Hiring a Team
              </h1>

              <p className="home-banner-description-text mt-6 w-125 hero-desc">
                White-label design, development, SEO, and growth fulfillment — delivered under your brand, invisible to your clients.
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

            {/* Right content - Video container */}
              <div className="relative lg:-mt-14 lg:w-[800px] rounded-2xl overflow-hidden">
                <video
                  className="w-full h-auto object-cover"
                  src="/videos/hero_video.mp4" // replace with your video path
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
          </div>{" "}
          {/* ✅ CLOSE grid here */}
          <div className="pointer-events-none mt-7 md:-mt-25 md:ml-145 flex justify-start">
            <span className="pink-star-rotator">
              <HomePinkStar className="pink-star-pulser h-20 md:h-24 w-auto select-none" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
