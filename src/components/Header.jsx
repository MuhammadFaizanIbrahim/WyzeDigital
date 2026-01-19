import React from "react";
import Logo from "../svgs/Logo.jsx";
import HomeMenuBg from "../svgs/HomeMenuBg.jsx";
import MenuUpLine from "../svgs/MenuUpLine.jsx";
import MenuDownLine from "../svgs/MenuDownLine.jsx";

const nav = ["Home", "About", "Portfolio", "Services", "Blogs"];

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex items-center justify-between px-75 py-9">
        <nav className="flex items-center gap-0">
          {nav.map((item, i) => {
            const isActive = item === "Home";

            // ✅ EXACT initial rotations per inspect:
            // 1: 0deg, 2: +9deg, 3: 0deg, 4: -9deg, 5: 0deg
            let rzClass = "nav-rz-0";
            if (i === 1) rzClass = "nav-rz-pos";
            if (i === 3) rzClass = "nav-rz-neg";

            return (
              <a
                key={item}
                href="#"
                className={[
                  "nav-pill-3d relative inline-flex items-center gap-2 px-4 py-2",
                  "rounded-pill border border-(--nav-outline)",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200",
                  rzClass,
                  isActive
                    ? "text-white"
                    : "bg-white text-(--ink)",
                ].join(" ")}
              >
                {/* ✅ SVG BG only for active Home */}
                {isActive ? (
                  <span className="absolute inset-0 z-0 pointer-events-none">
                    <HomeMenuBg className="h-full w-full rounded-pill" />
                  </span>
                ) : null}

                {/* ✅ Doodles */}
                {i === 1 ? (
                  <span className="nav-doodle nav-doodle-top-left z-10">
                    <MenuUpLine />
                  </span>
                ) : null}

                {i === 3 ? (
                  <span className="nav-doodle nav-doodle-bottom-left z-10">
                    <MenuDownLine />
                  </span>
                ) : null}

                {/* ✅ Two dots inside active Home pill */}
                {isActive ? (
                  <span className="relative z-20 inline-flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full" />
                    <span className="h-1 w-1 rounded-full" />
                  </span>
                ) : null}

                {/* ✅ Nav font token class */}
                <span
                  className={[
                    "relative z-20 navigation-link-text",
                    isActive ? "text-white" : "",
                  ].join(" ")}
                >
                  {item}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Logo */}
        <div className="flex items-center">
          <Logo className="block h-9 w-[137px]" />
        </div>
      </div>
    </header>
  );
}
