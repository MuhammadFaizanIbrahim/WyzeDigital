import React, { useState } from "react";
import HomeButtonLine from "../svgs/HomeButtonLine";
import ButtonArrow from "../svgs/ButtonArrow";
import HomePinkStar from "../svgs/HomePinkStar";

export default function ContactFormSection({ className = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
          <div
            className="contact-pinkstar contact-pinkstar-left"
            aria-hidden="true"
          >
            <span className="contact-pinkstar-rotator">
              <HomePinkStar className="contact-pinkstar-inner" />
            </span>
          </div>

          <div
            className="contact-pinkstar contact-pinkstar-right"
            aria-hidden="true"
          >
            <span className="contact-pinkstar-rotator">
              <HomePinkStar className="contact-pinkstar-inner" />
            </span>
          </div>

          <h2 id="contact" className="contact-title">
            Connect today and scale away!
          </h2>
          <p className="contact-subtitle">
            Have a project in mind? Let’s connect and bring your digital ideas
            to life — the brutalist way.
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
              <span className="btn-label">Book a Meeting</span>
              <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                <ButtonArrow className="h-2.25 w-2.75" />
              </span>
            </a>

            <a
              href="tel:+16514320692"
              className="btn-secondary btn-magnet relative"
              style={{ "--btn-fg": "#111111" }}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="btn-line pointer-events-none absolute -left-1 -top-1.5">
                <HomeButtonLine className="h-5.75 w-4.75" />
              </span>
              <span className="btn-label">Call Now</span>
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
                <label className="contact-label" htmlFor="name">
                  FULL NAME
                </label>
                <input
                  className="contact-input"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="email">
                  EMAIL ADDRESS
                </label>
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
                <label className="contact-label" htmlFor="name">
                  PHONE NUMBER
                </label>
                <input
                  className="contact-input"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone Number"
                  autoComplete="phone"
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="name">
                  COMPANY NAME
                </label>
                <input
                  className="contact-input"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Company Name"
                  autoComplete="company"
                  required
                />
              </div>

              <div className="contact-field contact-field-full">
                <label className="contact-label" htmlFor="message">
                  MORE INFORMATION
                </label>
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
              disabled={loading}
              className="btn-primary btn-magnet contact-submit-btn"
              style={{
                "--btn-fg": "#A765E2",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="btn-line pointer-events-none absolute -left-1 -top-1.5 text-[#A765E2]">
                <HomeButtonLine className="h-5.75 w-4.75" />
              </span>
              <span className="btn-label">
                {loading ? "SENDING..." : "SUBMIT"}
              </span>
              <span className="btn-arrow inline-flex h-7 w-7 items-center justify-center">
                <ButtonArrow className="h-2.25 w-2.75" />
              </span>
            </button>
            {status.message && (
              <p
                className="mt-3 text-sm font-medium"
                style={{
                  color: status.type === "success" ? "#16a34a" : "#dc2626",
                }}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
