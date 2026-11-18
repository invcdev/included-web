import React from "react";
import type { SiteContent } from "@/content/schema";
import { FLAG_DOTS, FLAG_SPHERE, FLAGS } from "./flagData";
import { placeLogos } from "./globeLayout";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./Countries.module.css";

export function Countries({ content: c }: { content: SiteContent["countries"] }) {
  const placed = placeLogos(FLAG_SPHERE, FLAGS, c.flags);
  return (
    <section id="countries" className={styles.countries} aria-labelledby="countries-heading">
      {/* Same globe-to-grid scroll animation as the partner and alumni sections.
          Here the heading and caption stay pinned with the globe. */}
      <LogoGlobe
        logos={placed}
        dots={FLAG_DOTS}
        shape={FLAG_SPHERE}
        fitViewport
        before={
          <div className={`container ${styles.head}`}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="countries-heading" className={styles.heading}>
              {c.heading}
            </h2>
            <p className={styles.body}>{c.body}</p>
          </div>
        }
        after={<p className={styles.caption}>{c.caption}</p>}
      >
        <div className={styles.end}>
          <ul className={styles.grid} aria-label="Some of the countries people have applied from">
            {placed.map((f) => (
              <li key={f.slug} className={styles.cell}>
                <span
                  data-slot={f.slug}
                  className={styles.slot}
                  style={{ "--w": f.w, "--h": f.h } as React.CSSProperties}
                >
                  <span className="sr-only">{f.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </LogoGlobe>
    </section>
  );
}
