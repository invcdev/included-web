import React from "react";
import type { SiteContent } from "@/content/schema";
import { Kicker } from "./Kicker";
import { WeekItem } from "./Curriculum";
import styles from "./Curriculum.module.css";
import own from "./AfricaSessions.module.css";

/** Greens from the Ascend Africa design, first session to last (cycled). */
const GREENS = ["#3FA34D", "#4CA847", "#6DC24B", "#8ACB42", "#A8CE3C", "#C9CD35"];

/** Ascend Africa: the six Thursday sessions on African markets, styled like the curriculum. */
export function AfricaSessions({ content: c }: { content: SiteContent["africaSessions"] }) {
  return (
    <section id="africa-sessions" className={`${styles.curriculum} ${own.section}`} aria-labelledby="africa-sessions-heading">
      <div className="container">
        {(c.kicker.step || c.kicker.label) && <Kicker step={c.kicker.step} label={c.kicker.label} />}
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="africa-sessions-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>
        <ol className={`${styles.weeks} ${own.list}`}>
          {c.sessions.map((s, i) => (
            <WeekItem key={i} week={{ n: i + 1, title: s.title, details: s.details }} colour={GREENS[i % GREENS.length]} />
          ))}
        </ol>
      </div>
    </section>
  );
}
