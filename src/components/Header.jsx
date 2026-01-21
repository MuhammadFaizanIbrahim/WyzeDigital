import React, { useEffect, useState } from "react";
import Logo from "../svgs/Logo.jsx";
import HomeMenuBg from "../svgs/HomeMenuBg.jsx";
import MenuUpLine from "../svgs/MenuUpLine.jsx";
import MenuDownLine from "../svgs/MenuDownLine.jsx";

const nav = ["Home", "About", "Portfolio", "Services", "Blogs"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home"); // Track active menu item

  // lock scroll only when menu open (mobile)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const NavLinks = ({ onClick }) => (
    <nav className="flex items-center gap-0">
      {nav.map((item, i) => {
        const isActive = item === activeMenu; // Check if this item is active

        let rzClass = "nav-rz-0";
        if (i === 1) rzClass = "nav-rz-pos";
        if (i === 3) rzClass = "nav-rz-neg";

        return (
          <a
            key={item}
            href="#"
            onClick={() => {
              setActiveMenu(item); // Set the active menu item when clicked
              onClick();
            }}
            className={[
              "nav-pill-3d relative inline-flex items-center gap-2 px-4 py-2",
              "rounded-pill border border-(--nav-outline)",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200",
              rzClass,
              isActive
                ? "bg-purple-600 text-white"  // Apply purple background to active
                : "bg-white text-[var(--ink)]", // Use the correct CSS variable for text color
            ].join(" ")}
          >
            {isActive ? (
              <span className="absolute inset-0 z-0 pointer-events-none">
                <HomeMenuBg className="h-full w-full rounded-pill" />
              </span>
            ) : null}

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

            {isActive ? (
              <span className="relative z-20 inline-flex items-center gap-1">
                <span className="h-1 w-1 rounded-full" />
                <span className="h-1 w-1 rounded-full" />
              </span>
            ) : null}

            <span
              className={[
                "relative z-20 navigation-link-text",
                isActive ? "text-white" : "text-[var(--ink)]", // Apply white text for active item, default ink color for others
              ].join(" ")}
            >
              {item}
            </span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <header className="w-full header-shell">
      <div className="mx-auto flex items-center justify-between px-75 py-9 header-row">
        {/* Desktop nav (unchanged) */}
        <div className="header-desktop-nav">
          <NavLinks />
        </div>

        {/* Logo (unchanged) */}
        <div className="flex items-center header-logo">
          <Logo className="block h-9 w-[137px]" />
        </div>

        {/* Mobile hamburger (only visible on mobile via CSS) */}
        <button
          type="button"
          className="header-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? "burger-x" : "burger-lines"} aria-hidden="true">
            {!open ? <span /> : null}
          </span>
        </button>
      </div>

      {/* Mobile overlay menu (only active/visible on mobile via CSS) */}
      <div
        id="mobile-nav"
        className={open ? "mobile-menu is-open" : "mobile-menu"}
        aria-hidden={open ? "false" : "true"}
      >
        <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} />

        <div className="mobile-menu-panel">
          {/* Decorative stars like your screenshot */}
          <span className="menu-star menu-star-top-right" aria-hidden="true" />
          <span className="menu-star menu-star-bottom-left" aria-hidden="true" />

          <div className="mobile-menu-nav">
            <NavLinks onClick={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
