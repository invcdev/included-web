import React from "react";
import type { SiteContent } from "@/content/schema";
import { StarSky } from "./StarSky";
import styles from "./FinalCta.module.css";

export function FinalCta({ content: c }: { content: SiteContent["finalCta"] }) {
  return (
    <section id="start" className={styles.final} aria-labelledby="final-heading">
      <StarSky density={0.6} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="final-heading" className={styles.heading}>
          {c.heading}
        </h2>
        <p className={styles.body}>{c.body}</p>
        <a href={c.cta.href} className={styles.button}>
          {c.cta.label}
        </a>
      </div>
    </section>
  );
}
