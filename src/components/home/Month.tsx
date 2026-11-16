import React from "react";
import styles from "./Month.module.css";

type Kind = "masterclass" | "task" | "africa" | "office";
type Event = { day: string; kind: Kind; title: string; meta?: string };

const MASTERCLASS: Event = {
  day: "Tue",
  kind: "masterclass",
  title: "Masterclass",
  meta: "16:00–18:30 UK time, everyone",
};
const AFRICA: Event = { day: "Thu", kind: "africa", title: "Africa masterclass", meta: "90 min, Africa track" };
const OFFICE: Event = { day: "Thu", kind: "office", title: "Office hours", meta: "Optional" };

const WEEKS: { n: number; label: string; events: Event[] }[] = [
  {
    n: 1,
    label: "Week one",
    events: [MASTERCLASS, { day: "Wed", kind: "task", title: "Task set", meta: "Due in two weeks" }, AFRICA, OFFICE],
  },
  { n: 2, label: "Week two", events: [MASTERCLASS, OFFICE] },
  {
    n: 3,
    label: "Week three",
    events: [MASTERCLASS, { day: "Wed", kind: "task", title: "Task due", meta: "Submit your work" }, AFRICA],
  },
  {
    n: 4,
    label: "Week four",
    events: [
      MASTERCLASS,
      { day: "Wed", kind: "task", title: "Feedback", meta: "On your task" },
      { day: "Wed", kind: "task", title: "Next task set" },
      AFRICA,
      OFFICE,
    ],
  },
];

const STATS = [
  { value: "2.5 hrs", label: "live, every Tuesday" },
  { value: "5–10 hrs", label: "a week in total, including the live session" },
  { value: "+90 min", label: "on six Thursdays for the Africa track" },
];

export function Month() {
  return (
    <section id="a-month-in-ascend" className={styles.month} aria-labelledby="month-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>The Included VC experience</p>
            <h2 id="month-heading" className={styles.heading}>
              A month in Ascend.
            </h2>
          </div>
          <p className={styles.body}>
            We start every week with the live session. Everything else takes shape as the week
            progresses.
          </p>
        </div>

        <ol className={styles.weeks}>
          {WEEKS.map((w) => (
            <li key={w.n} className={styles.week}>
              <h3 className={styles.weekHead}>
                <span className={styles.weekNum} aria-hidden="true">
                  {w.n}
                </span>
                <span className={styles.weekLabel}>{w.label}</span>
              </h3>
              <ul className={styles.events}>
                {w.events.map((e) => (
                  <li key={`${e.day}-${e.title}`} className={`${styles.event} ${styles[e.kind]}`}>
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
          {STATS.map((s) => (
            <li key={s.value}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.footnote}>Illustrative month. The live timetable is shared in week one.</p>
      </div>
    </section>
  );
}
