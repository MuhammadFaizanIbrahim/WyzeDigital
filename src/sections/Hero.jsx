import React, { useRef } from "react";
import RedMarks from "../svgs/RedMarks.jsx";
import ButtonArrow from "../svgs/ButtonArrow.jsx";
import HomeButtonLine from "../svgs/HomeButtonLine.jsx";
import HomeBlueStar from "../svgs/HomeBlueStar.jsx";
import HomePinkStar from "../svgs/HomePinkStar.jsx";

export default function Hero() {
  const btnRef = useRef(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

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

  // ✅ Smooth scroll to contact (same effect as other buttons)
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (!target) return;

    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section id="hero" className="relative w-full hero-shell overflow-hidden">
      <div className="mx-auto px-20 md:px-12 lg:px-14 xl:px-30 2xl:px-55 hero-wrap">
        <div className="min-h-[78vh] pb-16 md:pt-24 hero-block">
          <div className="grid gap-10 md:gap-2 lg:gap-15 grid-cols-1 md:grid-cols-2">
            {/* Left content */}
            <div className="relative w-200 hero-left">
              <h1 className="home-banner-title-one relative">
                <span className="relative inline-block">
                  Scale Your <br /> Agency Without
                  <RedMarks className="hero-redmarks absolute right-20 lg:right-25 xl:right-27 2xl:right-50 -top-2 h-6 w-6 md:h-10 md:w-10" />
                </span>
                <br />
                Hiring a Team
              </h1>

              <p className="home-banner-description-text mt-6 w-125 md:w-85 lg:w-125 hero-desc">
                White-label design, development, SEO, and growth fulfillment —
                delivered under your brand, invisible to your clients.
              </p>

              <div className="mt-8">
                <a
                  href="#contact"
                  ref={btnRef}
                  className="btn-primary btn-magnet relative"
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  onClick={handleClick}
                >
                  <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                    <HomeButtonLine className="h-5.75 w-4.75" />
                  </span>

                  <span className="btn-label">Scale Today</span>

                  <span className="btn-arrow h-7 w-7 items-center justify-center">
                    <ButtonArrow className="h-2.25 w-2.75" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right content - Video container */}
            <div className="relative md:-mt-8 md:w-[400px] lg:-mt-8 lg:w-[500px] xl:-mt-14 xl:w-[600px] 2xl:-mt-14 2xl:w-[41.667vw] rounded-2xl overflow-hidden">
              <video
                className="w-full h-auto object-cover"
                src="/videos/hero_video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          <div className="pointer-events-none mt-7 md:mt-4 md:ml-100 2xl:-mt-25 2xl:ml-[30.208vw] flex justify-start">
            <span className="blue-star-rotator">
              <HomePinkStar className="blue-star-pulser h-20 md:h-24 w-auto select-none" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}