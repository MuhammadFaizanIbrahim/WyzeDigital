import React, { useMemo } from "react";
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

  return (
    <section className={["services-section", className].join(" ")}>
      <div className="services-container">
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

        <div className="services-list">
          {cards.map((c) => (
            <div key={c.num} className="service-card">
              <div className="service-card-inner">
                <div className="service-num">{c.num}</div>
                <div className="service-main">{c.title}</div>
                <div className="service-desc">{c.desc}</div>
              </div>

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
