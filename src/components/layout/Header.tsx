"use client";

import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const TICKER_ITEMS = [
  "APPLICATIONS OPEN",
  "TAKES 21 SECONDS",
  "APPLICATIONS OPEN",
  "TAKES 21 SECONDS",
  "APPLICATIONS OPEN",
  "TAKES 21 SECONDS",
  "APPLICATIONS OPEN",
  "TAKES 21 SECONDS",
];

const NAV_ITEMS = [
  { label: "WORLD", href: "#world" },
  { label: "WHY", href: "#manifesto" },
  { label: "NETWORK", href: "#network" },
  { label: "FELLOWSHIP", href: "#fellowship" },
  { label: "VOICES", href: "#voices" },
  { label: "REGIONS", href: "#regions" },
];

export function Header() {
  return (
    <div className={styles.wrapper}>
      {/* Top Neon Ticker Marquee */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`a-${idx}`} className={styles.tickerItem}>
              <span className={styles.tickerStar}>✦</span>
              <span>{item}</span>
            </span>
          ))}
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`b-${idx}`} className={styles.tickerItem}>
              <span className={styles.tickerStar}>✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav id="ivc-nav" className={styles.navBar} aria-label="Main Navigation">
        <Link href="#world" className={styles.brand} aria-label="Included VC Home">
          <span className={styles.brandText}>Included</span>
          <span className={styles.brandSparkle}>✦</span>
          <span className={styles.brandSuffix}>VC</span>
        </Link>

        <div className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="https://form.typeform.com/to/bALnGEQ7"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.applyBtn}
        >
          APPLY — 21s
        </a>
      </nav>
    </div>
  );
}
