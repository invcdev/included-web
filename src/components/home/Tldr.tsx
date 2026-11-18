"use client";

import React, { useEffect, useRef, useState } from "react";
import { StarSky } from "./StarSky";
import type { SiteContent } from "@/content/schema";
import styles from "./Tldr.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Facts are joined into a constellation in list order; `at` is each star's spot (% of the map). */
export function Tldr({ content: c }: { content: SiteContent["tldr"] }) {
  const FACTS = c.facts;
  const count = FACTS.length;
  const [cur, setCur] = useState(0);
  const lastTouch = useRef(0);
  const mapRef = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    lastTouch.current = Date.now();
    setCur((i + count) % count);
  };

  // Walks through the facts on its own while the map is on screen, and waits
  // a few seconds after someone picks a star.
  useEffect(() => {
    const el = mapRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (visible && Date.now() - lastTouch.current > 7000)
        setCur((v) => (v + 1) % count);
    }, 3600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [count]);

  const f = FACTS[cur % Math.max(count, 1)];

  return (
    <section id="tldr" className={styles.tldr} aria-labelledby="tldr-heading">
      <StarSky />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="tldr-heading" className={styles.heading}>
          {c.heading}
        </h2>
        <p className={styles.lede}>{c.lede}</p>

        <div className={styles.layout}>
          <div className={styles.panel} aria-live="polite">
            {f && (
              <div key={cur} className={styles.panelBody}>
                <p className={styles.panelLabel}>{f.k}</p>
                <h3 className={styles.panelTitle}>{f.v}</h3>
                <p className={styles.panelText}>{f.b}</p>
              </div>
            )}
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => pick(cur - 1)}
                aria-label="Previous"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => pick(cur + 1)}
                aria-label="Next"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
                </svg>
              </button>
              <span className={styles.count}>
                {pad(cur + 1)} / {pad(count)}
              </span>
            </div>
          </div>

          <div ref={mapRef} className={styles.map}>
            <svg className={styles.lines} aria-hidden="true">
              {FACTS.map((a, i) => {
                const b = FACTS[(i + 1) % count];
                return (
                  <line
                    key={i}
                    x1={`${a.at[0]}%`}
                    y1={`${a.at[1]}%`}
                    x2={`${b.at[0]}%`}
                    y2={`${b.at[1]}%`}
                  />
                );
              })}
            </svg>
            {FACTS.map((s, i) => (
              <button
                key={i}
                type="button"
                className={styles.star}
                style={{ left: `${s.at[0]}%`, top: `${s.at[1]}%` }}
                aria-pressed={cur === i}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
              >
                <i aria-hidden="true" />
                <span>{s.k}</span>
              </button>
            ))}
          </div>
        </div>

        <dl className={styles.facts}>
          {FACTS.map((s, i) => (
            <div key={i}>
              <dt>{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
