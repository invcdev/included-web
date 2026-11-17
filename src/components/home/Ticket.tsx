"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./Ticket.module.css";

const DETAILS = [
  { label: "Starts", value: "Tue 5 Jan 2027" },
  { label: "Doors", value: "16:00\u201318:30 UK time" },
  { label: "Sessions", value: "14, live" },
  { label: "Venue", value: "Online" },
];

const FEATURES = [
  {
    title: "14 live sessions",
    text: "Taught live by practising investors, with you in the room.",
  },
  {
    title: "Office hours",
    text: "Open Zoom sessions between classes. Bring half-formed questions.",
  },
  {
    title: "A live investment committee",
    text: "Present a deal to a live investment committee and defend it under questioning.",
  },
  {
    title: "Your Deep Dive",
    text: "The long-form research Included VC is known for, published with your name on it.",
  },
  {
    title: "Slack community",
    text: "Your cohort in one dedicated Slack, between sessions and after them.",
  },
  {
    title: "Certificate",
    text: "Complete the programme and you are an Included VC Ascender, Class of 2027.",
  },
];

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

const TRACKS = [
  { id: "global", name: "Global", dot: "var(--brand)" },
  { id: "africa", name: "Africa", dot: "var(--lime)" },
] as const;

type TrackId = (typeof TRACKS)[number]["id"];

export function Ticket() {
  const [track, setTrack] = useState<TrackId>("global");
  const trackName = TRACKS.find((t) => t.id === track)!.name;
  return (
    <section
      id="what-you-get"
      className={styles.section}
      aria-labelledby="ticket-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>What you get</p>
            <h2 id="ticket-heading" className={styles.heading}>
              One seat. Fourteen live weeks.
            </h2>
          </div>
          <p className={styles.body}>
            Everyone has the same seat. Here is what comes with it.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.left}>
            <article className={styles.ticket} aria-label="Your ticket">
              <div className={styles.ticketTop}>
                <p className={styles.admit}>
                  <span>Admit one &middot; Founding cohort</span>
                  <span className={styles.track}>{trackName} track</span>
                </p>
                <p className={styles.price}>
                  <span className={styles.amount}>&pound;197</span>
                  <span className={styles.vat}>+ VAT</span>
                </p>
                <p className={styles.ticketText}>
                  <strong>
                    The learning is partner-funded. The commitment is yours.
                  </strong>{" "}
                  Our partners have covered the teaching, the faculty and the
                  platform. What they can&rsquo;t fund is you turning up. So
                  there is a one-off commitment fee. It isn&rsquo;t tuition. It
                  is your side of the arrangement: a signal to yourself, and to
                  everyone learning beside you, that your seat will be used. It
                  also helps keep Included VC running for the people who come
                  after you.
                </p>
              </div>

              <div className={styles.tear} aria-hidden="true" />

              <div className={styles.ticketBottom}>
                <dl className={styles.details}>
                  {DETAILS.map((d) => (
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

            <a href={siteConfig.cta.enrol} className={styles.seatBtn}>
              Take your seat
            </a>
            <p className={styles.note}>
              Non-refundable, because a commitment you can undo isn&rsquo;t one.
              Check your Tuesdays first.
            </p>

            <div className={styles.tracks}>
              <span className={styles.tracksLabel} id="track-label">
                Two tracks
              </span>
              <div
                className={styles.trackList}
                role="radiogroup"
                aria-labelledby="track-label"
              >
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={track === t.id}
                    className={styles.trackPill}
                    style={{ "--dot": t.dot } as React.CSSProperties}
                    onClick={() => setTrack(t.id)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ul className={styles.features}>
            {FEATURES.map((f) => (
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
