"use client";

import React, { useEffect, useRef, useState } from "react";
import { StarSky } from "./StarSky";
import styles from "./Tldr.module.css";

/* Facts, star positions (% of the map) and the order the constellation joins
   them, all as in the supplied HTML. */
const FACTS = [
  {
    k: "Programme",
    v: "Ascend by Included VC",
    b: "The Global Investment Academy: fourteen live weeks on how investment really works, taught by investors from the funds behind Included VC.",
    at: [50, 46],
  },
  {
    k: "Format",
    v: "Fourteen live sessions",
    b: "Two and a half hours every Tuesday with working investors, plus open office hours between sessions and work you do on your own. Sessions are live and recordings are not sent out, because the room is the point. If you miss one, there is a watch party two weeks later.",
    at: [22, 20],
  },
  {
    k: "Schedule",
    v: "Every Tuesday, 16:00 to 18:30 UK time",
    b: "One session a week, same slot, for fourteen consecutive Tuesdays. Times on this page convert to your own timezone automatically. The slot never moves, wherever you are.",
    at: [78, 18],
  },
  {
    k: "Starts",
    v: "Tuesday 5 January 2027",
    b: "Week one is also your onboarding: the dates for your calendar, how the fourteen weeks run, and your invitation to the Slack community, all in the first session.",
    at: [12, 56],
  },
  {
    k: "Ends",
    v: "Tuesday 6 April 2027",
    b: "The final session is Deep Dive presentations, where you show the research you have spent the programme building. Your certificate follows completion, and you stay in the community afterwards.",
    at: [88, 52],
  },
  {
    k: "Time",
    v: "About 5 to 10 hours a week",
    b: "The live session plus reading, a memo, diligence work and your Deep Dive. Many people will do this alongside work.",
    at: [33, 78],
  },
  {
    k: "Tracks",
    v: "Global, or Africa with six extra sessions",
    b: "One cohort, one programme, one room on Tuesdays. Choose Ascend Africa and you add six Thursday sessions on African investment markets with the funds shaping them.",
    at: [68, 80],
  },
  {
    k: "Fee",
    v: "\u00a3197 + VAT",
    b: "A one-off commitment fee, not tuition. Shown in your own currency before you pay. No tiers and no upsells: everyone has the same seat, on either track.",
    at: [50, 10],
  },
  {
    k: "Funded by",
    v: "Our partners",
    b: "The teaching, faculty, platform and community are paid for by the funds and institutions that have backed Included VC since 2019.",
    at: [8, 36],
  },
  {
    k: "Language",
    v: "All sessions taught in English",
    b: "Live sessions, office hours and written work are in English, with live captions. The cohort spans more than forty countries, so plain language is the house style.",
    at: [92, 34],
  },
  {
    k: "Certificate",
    v: "Included VC Ascender",
    b: "Complete the programme and your certificate names you an Included VC Ascender, Class of 2027.",
    at: [24, 94],
  },
  {
    k: "Enrolling",
    v: "A short form, then your seat",
    b: "The form helps you make a considered decision and tells us who is in the room. Nobody is screened out. Your place is confirmed the moment you pay. Enrolment closes Monday 4 January 2027.",
    at: [76, 95],
  },
  {
    k: "Community",
    v: "Slack, plus live office hours",
    b: "Your cohort gets a dedicated Slack, and you join the wider Included VC community, which stays with you after week fourteen.",
    at: [40, 30],
  },
  {
    k: "Payment",
    v: "Card, Apple Pay, Google Pay, bank transfer",
    b: "Pay in your own currency. Mobile money and local cards are available for Africa. The full amount is shown before you confirm, and an invoice is available for your employer.",
    at: [62, 62],
  },
  {
    k: "After you join",
    v: "Confirmation, then week one",
    b: "You get a confirmation email with the dates for your calendar and everything you need to join the first session on Tuesday 5 January. Nothing else is required of you before then.",
    at: [50, 80],
  },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export function Tldr() {
  const [cur, setCur] = useState(0);
  const lastTouch = useRef(0);
  const mapRef = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    lastTouch.current = Date.now();
    setCur((i + FACTS.length) % FACTS.length);
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
        setCur((c) => (c + 1) % FACTS.length);
    }, 3600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const f = FACTS[cur];

  return (
    <section id="tldr" className={styles.tldr} aria-labelledby="tldr-heading">
      <StarSky />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Everything at a glance</p>
        <h2 id="tldr-heading" className={styles.heading}>
          TLDR.
        </h2>
        <p className={styles.lede}>
          Everything you need to know about Ascend in one place. Tap a star for
          the detail.
        </p>

        <div className={styles.layout}>
          <div className={styles.panel} aria-live="polite">
            <div key={cur} className={styles.panelBody}>
              <p className={styles.panelLabel}>{f.k}</p>
              <h3 className={styles.panelTitle}>{f.v}</h3>
              <p className={styles.panelText}>{f.b}</p>
            </div>
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
                {pad(cur + 1)} / {pad(FACTS.length)}
              </span>
            </div>
          </div>

          <div ref={mapRef} className={styles.map}>
            <svg className={styles.lines} aria-hidden="true">
              {FACTS.map((a, i) => {
                const b = FACTS[(i + 1) % FACTS.length];
                return (
                  <line
                    key={a.k}
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
                key={s.k}
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
          {FACTS.map((s) => (
            <div key={s.k}>
              <dt>{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
