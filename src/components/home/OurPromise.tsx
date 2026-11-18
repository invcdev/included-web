import React from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./OurPromise.module.css";

export function OurPromise({ content: c }: { content: SiteContent["promise"] }) {
  return (
    <section
      id="our-promise"
      className={styles.promise}
      aria-labelledby="promise-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="promise-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <div className={styles.cards}>
          <section className={styles.card} aria-labelledby="promise-yes">
            <h3 id="promise-yes" className={styles.cardTitle}>
              {c.promiseTitle}
            </h3>
            <ul className={styles.list}>
              {c.promises.map((item, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.check} aria-hidden="true">
                    <svg viewBox="0 0 22 22">
                      <path d="M6.5 11.4 9.6 14.4 15.6 8" />
                    </svg>
                  </span>
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`${styles.card} ${styles.cardDark}`}
            aria-labelledby="promise-no"
          >
            <h3 id="promise-no" className={styles.cardTitle}>
              {c.cannotTitle}
            </h3>
            <ul className={styles.list}>
              {c.cannot.map((item, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <figure className={styles.quote}>
          <blockquote>
            <p>{c.quote}</p>
          </blockquote>
          <figcaption className={styles.attribution}>
            {c.attribution}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
