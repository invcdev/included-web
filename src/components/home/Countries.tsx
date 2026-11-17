import React from "react";
import { FLAG_DOTS, FLAG_SPHERE, FLAGS } from "./flagData";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./Countries.module.css";

export function Countries() {
  return (
    <section id="countries" className={styles.countries} aria-labelledby="countries-heading">
      {/* Same globe-to-grid scroll animation as the partner and alumni sections.
          Here the heading and caption stay pinned with the globe. */}
      <LogoGlobe
        logos={FLAGS}
        dots={FLAG_DOTS}
        shape={FLAG_SPHERE}
        imageDir="/flags"
        fitViewport
        before={
          <div className={`container ${styles.head}`}>
            <p className={styles.eyebrow}>Applications from across the world</p>
            <h2 id="countries-heading" className={styles.heading}>
              Ambition knows no borders.
            </h2>
            <p className={styles.body}>
              People from more than 100 countries have applied to Included VC. Wherever you are,
              you belong in this room.
            </p>
          </div>
        }
        after={<p className={styles.caption}>100+ countries, and counting</p>}
      >
        <div className={styles.end}>
          <ul className={styles.grid} aria-label="Some of the countries people have applied from">
            {FLAGS.map((f) => (
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
