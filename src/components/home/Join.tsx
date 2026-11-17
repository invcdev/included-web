import React from "react";
import { siteConfig } from "@/config/site";
import { Kicker } from "./Kicker";
import styles from "./Join.module.css";

const STEPS = [
  {
    n: "01",
    title: "Answer a few questions",
    text: "Why you want to join, what you want to be able to do by week fourteen, and which track fits. It isn\u2019t a test, and nobody is screened out.",
  },
  {
    n: "02",
    title: "Confirm your place",
    text: "Pay the commitment fee in your own currency. You see the full amount before you confirm, and the seat is yours the moment it goes through.",
  },
  {
    n: "03",
    title: "Get your confirmation",
    text: "The dates for your calendar and everything you need to join the first session.",
  },
];

const PAYMENT = ["Card", "Apple Pay", "Google Pay", "Bank transfer", "Mobile money and local cards for Africa"];

export function Join() {
  return (
    <section id="how-to-join" className={styles.join} aria-labelledby="join-heading">
      <div className="container">
        <Kicker step="05 / 05" label="Join" />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>How to join</p>
            <h2 id="join-heading" className={styles.heading}>
              Three steps, about ten minutes.
            </h2>
          </div>
          <p className={styles.body}>
            No interview and no waiting for a decision. A short form, your commitment fee, and your
            seat is confirmed. Enrolment closes Monday 4 January 2027.
          </p>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.n} className={`${styles.step} ${styles[`step${i + 1}`]}`}>
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
            <h3 className={styles.stepTitle}>Tuesday 5 January 2027</h3>
            <p className={styles.stepText}>
              First session, 16:00 UK time. Onboarding happens in the room, then fourteen weeks, live.
            </p>
            <a href={siteConfig.cta.enrol} className={styles.seatBtn}>
              Take your seat
            </a>
          </li>
        </ol>

        <ul className={styles.payments} aria-label="Ways to pay">
          {PAYMENT.map((p) => (
            <li key={p} className={styles.payment}>
              {p}
            </li>
          ))}
        </ul>

        <div className={styles.question}>
          <div>
            <h3 className={styles.questionTitle}>Still have a question for us?</h3>
            <p className={styles.questionText}>
              Come to office hours and ask a person from the team: which track fits, whether this is
              your year, or how to ask your employer to pay.
            </p>
          </div>
          <a href={siteConfig.cta.officeHours} className={styles.questionBtn}>
            Join office hours
          </a>
        </div>
      </div>
    </section>
  );
}
