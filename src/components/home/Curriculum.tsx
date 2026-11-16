"use client";

import React, { useId, useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./Curriculum.module.css";

type Week = { n: number; title: string; details?: React.ReactNode };
type Block = { label: string; title: string; weeks: Week[] };

// TODO: add each week's details (what it covers).
const BLOCKS: Block[] = [
  {
    label: "Weeks 1 to 3",
    title: "How funds work",
    weeks: [
      { n: 1, title: "History & shape of VC" },
      { n: 2, title: "Fund structure & mechanics" },
      { n: 3, title: "Fund economics" },
    ],
  },
  {
    label: "Weeks 4 to 6",
    title: "Finding deals",
    weeks: [
      { n: 4, title: "Dealflow sourcing" },
      { n: 5, title: "First screen & market maps" },
      { n: 6, title: "Unit economics" },
    ],
  },
  {
    label: "Weeks 7 to 10",
    title: "Judging deals",
    weeks: [
      { n: 7, title: "Financial modelling" },
      { n: 8, title: "Due diligence" },
      { n: 9, title: "Investment theses & memos" },
      { n: 10, title: "The investment committee" },
    ],
  },
  {
    label: "Weeks 11 to 14",
    title: "Doing deals",
    weeks: [
      { n: 11, title: "Cap tables & term sheets" },
      { n: 12, title: "Legals & beyond" },
      { n: 13, title: "Exits & acquisitions" },
      { n: 14, title: "Careers in VC & your Deep Dive" },
    ],
  },
];

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

function WeekItem({ week }: { week: Week }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li
      className={styles.week}
      data-open={open || undefined}
      style={{ "--week": weekColour(week.n) } as React.CSSProperties}
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
        {week.details}
      </div>
    </li>
  );
}

export function Curriculum() {
  return (
    <section id="curriculum" className={styles.curriculum} aria-labelledby="curriculum-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>The curriculum</p>
            <h2 id="curriculum-heading" className={styles.heading}>
              Fourteen weeks, in the order a deal happens.
            </h2>
          </div>
          <p className={styles.body}>
            You start with how a fund is built and finish with how returns are made. Every week is
            live, taught by practising investors.
          </p>
        </div>

        <p className={styles.hint}>Open any week to see what it covers.</p>

        <div className={styles.blocks}>
          {BLOCKS.map((b) => (
            <section key={b.label} className={styles.block} aria-label={`${b.label}: ${b.title}`}>
              <p className={styles.blockLabel}>{b.label}</p>
              <h3 className={styles.blockTitle}>{b.title}</h3>
              <ol className={styles.weeks}>
                {b.weeks.map((w) => (
                  <WeekItem key={w.n} week={w} />
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className={styles.africa} aria-labelledby="ascend-africa-heading">
          <div>
            <h3 id="ascend-africa-heading" className={styles.africaTitle}>
              Ascend Africa &middot; six more sessions
            </h3>
            <p className={styles.africaText}>
              Everything above, plus six Thursday sessions on African investment markets with the
              funds shaping them.
            </p>
          </div>
          <a href={siteConfig.cta.ascendAfrica} className={styles.africaBtn}>
            About Ascend Africa
          </a>
        </aside>
      </div>
    </section>
  );
}
