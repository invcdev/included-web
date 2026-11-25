"use client";
/* eslint-disable @next/next/no-img-element -- small static SVG logos */

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

/** The twinkling star field behind the card. Still when the visitor prefers reduced motion. */
export function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const x = c?.getContext("2d");
    if (!c || !x) return;
    const cols = ["#f6f4e8", "#f6f4e8", "#d6faff", "#00f2ff", "#b0ff05", "#ffff00", "#8aa0ff"];
    let pts: { x: number; y: number; r: number; c: string; p: number; s: number }[] = [];
    const build = () => {
      const w = (c.width = innerWidth);
      const h = (c.height = innerHeight);
      pts = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        c: cols[(Math.random() * cols.length) | 0],
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.9 + 0.25,
      }));
    };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const draw = (t: number) => {
      x.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        x.globalAlpha = still ? 0.55 : 0.32 + 0.38 * (0.5 + 0.5 * Math.sin(p.p + (t / 900) * p.s));
        x.fillStyle = p.c;
        x.beginPath();
        x.arc(p.x, p.y, p.r, 0, 6.3);
        x.fill();
      }
      if (!still) frame = requestAnimationFrame(draw);
    };
    const onResize = () => {
      build();
      if (still) draw(0);
    };
    build();
    if (still) draw(0);
    else frame = requestAnimationFrame(draw);
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas ref={ref} className={styles.stars} aria-hidden="true" />;
}

type Links = { google: string; apple: string; outlook: string; yahoo: string };

/** The four calendar buttons. The one that probably matches the visitor's device is marked. */
export function CalendarButtons({ links }: { links: Links }) {
  const [suggested, setSuggested] = useState<"google" | "apple" | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    // Read once on the client; the server can't know the device.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggested(/iPhone|iPad|Macintosh/.test(ua) ? "apple" : /Android/.test(ua) ? "google" : null);
  }, []);
  const tag = (k: string) => (suggested === k ? <span className={styles.tag}>likely yours</span> : null);
  const cls = (k: string) => `${styles.btn} ${suggested === k ? styles.suggested : ""}`;
  return (
    <div className={styles.grid}>
      <a className={cls("google")} href={links.google} target="_blank" rel="noopener">
        <img className={styles.logo} src="/site/calendar/google-calendar.svg" width={20} height={20} alt="" />
        Google
        {tag("google")}
      </a>
      <a className={cls("apple")} href={links.apple} download="ascend-launch.ics">
        <img className={styles.logo} src="/site/calendar/apple.svg" width={20} height={20} alt="" />
        Apple
        {tag("apple")}
      </a>
      <a className={cls("outlook")} href={links.outlook} target="_blank" rel="noopener">
        <img className={styles.logo} src="/site/calendar/outlook.svg" width={20} height={20} alt="" />
        Outlook
      </a>
      <a className={cls("yahoo")} href={links.yahoo} target="_blank" rel="noopener">
        <img className={styles.logo} src="/site/calendar/yahoo.svg" width={20} height={20} alt="" />
        Yahoo
      </a>
    </div>
  );
}
