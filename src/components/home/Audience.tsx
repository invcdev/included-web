import React from "react";
import type { SiteContent } from "@/content/schema";
import styles from "./Audience.module.css";

export function Audience({ content: c }: { content: SiteContent["audience"] }) {
  return (
    <section id="who-its-for" className={styles.audience} aria-labelledby="audience-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="audience-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <ul className={styles.cards}>
          {c.groups.map((g) => (
            <li key={g.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{g.title}</h3>
              <p className={styles.cardText}>{g.text}</p>
              <ul className={styles.tags} aria-label={`${g.title}: who this suits`}>
                {g.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
