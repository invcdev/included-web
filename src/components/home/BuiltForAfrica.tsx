import React from "react";
import type { SiteContent } from "@/content/schema";
import styles from "./Audience.module.css";
import own from "./BuiltForAfrica.module.css";

/** Ascend Africa: why the track exists. Four numbered cards, styled like "Who it is for". */
export function BuiltForAfrica({ content: c }: { content: SiteContent["africaBuilt"] }) {
  return (
    <section id="built-for-africa" className={`${styles.audience} ${own.section}`} aria-labelledby="built-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="built-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>
        <ol className={`${styles.cards} ${own.cards}`}>
          {c.cards.map((card, i) => (
            <li key={i} className={styles.card}>
              <span className={own.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
