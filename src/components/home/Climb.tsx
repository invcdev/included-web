import React from "react";
import { Kicker } from "./Kicker";
import styles from "./Climb.module.css";

const STAGES = [
  {
    n: "01",
    title: "Informed",
    text: "You know what an investor does and how a round comes together.",
  },
  {
    n: "02",
    title: "Fluent",
    text: "You can read a deck and say what is missing from it.",
    note: "Where many people start",
  },
  {
    n: "03",
    title: "Analytical",
    text: "You can build the model and defend the assumption underneath it.",
  },
  {
    n: "04",
    title: "Decisive",
    text: "You can write the memo, take it into the room and hold your position.",
    note: "What fourteen weeks is built to reach",
    highlight: true,
  },
  {
    n: "05",
    title: "Trusted",
    text: "Founders call you before the round is priced. This one takes years, not weeks. Ascend is where it starts.",
  },
];

export function Climb() {
  return (
    <section id="what-you-will-do" className={styles.climb} aria-labelledby="climb-heading">
      <div className="container">
        <Kicker step="02 / 05" label="What you will do" />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>The climb</p>
            <h2 id="climb-heading" className={styles.heading}>
              Where fourteen weeks can take you.
            </h2>
          </div>
          <p className={styles.body}>
            Five stages of investment judgement. Many people start at the second. Ascend is built
            to get you to the fourth. The fifth takes a career.
          </p>
        </div>

        <ol className={styles.stages}>
          {STAGES.map((s) => (
            <li key={s.n} className={s.highlight ? `${styles.stage} ${styles.stageHighlight}` : styles.stage}>
              <span className={styles.stageNum} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.stageTitle}>{s.title}</h3>
              <p className={styles.stageText}>{s.text}</p>
              {s.note && <p className={styles.stageNote}>{s.note}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
