import React from "react";
import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

const AT_A_GLANCE = [
  { label: "Starts", value: "Tuesday 5 January 2027, the first Tuesday of the year" },
  { label: "Live", value: "14 Tuesdays, 16:00–18:30 UK time" },
  { label: "Format", value: "Online and live, no recordings sent out" },
  { label: "Tracks", value: "Global or Africa" },
  { label: "Enrolment closes", value: "Monday 4 January 2027" },
];

const STATS = [
  { value: "55,000+", label: "people follow Included VC" },
  { value: "7 years", label: "of partner-funded investment education" },
  { value: "100+", label: "countries have applied to Included VC programmes" },
];

export function Hero() {
  return (
    <section id="what-it-is" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerNum}>01 / 05</span>
              <span>What it is</span>
            </p>

            <p className={styles.eyebrow}>
              Ascend: the Global Investment Academy by Included VC
            </p>

            <h1 id="hero-heading" className={styles.heading}>
              Fourteen Tuesdays inside venture capital.
            </h1>

            <p className={styles.lede}>
              Taught live by people who invest for a living, and funded by our
              partners. You learn how a deal gets done, then you do it yourself.
            </p>

            <p className={styles.callout}>
              <strong>The learning is partner-funded.</strong> The commitment is yours.
            </p>

            <div className={styles.ctas}>
              <a href={siteConfig.cta.enrol} className={styles.primaryBtn}>
                Take your seat
              </a>
              <a href="#curriculum" className={styles.textLink}>
                View curriculum
              </a>
            </div>
          </div>

          <aside className={styles.card} aria-labelledby="glance-heading">
            <h2 id="glance-heading" className={styles.cardTitle}>
              The programme at a glance
            </h2>
            <dl className={styles.cardList}>
              {AT_A_GLANCE.map((row) => (
                <div key={row.label} className={styles.cardRow}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className={`${styles.cardRow} ${styles.cardRowPrice}`}>
                <dt>Commitment fee</dt>
                <dd className={styles.price}>£197 + VAT</dd>
              </div>
            </dl>
          </aside>
        </div>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.value} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Registered your interest earlier?{" "}
          <a href={siteConfig.cta.confirmPlace}>This is where you confirm your place.</a>
        </p>
      </div>
    </section>
  );
}
