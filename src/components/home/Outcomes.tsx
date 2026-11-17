import React from "react";
import { Testimonial } from "./Testimonial";
import styles from "./Outcomes.module.css";

// Top-edge colours are points on the brand spectrum: purple, sky, mint, lime.
const OUTCOMES = [
  {
    title: "Industry insight",
    text: "How capital moves and who gets it. Working knowledge, not theory.",
    colour: "#5035E2",
  },
  {
    title: "Time with investors",
    text: "Hours in the room with the people who teach you. A first conversation, not a cold email.",
    colour: "#53ABF2",
  },
  {
    title: "Work to show for it",
    text: "An investment memo, a live investment committee under your belt, and a published Deep Dive with your name on it.",
    colour: "#7AF3B8",
  },
  {
    title: "A global network",
    text: "A cohort from all over the world, and the wider Included VC community.",
    colour: "#C2FD51",
  },
];

export function Outcomes() {
  return (
    <section id="what-you-leave-with" className={styles.outcomes} aria-labelledby="outcomes-heading">
      <div className="container">
        <h2 id="outcomes-heading" className={styles.heading}>
          What you leave with
        </h2>
        <ul className={styles.cards}>
          {OUTCOMES.map((o) => (
            <li
              key={o.title}
              className={styles.card}
              style={{ "--accent": o.colour } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>{o.title}</h3>
              <p className={styles.cardText}>{o.text}</p>
            </li>
          ))}
        </ul>

        <Testimonial
          className={styles.testimonial}
          quote={
            <>
              &ldquo;I&rsquo;d recommend INVC to any aspiring VC over a masters degree from the
              fanciest biz school.&rdquo;
            </>
          }
          name="Ashna Oukabay"
          role="Included VC Fellow 2021"
          quoteWidth={660}
        />
      </div>
    </section>
  );
}
