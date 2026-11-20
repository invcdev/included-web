"use client";

import React, { useId, useState } from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Curriculum.module.css";

type Content = SiteContent["curriculum"];
type Week = Content["blocks"][number]["weeks"][number];

// Each week takes its colour from the brand spectrum: week 1 purple ... week 14 lime.
const SPECTRUM: [number, [number, number, number]][] = [
  [0, [0x50, 0x35, 0xe2]],
  [1 / 6, [0x47, 0x6f, 0xea]],
  [2 / 6, [0x53, 0xab, 0xf2]],
  [3 / 6, [0x6c, 0xe7, 0xfb]],
  [4 / 6, [0x7a, 0xf3, 0xb8]],
  [5 / 6, [0x98, 0xf8, 0x72]],
  [1, [0xc2, 0xfd, 0x51]],
];
function weekColour(n: number) {
  const t = (n - 1) / 13;
  for (let i = 1; i < SPECTRUM.length; i++) {
    const [t1, c1] = SPECTRUM[i];
    if (t <= t1) {
      const [t0, c0] = SPECTRUM[i - 1];
      const f = (t - t0) / (t1 - t0);
      const [r, g, b] = c0.map((v, j) => Math.round(v + (c1[j] - v) * f));
      return `rgb(${r} ${g} ${b})`;
    }
  }
  return "rgb(194 253 81)";
}

/** One expandable week. `colour` overrides the spectrum colour (the Ascend Africa sessions use greens). */
export function WeekItem({ week, colour }: { week: Pick<Week, "n" | "title" | "details">; colour?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li
      className={styles.week}
      data-open={open || undefined}
      style={{ "--week": colour ?? weekColour(week.n) } as React.CSSProperties}
    >
      <h4 className={styles.weekHeading}>
        <button
          type="button"
          className={styles.weekButton}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.weekNum}>{String(week.n).padStart(2, "0")}</span>
          <span className={styles.weekTitle}>{week.title}</span>
          <svg className={styles.chevron} viewBox="0 0 16 10" aria-hidden="true">
            <path d="M1 1.25 8 8.25l7-7" />
          </svg>
        </button>
      </h4>
      <div id={`${id}-panel`} className={styles.weekPanel} hidden={!open}>
        {week.details && <RichText text={week.details} />}
      </div>
    </li>
  );
}

export function Curriculum({
  content: c,
  weekColors,
}: {
  content: Content;
  /** One colour per week (by week number - 1) instead of the brand spectrum. Ascend Africa uses greens. */
  weekColors?: string[];
}) {
  return (
    <section id="curriculum" className={styles.curriculum} aria-labelledby="curriculum-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="curriculum-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <p className={styles.hint}>{c.hint}</p>

        <div className={styles.blocks}>
          {c.blocks.map((b) => (
            <section key={b.label} className={styles.block} aria-label={`${b.label}: ${b.title}`}>
              <p className={styles.blockLabel}>{b.label}</p>
              <h3 className={styles.blockTitle}>{b.title}</h3>
              <ol className={styles.weeks}>
                {b.weeks.map((w) => (
                  <WeekItem key={w.n} week={w} colour={weekColors?.[(w.n - 1) % weekColors.length]} />
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className={styles.africa} aria-labelledby="ascend-africa-heading">
          <div>
            <h3 id="ascend-africa-heading" className={styles.africaTitle}>
              {c.africa.title}
            </h3>
            <p className={styles.africaText}>{c.africa.text}</p>
          </div>
          <a href={c.africa.cta.href} className={styles.africaBtn}>
            {c.africa.cta.label}
          </a>
        </aside>
      </div>
    </section>
  );
}
