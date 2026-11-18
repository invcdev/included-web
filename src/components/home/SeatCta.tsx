import React from "react";
import type { SiteContent } from "@/content/schema";
import { Testimonial } from "./Testimonial";
import styles from "./SeatCta.module.css";

type Props = {
  id: string;
  /** Editable text: optional testimonial, heading lines, note and button. */
  content: SiteContent["seatCtas"]["afterIntroducing"];
  /** Border gradient (left to right) for the CTA card. */
  border: string;
  /** Max width of the testimonial quote, to match the design's line breaks. */
  quoteWidth?: number;
  /** Soft lavender ring around the button. */
  ring?: boolean;
  /** Space above the band, in px (when it follows a section without bottom padding). */
  topSpace?: number;
};

/** Testimonial + "Take your seat" card with a gradient border and spectrum glow. */
export function SeatCta({ id, content: c, border, quoteWidth, ring, topSpace }: Props) {
  return (
    <section
      id={id}
      className={c.testimonial ? styles.band : `${styles.band} ${styles.solo}`}
      aria-label={c.button.label}
      style={topSpace !== undefined ? { paddingTop: topSpace } : undefined}
    >
      <div className="container">
        {c.testimonial && <Testimonial {...c.testimonial} quoteWidth={quoteWidth} />}

        <div className={styles.cta} style={{ "--cta-border": border } as React.CSSProperties}>
          <div className={styles.ctaCopy}>
            {/* Each heading entry is a line on desktop; they run together on phones. */}
            <h2 className={styles.ctaHeading}>
              {c.heading.map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && " "}
                  <span>{line}</span>
                </React.Fragment>
              ))}
            </h2>
            <p className={styles.ctaNote}>{c.note}</p>
          </div>
          <a
            href={c.button.href}
            className={ring ? `${styles.primaryBtn} ${styles.ringed}` : styles.primaryBtn}
          >
            {c.button.label}
          </a>
        </div>
      </div>
    </section>
  );
}
