import React from "react";
import type { SiteContent } from "@/content/schema";
import styles from "./Month.module.css";


export function Month({ content: c }: { content: SiteContent["month"] }) {
  return (
    <section id="a-month-in-ascend" className={styles.month} aria-labelledby="month-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="month-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <ol className={styles.weeks}>
          {c.weeks.map((w, i) => (
            <li key={i} className={styles.week}>
              <h3 className={styles.weekHead}>
                <span className={styles.weekNum} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.weekLabel}>{w.label}</span>
              </h3>
              <ul className={styles.events}>
                {w.events.map((e, j) => (
                  <li key={j} className={`${styles.event} ${styles[e.kind]}`}>
                    <span className={styles.day}>{e.day}</span>
                    <span className={styles.eventTitle}>{e.title}</span>
                    {e.meta && <span className={styles.meta}>{e.meta}</span>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <ul className={styles.stats}>
          {c.stats.map((s, i) => (
            <li key={i}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.footnote}>{c.footnote}</p>
      </div>
    </section>
  );
}
