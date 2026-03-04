import React, { useMemo, useRef } from "react";
import RedMarks from "../svgs/RedMarks";

export default function TeamShowcase() {
  const videoRefs = useRef([]);

  const people = useMemo(
    () => [
      {
        name: "Avery",
        role: "Northwood Digital",
        src: "/videos/Avery2.mp4",
      },
      {
        name: "Vien",
        role: "Flourish Software",
        src: "/videos/Vien2.mp4",
      },
      {
        name: "Jason",
        role: "Brandswaggin",
        src: "/videos/Jason2.mp4",
      },
    ],
    []
  );

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
  };

  return (
    <section className="team-section">
      <div className="team-pin">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">
              See what our Agency Partners{" "}
              <span className="team-title-word">
                Have to Say: <RedMarks className="team-title-marks" />
              </span>
            </h2>

            <p className="team-subtitle">
              Trust Wyze Digital to handle your design and development so you
              can focus on growing your awesome business!
            </p>
          </div>

          <div className="team-stage">
            {people.map((p, index) => (
              <article key={p.name} className="team-card">
                <div className="team-card-shell">
                  <div className="team-video">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="team-video-el"
                      src={p.src}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={() => handlePlay(index)}
                    />
                    <div className="team-card-label">
                      <div className="team-card-name">{p.name}</div>
                      <div className="team-card-role">{p.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}