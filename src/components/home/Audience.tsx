import React from "react";
import styles from "./Audience.module.css";

const GROUPS = [
  {
    title: "Getting in",
    text: "The grounding to talk about funds, deals and decisions with real understanding, and the network to make a start.",
    tags: ["Aspiring investors", "Graduates", "Career changers"],
  },
  {
    title: "Getting better",
    text: "The structure many people in and around investment were never formally taught, and a cohort outside your usual circle.",
    tags: ["Emerging investors", "Existing investors", "Angel investors"],
  },
  {
    title: "Building companies",
    text: "Learn how the people across the table think, before you raise. Read a term sheet the way an investor reads it.",
    tags: ["Founders", "Operators"],
  },
  {
    title: "Curious about capital",
    text: "Tech, law, consulting, media. You want to understand how capital moves and who decides where it goes.",
    tags: ["Analysts and professionals"],
  },
];

export function Audience() {
  return (
    <section id="who-its-for" className={styles.audience} aria-labelledby="audience-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Who it is for</p>
            <h2 id="audience-heading" className={styles.heading}>
              Nine kinds of people. One thing in common.
            </h2>
          </div>
          <p className={styles.body}>
            They want to understand how investment decisions get made, and to do something with that
            knowledge. A finance background is welcome and never required.
          </p>
        </div>

        <ul className={styles.cards}>
          {GROUPS.map((g) => (
            <li key={g.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{g.title}</h3>
              <p className={styles.cardText}>{g.text}</p>
              <ul className={styles.tags} aria-label={`${g.title}: who this suits`}>
                {g.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
