import React from "react";
import type { SiteContent } from "@/content/schema";
import { Kicker } from "./Kicker";
import styles from "./Join.module.css";

export function Join({ content: c }: { content: SiteContent["join"] }) {
  return (
    <section id="how-to-join" className={styles.join} aria-labelledby="join-heading">
      <div className="container">
        <Kicker step={c.kicker.step} label={c.kicker.label} />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="join-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <ol className={styles.steps}>
          {/* The design has three steps (step1-3 styles), then the final panel. */}
          {c.steps.slice(0, 3).map((s, i) => (
            <li key={i} className={`${styles.step} ${styles[`step${i + 1}`]}`}>
              <span className={styles.num} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
          <li className={`${styles.step} ${styles.step4}`}>
            <svg className={styles.arrow} viewBox="0 0 32 26" aria-hidden="true">
              <path d="M2 13h26M17 2.5 28 13 17 23.5" />
            </svg>
            <h3 className={styles.stepTitle}>{c.final.title}</h3>
            <p className={styles.stepText}>{c.final.text}</p>
            <a href={c.final.cta.href} className={styles.seatBtn}>
              {c.final.cta.label}
            </a>
          </li>
        </ol>

        <ul className={styles.payments} aria-label="Ways to pay">
          {c.payments.map((p) => (
            <li key={p} className={styles.payment}>
              {p}
            </li>
          ))}
        </ul>

        <div className={styles.question}>
          <div>
            <h3 className={styles.questionTitle}>{c.question.title}</h3>
            <p className={styles.questionText}>{c.question.text}</p>
          </div>
          <a href={c.question.cta.href} className={styles.questionBtn}>
            {c.question.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
