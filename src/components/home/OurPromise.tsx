import React from "react";
import styles from "./OurPromise.module.css";

const PROMISE: [string, string][] = [
  ["Live teaching", " from people who invest for a living"],
  [
    "A curriculum that follows a deal",
    " in the order it happens, from first meeting to exit",
  ],
  ["Real tasks with real feedback", " on your work"],
  ["A room where every question is welcome", ""],
  ["A certificate", " when you complete the programme"],
];

const NOT_PROMISED: [string, string][] = [
  [
    "A job, a promotion or an investment return.",
    " No programme can honestly promise those",
  ],
  [
    "Who you will meet.",
    " Fourteen weeks in one room builds a network, and it belongs to the people who build it",
  ],
  [
    "What follows.",
    " Introductions and roles do happen. They are not ours to guarantee",
  ],
];

export function OurPromise() {
  return (
    <section
      id="our-promise"
      className={styles.promise}
      aria-labelledby="promise-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Our promise</p>
            <h2 id="promise-heading" className={styles.heading}>
              What we promise, and what we can&rsquo;t.
            </h2>
          </div>
          <p className={styles.body}>
            We choose the curriculum and the people who teach it. The rest is in
            your hands.
          </p>
        </div>

        <div className={styles.cards}>
          <section className={styles.card} aria-labelledby="promise-yes">
            <h3 id="promise-yes" className={styles.cardTitle}>
              What we promise
            </h3>
            <ul className={styles.list}>
              {PROMISE.map(([bold, rest]) => (
                <li key={bold} className={styles.item}>
                  <span className={styles.check} aria-hidden="true">
                    <svg viewBox="0 0 22 22">
                      <path d="M6.5 11.4 9.6 14.4 15.6 8" />
                    </svg>
                  </span>
                  <span>
                    <strong>{bold}</strong>
                    {rest}
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
              What we cannot promise
            </h3>
            <ul className={styles.list}>
              {NOT_PROMISED.map(([bold, rest]) => (
                <li key={bold} className={styles.item}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>
                    <strong>{bold}</strong>
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <figure className={styles.quote}>
          <blockquote>
            <p>
              &ldquo;We know what we&rsquo;re putting into it. What people do
              with that is up to them.&rdquo;
            </p>
          </blockquote>
          <figcaption className={styles.attribution}>
            Nikita Thakrar, Founder
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
