import React from "react";
import { ALUMNI_DOTS, ALUMNI_LOGOS } from "./alumniData";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./Alumni.module.css";

export function Alumni() {
  return (
    <section id="alumni" className={styles.alumni} aria-labelledby="alumni-heading">
      <div className={`container ${styles.head}`}>
        <div>
          <p className={styles.eyebrow}>Where our alumni work</p>
          <h2 id="alumni-heading" className={styles.heading}>
            Where Included VC Fellows work now.
          </h2>
        </div>
        <p className={styles.body}>
          Firms that alumni of our Fellowship have joined. Ascend is new and does not guarantee a
          job.
        </p>
      </div>

      {/* Same globe-to-grid scroll animation as the partner section. */}
      <LogoGlobe logos={ALUMNI_LOGOS} dots={ALUMNI_DOTS} imageDir="/alumni" className={styles.globe}>
        <ul className={styles.grid}>
          {ALUMNI_LOGOS.map((l) => (
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
