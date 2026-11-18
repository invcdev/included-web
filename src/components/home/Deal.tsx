import React from "react";
import type { SiteContent } from "@/content/schema";
import { Kicker } from "./Kicker";
import styles from "./Deal.module.css";

// Bar colours, in order: purple, cyan, lime.
const BARS = ["var(--brand)", "#6BE7FB", "var(--lime)"];

export function Deal({ content: c }: { content: SiteContent["deal"] }) {
  return (
    <section id="the-deal" className={styles.deal} aria-labelledby="deal-heading">
      <div className="container">
        <Kicker step={c.kicker.step} label={c.kicker.label} />

        <div className={styles.panel}>
          <div className={styles.intro}>
            <h2 id="deal-heading" className={styles.heading}>
              {c.heading}
            </h2>
            <p className={styles.body}>{c.body}</p>
          </div>

          <ul className={styles.terms}>
            {c.terms.map((t, i) => (
              <li
                key={i}
                className={styles.term}
                style={{ "--bar": BARS[i % BARS.length] } as React.CSSProperties}
              >
                <h3 className={styles.termTitle}>{t.title}</h3>
                <p className={styles.termText}>{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
