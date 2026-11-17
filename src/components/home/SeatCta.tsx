import React from "react";
import { siteConfig } from "@/config/site";
import { Testimonial } from "./Testimonial";
import styles from "./SeatCta.module.css";

type Props = {
  id: string;
  /** Optional testimonial above the card. */
  testimonial?: React.ComponentProps<typeof Testimonial>;
  /** Each entry is a line on desktop; they run together on phones. */
  heading: string[];
  note: string;
  /** Border gradient (left to right) for the CTA card. */
  border: string;
  /** Soft lavender ring around the button. */
  ring?: boolean;
  /** Space above the band, in px (when it follows a section without bottom padding). */
  topSpace?: number;
};

/** Testimonial + "Take your seat" card with a gradient border and spectrum glow. */
export function SeatCta({ id, testimonial, heading, note, border, ring, topSpace }: Props) {
  return (
    <section
      id={id}
      className={testimonial ? styles.band : `${styles.band} ${styles.solo}`}
      aria-label="Take your seat"
      style={topSpace !== undefined ? { paddingTop: topSpace } : undefined}
    >
      <div className="container">
        {testimonial && <Testimonial {...testimonial} />}

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
