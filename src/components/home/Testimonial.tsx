import React from "react";
import Image from "next/image";
import type { ImageContent } from "@/content/schema";
import styles from "./Testimonial.module.css";

type Props = {
  quote: React.ReactNode;
  name: string;
  role: string;
  /** Photo of the person; the spectrum circle is shown without one. */
  avatar?: ImageContent;
  /** Max width of the quote, to match where each quote breaks in the design. */
  quoteWidth?: number;
  className?: string;
};

export function Testimonial({ quote, name, role, avatar, quoteWidth = 460, className }: Props) {
  return (
    <figure className={className ? `${styles.testimonial} ${className}` : styles.testimonial}>
      <div>
        <span className={styles.bar} aria-hidden="true" />
        <blockquote className={styles.quote} style={{ maxWidth: quoteWidth }}>
          <p>{quote}</p>
        </blockquote>
      </div>
      <figcaption className={styles.person}>
        {avatar ? (
          <Image src={avatar.url} alt="" width={88} height={88} className={styles.avatar} />
        ) : (
          <span className={styles.avatar} aria-hidden="true" />
        )}
        <span className={styles.personText}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
