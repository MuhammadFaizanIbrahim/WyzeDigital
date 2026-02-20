import React, { useState } from "react";
import HomeButtonLine from "../svgs/HomeButtonLine";
import ButtonArrow from "../svgs/ButtonArrow";
import HomePinkStar from "../svgs/HomePinkStar";

export default function ContactFormSection({ className = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    timeline: "2 weeks",
    budget: "$5,000 - $10,000",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submit project:", form);
  };

  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${((x - 0.5) * 12).toFixed(2)}px`);
    el.style.setProperty("--my", `${((y - 0.5) * 6).toFixed(2)}px`);
  };

  const handleLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
  };

  return (
    <section className={["contact-section", className].join(" ")}>
      <div className="contact-container">
        <div className="contact-hero">
          {/* Pink stars */}
          <div className="contact-pinkstar contact-pinkstar-left" aria-hidden="true">
            <span className="contact-pinkstar-rotator">
              <HomePinkStar className="contact-pinkstar-inner" />
            </span>
          </div>

          <div className="contact-pinkstar contact-pinkstar-right" aria-hidden="true">
            <span className="contact-pinkstar-rotator">
              <HomePinkStar className="contact-pinkstar-inner" />
            </span>
          </div>

          <h2 className="contact-title">Connect today and scale away!</h2>
          <p className="contact-subtitle">
            Have a project in mind? Let’s connect and bring your digital ideas to life — the brutalist way.
          </p>

          <div className="contact-actions">
            <a
              href="#contact-form"
              className="btn-primary btn-magnet relative"
              style={{ "--btn-fg": "#A765E2" }}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                <HomeButtonLine className="h-5.75 w-4.75" />
              </span>
              <span className="btn-label">Book a project</span>
              <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                <ButtonArrow className="h-2.25 w-2.75" />
              </span>
            </a>

            <a
              href="#contact-form"
              className="btn-secondary btn-magnet relative"
              style={{ "--btn-fg": "#111111" }}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="btn-line pointer-events-none absolute -left-1 -top-1.5">
                <HomeButtonLine className="h-5.75 w-4.75" />
              </span>
              <span className="btn-label">Book a call</span>
              <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                <ButtonArrow className="h-2.25 w-2.75" />
              </span>
            </a>
          </div>
        </div>

        {/* ✅ White Form */}
        <div className="contact-form-wrap" id="contact-form">
          <form className="contact-form contact-form-light" onSubmit={onSubmit}>
            <div className="contact-grid">
              <div className="contact-field">
                <label className="contact-label" htmlFor="name">FULL NAME</label>
                <input
                  className="contact-input"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Name Surname"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="email">EMAIL ADDRESS</label>
                <input
                  className="contact-input"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="mail@company.com"
                  autoComplete="email"
                  type="email"
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="timeline">TIMELINE</label>
                <select
                  className="contact-input"
                  id="timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={onChange}
                >
                  <option>ASAP</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                  <option>2–3 months</option>
                </select>
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="budget">BUDGET</label>
                <select
                  className="contact-input"
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                >
                  <option>$2,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $20,000</option>
                  <option>$20,000+</option>
                </select>
              </div>

              <div className="contact-field contact-field-full">
                <label className="contact-label" htmlFor="message">MORE INFORMATION</label>
                <textarea
                  className="contact-textarea"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Hello, I'm looking for an Agency to help me out with..."
                  rows={6}
                />
              </div>
            </div>

            {/* ✅ submit uses btn-primary */}
            <button
              type="submit"
              className="btn-primary btn-magnet contact-submit-btn"
              style={{ "--btn-fg": "#A765E2" }}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                <HomeButtonLine className="h-5.75 w-4.75" />
              </span>
              <span className="btn-label">SUBMIT PROJECT</span>
              <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                <ButtonArrow className="h-2.25 w-2.75" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
