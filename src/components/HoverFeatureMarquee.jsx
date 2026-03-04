import React, { useMemo } from "react";

import MarqueeIconTransparentProcess from "../svgs/MarqueeIconTransparentProcess.jsx";
import MarqueeIconScalableGrowth from "../svgs/MarqueeIconScalableGrowth.jsx";
import MarqueeIconUserCentric from "../svgs/MarqueeIconUserCentric.jsx";
import MarqueeIconBoldCreativity from "../svgs/MarqueeIconBoldCreativity.jsx";
import MarqueeIconFastDelivery from "../svgs/MarqueeIconFastDelivery.jsx";

export default function HoverFeatureMarquee({ className = "" }) {
  const items = useMemo(
    () => [
      { label: "Transparent process", Icon: MarqueeIconTransparentProcess },
      { label: "Scalable growth", Icon: MarqueeIconScalableGrowth },
      { label: "User-centric design", Icon: MarqueeIconUserCentric },
      { label: "Bold creativity", Icon: MarqueeIconBoldCreativity },
      { label: "Fast delivery", Icon: MarqueeIconFastDelivery },
    ],
    []
  );

  return (
    <section className={["feature-marquee", className].join(" ")}>
      <div className="feature-marquee-viewport">
        <div className="feature-marquee-track feature-marquee-track--auto">
          {/* Set 1 */}
          <div className="feature-marquee-set">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={label}>
                <span className="marquee-icon">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>

          {/* Set 2 */}
          <div className="feature-marquee-set" aria-hidden="true">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={`${label}-2`}>
                <span className="marquee-icon">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>

          {/* Set 3 */}
          <div className="feature-marquee-set" aria-hidden="true">
            {items.map(({ label, Icon }) => (
              <div className="feature-marquee-item" key={`${label}-3`}>
                <span className="marquee-icon">
                  <Icon />
                </span>
                <span className="feature-marquee-text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}