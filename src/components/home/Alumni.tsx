import React from "react";
import type { SiteContent } from "@/content/schema";
import { ALUMNI_DOTS, ALUMNI_LOGOS } from "./alumniData";
import { placeLogos, WIDE_GLOBE } from "./globeLayout";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./Alumni.module.css";

export function Alumni({ content: c }: { content: SiteContent["alumni"] }) {
  const placed = placeLogos(WIDE_GLOBE, ALUMNI_LOGOS, c.firms);
  return (
    <section id="alumni" className={styles.alumni} aria-labelledby="alumni-heading">
      <div className={`container ${styles.head}`}>
        <div>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h2 id="alumni-heading" className={styles.heading}>
            {c.heading}
          </h2>
        </div>
        <p className={styles.body}>{c.body}</p>
      </div>

      {/* Same globe-to-grid scroll animation as the partner section. */}
      <LogoGlobe logos={placed} dots={ALUMNI_DOTS} className={styles.globe}>
        <ul className={styles.grid}>
          {placed.map((l) => (
            <li key={l.slug} className={styles.cell}>
              <span
                data-slot={l.slug}
                className={styles.slot}
                style={{ "--w": l.w, "--h": l.h } as React.CSSProperties}
              >
                <span className="sr-only">{l.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </LogoGlobe>
    </section>
  );
}
