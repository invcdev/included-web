import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import styles from "./FounderLetter.module.css";

export function FounderLetter({ content: c }: { content: SiteContent["founderLetter"] }) {
  return (
    <section id="founder-letter" className={styles.letter} aria-labelledby="founder-letter-heading">
      <div className={`container ${styles.inner}`}>
        <figure className={styles.media}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.frame}>
            <Image
              src={c.photo.url}
              alt={c.photo.alt}
              width={c.photo.width}
              height={c.photo.height}
              className={styles.photo}
            />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.name}>{c.name}</span>
            <span className={styles.role}>{c.role}</span>
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <blockquote className={styles.quote}>
            <p id="founder-letter-heading">{c.quote}</p>
          </blockquote>
          <p className={styles.body}>{c.body}</p>
          <p className={styles.kicker}>{c.kicker}</p>
          <div className={styles.ctas}>
            <a href={c.primaryCta.href} className={styles.primaryBtn}>
              {c.primaryCta.label}
            </a>
            <a href={c.secondaryCta.href} className={styles.secondaryBtn}>
              {c.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
