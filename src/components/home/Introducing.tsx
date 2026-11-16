import React from "react";
import Image from "next/image";
import styles from "./Introducing.module.css";

const STATS = [
  { value: "14", title: "live sessions", text: "Tuesdays, 16:00 to 18:30 UK time" },
  {
    value: "3",
    title: "pieces of real work",
    text: "An investment memo, an investment committee and a Deep Dive",
  },
  { value: "2", title: "tracks", text: "Global, or Africa with six extra sessions" },
  { value: "1", title: "cohort", text: "Everyone in the same room on Tuesdays" },
];

const TRACKS = [
  { name: "Global", dot: "var(--brand)" },
  { name: "Africa", dot: "var(--lime)" },
];

export function Introducing() {
  return (
    <section id="introducing" className={styles.introducing} aria-labelledby="introducing-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.main}>
          <p className={styles.eyebrow}>Introducing</p>
          {/* TODO: replace both placeholders (cropped from the design) with the final SVG logos. */}
          <h2 id="introducing-heading" className={styles.lockup}>
            <Image
              src="/ascend/ascend-logo-placeholder.png"
              alt="Ascend"
              width={1037}
              height={226}
              className={styles.logo}
            />
            <Image
              src="/ascend/by-included-placeholder.png"
              alt="by Included VC"
              width={277}
              height={65}
              className={styles.byline}
            />
          </h2>

          <ul className={styles.stats}>
            {STATS.map((s) => (
              <li key={s.title} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statTitle}>{s.title}</span>
                <span className={styles.statText}>{s.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.aside}>
          {/* TODO: replace with the final illustration (cropped from the design for now). */}
          <Image
            src="/ascend/ascend-illustration-placeholder.jpg"
            alt="Collage of people climbing rising bar charts in the Ascend colours, helping each other up"
            width={932}
            height={931}
            className={styles.illustration}
          />
          <div className={styles.tracks}>
            <span className={styles.tracksLabel}>Two tracks</span>
            <ul className={styles.trackList}>
              {TRACKS.map((t) => (
                <li
                  key={t.name}
                  className={styles.track}
                  style={{ "--dot": t.dot } as React.CSSProperties}
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
