import React from "react";
import { GLOBE_DOTS, GLOBE_LOGOS, type PartnerGroup } from "./globeData";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./NetworkGlobe.module.css";

const GROUPS: { id: PartnerGroup; eyebrow: string; heading: string }[] = [
  { id: "global", eyebrow: "Global partners", heading: "The funds changing who gets to invest." },
  { id: "africa", eyebrow: "Africa partners", heading: "Building the continent’s investment industry." },
];

/** Partner globe that turns into the partner grid (two groups) on scroll. */
export function NetworkGlobe() {
  return (
    <LogoGlobe logos={GLOBE_LOGOS} dots={GLOBE_DOTS} imageDir="/partners">
      <div className={styles.grid}>
        {GROUPS.map((g) => (
          <section key={g.id} className={styles.group} aria-labelledby={`partners-${g.id}`}>
            <p className={styles.eyebrow} data-reveal>
              {g.eyebrow}
            </p>
            <h3 id={`partners-${g.id}`} className={styles.groupHeading} data-reveal>
              {g.heading}
            </h3>
            <ul className={styles.slots}>
              {GLOBE_LOGOS.filter((l) => l.group === g.id).map((l) => (
                <li
                  key={l.slug}
                  data-slot={l.slug}
                  className={styles.slot}
                  style={{ "--w": l.w, "--h": l.h } as React.CSSProperties}
                >
                  <span className="sr-only">{l.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </LogoGlobe>
  );
}
