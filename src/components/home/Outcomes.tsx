import React from "react";
import type { SiteContent } from "@/content/schema";
import { Testimonial } from "./Testimonial";

// Top-edge colours are points on the brand spectrum, in card order.
const ACCENTS = ["var(--sp1)", "var(--sp3)", "var(--sp5)", "var(--sp7)"];
import styles from "./Outcomes.module.css";

export function Outcomes({ content: c, accents = ACCENTS }: { content: SiteContent["outcomes"]; accents?: string[] }) {
  return (
    <section id="what-you-leave-with" className={styles.outcomes} aria-labelledby="outcomes-heading">
      <div className="container">
        <h2 id="outcomes-heading" className={styles.heading}>
          {c.heading}
        </h2>
        <ul className={styles.cards}>
          {c.cards.map((o, i) => (
            <li
              key={o.title}
              className={styles.card}
              style={{ "--accent": accents[i % accents.length] } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>{o.title}</h3>
              <p className={styles.cardText}>{o.text}</p>
            </li>
          ))}
        </ul>

        <Testimonial
          className={styles.testimonial}
          {...c.testimonial}
          quoteWidth={660}
        />
      </div>
    </section>
  );
}
