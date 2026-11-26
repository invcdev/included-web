import React from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Hero.module.css";

export function Hero({
  content: c,
  headingLevel = 1,
}: {
  content: SiteContent["hero"];
  /** 2 when another section above it carries the page's title (the landing page's opening). */
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="what-it-is" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerNum}>{c.kicker.step}</span>
              <span>{c.kicker.label}</span>
            </p>

            <p className={styles.eyebrow}>{c.eyebrow}</p>

            <Heading id="hero-heading" className={styles.heading}>
              {c.heading}
            </Heading>

            <p className={styles.lede}>{c.lede}</p>

            <p className={styles.callout}>
              <RichText text={c.callout} />
            </p>

            <div className={styles.ctas}>
              <a href={c.primaryCta.href} className={styles.primaryBtn}>
                {c.primaryCta.label}
              </a>
              <a href={c.secondaryCta.href} className={styles.textLink}>
                {c.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className={styles.card} aria-labelledby="glance-heading">
            <h2 id="glance-heading" className={styles.cardTitle}>
              {c.glanceTitle}
            </h2>
            <dl className={styles.cardList}>
              {c.glance.map((row) => (
                <div key={row.label} className={styles.cardRow}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className={`${styles.cardRow} ${styles.cardRowPrice}`}>
                <dt>{c.fee.label}</dt>
                <dd className={styles.price}>{c.fee.value}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <ul className={styles.stats}>
          {c.stats.map((s) => (
            <li key={s.value} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          {c.note.text} <a href={c.note.link.href}>{c.note.link.label}</a>
        </p>
      </div>
    </section>
  );
}
