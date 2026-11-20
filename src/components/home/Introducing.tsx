import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Introducing.module.css";

// Dot colours for the two tracks, in order.
const TRACK_DOTS = ["var(--brand)", "var(--lime)"];

export function Introducing({ content: c }: { content: SiteContent["introducing"] }) {
  return (
    <section id="introducing" className={styles.introducing} aria-labelledby="introducing-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.main}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h2 id="introducing-heading" className={styles.lockup}>
            <Image
              src={c.logo.url}
              alt={c.logo.alt}
              width={c.logo.width}
              height={c.logo.height}
              className={styles.logo}
            />
            <Image
              src={c.byline.url}
              alt={c.byline.alt}
              width={c.byline.width}
              height={c.byline.height}
              className={styles.byline}
            />
          </h2>

          {c.body && (
            <p className={styles.body}>
              <RichText text={c.body} />
            </p>
          )}

          <ul className={styles.stats}>
            {c.stats.map((s) => (
              <li key={s.title} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statTitle}>{s.title}</span>
                <span className={styles.statText}>{s.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.aside}>
          <Image
            src={c.illustration.url}
            alt={c.illustration.alt}
            width={c.illustration.width}
            height={c.illustration.height}
            className={styles.illustration}
          />
          <div className={styles.tracks}>
            <span className={styles.tracksLabel}>{c.tracksLabel}</span>
            <ul className={styles.trackList}>
              {c.tracks.map((t, i) => (
                <li
                  key={t}
                  className={styles.track}
                  style={{ "--dot": TRACK_DOTS[i % TRACK_DOTS.length] } as React.CSSProperties}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
