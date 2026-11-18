import React from "react";
import type { SiteContent } from "@/content/schema";
import { Kicker } from "./Kicker";
import styles from "./Climb.module.css";

export function Climb({ content: c }: { content: SiteContent["climb"] }) {
  return (
    <section id="what-you-will-do" className={styles.climb} aria-labelledby="climb-heading">
      <div className="container">
        <Kicker step={c.kicker.step} label={c.kicker.label} />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="climb-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <ol className={styles.stages}>
          {c.stages.map((s) => (
            <li key={s.n} className={s.highlight ? `${styles.stage} ${styles.stageHighlight}` : styles.stage}>
              <span className={styles.stageNum} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.stageTitle}>{s.title}</h3>
              <p className={styles.stageText}>{s.text}</p>
              {s.note && <p className={styles.stageNote}>{s.note}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
