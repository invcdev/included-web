import React from "react";
import { siteConfig } from "@/config/site";
import { Testimonial } from "./Testimonial";
import styles from "./SeatCta.module.css";

type Props = {
  id: string;
  testimonial: React.ComponentProps<typeof Testimonial>;
  /** Each entry is a line on desktop; they run together on phones. */
  heading: string[];
  note: string;
  /** Border gradient (left to right) for the CTA card. */
  border: string;
  /** Soft lavender ring around the button. */
  ring?: boolean;
};

/** Testimonial + "Take your seat" card with a gradient border and spectrum glow. */
export function SeatCta({ id, testimonial, heading, note, border, ring }: Props) {
  return (
    <section id={id} className={styles.band} aria-label="Take your seat">
      <div className="container">
        <Testimonial {...testimonial} />

        <div className={styles.cta} style={{ "--cta-border": border } as React.CSSProperties}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaHeading}>
              {heading.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 && " "}
                  <span>{line}</span>
                </React.Fragment>
              ))}
            </h2>
            <p className={styles.ctaNote}>{note}</p>
          </div>
          <a
            href={siteConfig.cta.enrol}
            className={ring ? `${styles.primaryBtn} ${styles.ringed}` : styles.primaryBtn}
          >
            Take your seat
          </a>
        </div>
      </div>
    </section>
  );
}
