"use client";

import React, { useState } from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Ticket.module.css";

// A fixed, decorative barcode: [x, width] of each bar, in a 400 x 42.5 box.
const BARS: [number, number][] = (() => {
  const bars: [number, number][] = [];
  let x = 0;
  let i = 0;
  while (x < 398) {
    const r = Math.sin((i + 1) * 91.7) * 43758.5453;
    const f = r - Math.floor(r);
    const w = f < 0.45 ? 1 : f < 0.8 ? 2 : 3;
    const gap = 1.5 + ((f * 7) % 3.5);
    if (x + w > 400) break;
    bars.push([+x.toFixed(2), w]);
    x += w + gap;
    i++;
  }
  return bars;
})();

// Dot colours for the two tracks, in order.
const TRACK_DOTS = ["var(--brand)", "var(--lime)"];

export function Ticket({ content: c }: { content: SiteContent["ticket"] }) {
  const [track, setTrack] = useState(0);
  const current = c.tracks[track] ?? c.tracks[0];
  return (
    <section
      id="what-you-get"
      className={styles.section}
      aria-labelledby="ticket-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="ticket-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.left}>
            <article className={styles.ticket} aria-label="Your ticket">
              <div className={styles.ticketTop}>
                <p className={styles.admit}>
                  <span>{c.admit}</span>
                  {current && <span className={styles.track}>{current.ticketLabel}</span>}
                </p>
                <p className={styles.price}>
                  <span className={styles.amount}>{c.price}</span>
                  <span className={styles.vat}>{c.priceSuffix}</span>
                </p>
                <p className={styles.ticketText}>
                  <RichText text={c.text} />
                </p>
              </div>

              <div className={styles.tear} aria-hidden="true" />

              <div className={styles.ticketBottom}>
                <dl className={styles.details}>
                  {c.details.map((d) => (
                    <div key={d.label}>
                      <dt className={styles.detailLabel}>{d.label}</dt>
                      <dd className={styles.detailValue}>{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <svg
                  className={styles.barcode}
                  viewBox="0 0 400 42.5"
                  aria-hidden="true"
                >
                  {BARS.map(([x, w]) => (
                    <rect key={x} x={x} y={0} width={w} height={42.5} />
                  ))}
                </svg>
              </div>
            </article>

            <a href={c.cta.href} className={styles.seatBtn}>
              {c.cta.label}
            </a>
            <p className={styles.note}>{c.note}</p>

            <div className={styles.tracks}>
              <span className={styles.tracksLabel} id="track-label">
                {c.tracksLabel}
              </span>
              <div
                className={styles.trackList}
                role="radiogroup"
                aria-labelledby="track-label"
              >
                {c.tracks.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={track === i}
                    className={styles.trackPill}
                    style={{ "--dot": TRACK_DOTS[i % TRACK_DOTS.length] } as React.CSSProperties}
                    onClick={() => setTrack(i)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ul className={styles.features}>
            {c.features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.check} aria-hidden="true">
                  <svg viewBox="0 0 22 22">
                    <path d="M6.5 11.4 9.6 14.4 15.6 8" />
                  </svg>
                </span>
                <div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureText}>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
