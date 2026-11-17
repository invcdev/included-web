"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./Values.module.css";

const VALUES = [
  {
    n: "01",
    title: "Kindness",
    short: "Kindness",
    text: "Kindness is the baseline. It means being respectful, responsive and decent in how you speak, show up, give feedback and treat your cohort.",
  },
  {
    n: "02",
    title: "Pay it forward (and backward)",
    short: "Pay it forward",
    text: "Our fellowships are made possible by people who gave without asking for anything in return. We assume you will pay it forward, and backward too.",
  },
  {
    n: "03",
    title: "Don\u2019t compete",
    short: "Don\u2019t compete",
    text: "Everyone here is ambitious, but this isn\u2019t a zero-sum game. You\u2019re not here to outshine others; you\u2019re here to light them up. We lift as we climb.",
  },
  {
    n: "04",
    title: "Sparkle",
    short: "Sparkle",
    text: "Sparkle is how you show up: the clarity in your thinking, the way you follow through, and the standard you set in every room.",
  },
];

// Four-pointed star (centre 0,0; arms 155px).
const STAR = "M0 -155 Q14 -14 155 0 Q14 14 0 155 Q-14 14 -155 0 Q-14 -14 0 -155 Z";
// Slimmer inner star: the lighter highlight inside the arms.
const STAR_INNER = "M0 -140 Q-16 -16 140 0 Q-16 16 0 140 Q16 16 -140 0 Q16 -16 0 -140 Z";

export function Values() {
  const [active, setActive] = useState(0);

  return (
    <section id="our-values" className={styles.values} aria-labelledby="values-heading">
      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          <p className={styles.eyebrow}>Our values</p>
          <h2 id="values-heading" className={styles.heading}>
            How we treat each other.
          </h2>
          <p className={styles.body}>Four values every Included VC cohort is held to.</p>

          <ul className={styles.cards}>
            {VALUES.map((v, i) => (
              <li
                key={v.n}
                className={styles.card}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                aria-current={active === i || undefined}
              >
                <span className={styles.num}>{v.n}</span>
                <h3 className={styles.cardTitle}>{v.title}</h3>
                <p className={styles.cardText}>{v.text}</p>
              </li>
            ))}
          </ul>

          <div className={styles.links}>
            <a href={siteConfig.cta.about} className={styles.linkUnderlined}>
              About Included VC
            </a>
            <a href={siteConfig.cta.resources} className={styles.link}>
              View resources
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.glow} aria-hidden="true" />
          <svg className={styles.star} viewBox="-160 -160 320 320" aria-hidden="true">
            <defs>
              {/* Blue at the top right, through cyan, to green at the bottom left. */}
              <linearGradient id="values-star" x1="0.7" y1="0" x2="0.3" y2="1">
                <stop offset="0" stopColor="#4a8cee" />
                <stop offset="0.38" stopColor="#5fd0f6" />
                <stop offset="0.6" stopColor="#6cebe3" />
                <stop offset="1" stopColor="#7cf4a2" />
              </linearGradient>
              <radialGradient id="values-core" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#9ff6fd" />
                <stop offset="1" stopColor="#6ee8fb" />
              </radialGradient>
            </defs>
            <path d={STAR} fill="url(#values-star)" />
            <path d={STAR_INNER} fill="url(#values-core)" opacity="0.9" />
            <circle r="7.5" fill="#fff" />
          </svg>

          {VALUES.map((v, i) => (
            <button
              key={v.n}
              type="button"
              className={`${styles.pill} ${styles[`pill${i + 1}`]}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.pillNum}>{v.n}</span>
              {v.short}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
