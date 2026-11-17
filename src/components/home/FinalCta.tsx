import React from "react";
import { siteConfig } from "@/config/site";
import { StarSky } from "./StarSky";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section id="start" className={styles.final} aria-labelledby="final-heading">
      <StarSky density={0.6} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Ascend by Included VC</p>
        <h2 id="final-heading" className={styles.heading}>
          Start the year in the room.
        </h2>
        <p className={styles.body}>
          The first Tuesday of 2027, 16:00 UK time. Fourteen live weeks follow. About ten minutes to
          enrol. Enrolment closes Monday 4 January.
        </p>
        <a href={siteConfig.cta.enrol} className={styles.button}>
          Take your seat
        </a>
      </div>
    </section>
  );
}
