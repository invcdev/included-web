import React from "react";
import { Kicker } from "./Kicker";
import styles from "./Deal.module.css";

const TERMS = [
  {
    title: "Show up live",
    text: "Sessions are live, and recordings are not sent out. Miss one and you can join the watch party two weeks later. Tuesdays are the one thing we ask you to protect.",
    colour: "var(--brand)",
  },
  {
    title: "Do the work between sessions",
    text: "You will write an investment memo, take it to a live investment committee and publish a Deep Dive. Five to ten hours a week, including the live time.",
    colour: "#6BE7FB",
  },
  {
    title: "Bring something to the cohort",
    text: "Participation is expected. You will be asked for your view, and the people next to you will be better for hearing it.",
    colour: "var(--lime)",
  },
];

export function Deal() {
  return (
    <section id="the-deal" className={styles.deal} aria-labelledby="deal-heading">
      <div className="container">
        <Kicker step="04 / 05" label="The deal" />

        <div className={styles.panel}>
          <div className={styles.intro}>
            <h2 id="deal-heading" className={styles.heading}>
              No panel decides whether you get in.
            </h2>
            <p className={styles.body}>Three things decide whether you should.</p>
          </div>

          <ul className={styles.terms}>
            {TERMS.map((t) => (
              <li key={t.title} className={styles.term} style={{ "--bar": t.colour } as React.CSSProperties}>
                <h3 className={styles.termTitle}>{t.title}</h3>
                <p className={styles.termText}>{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
