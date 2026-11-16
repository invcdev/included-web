import React from "react";
import styles from "./Testimonial.module.css";

type Props = {
  quote: React.ReactNode;
  name: string;
  role: string;
  /** Max width of the quote, to match where each quote breaks in the design. */
  quoteWidth?: number;
  className?: string;
};

export function Testimonial({ quote, name, role, quoteWidth = 460, className }: Props) {
  return (
    <figure className={className ? `${styles.testimonial} ${className}` : styles.testimonial}>
      <div>
        <span className={styles.bar} aria-hidden="true" />
        <blockquote className={styles.quote} style={{ maxWidth: quoteWidth }}>
          <p>{quote}</p>
        </blockquote>
      </div>
      <figcaption className={styles.person}>
        {/* TODO: swap the gradient placeholder for a photo if there is one. */}
        <span className={styles.avatar} aria-hidden="true" />
        <span className={styles.personText}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
