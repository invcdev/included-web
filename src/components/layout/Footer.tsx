import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

// TODO: point the "#" links at their pages once they exist.
const COLUMNS = [
  {
    title: "Programme",
    links: [
      { label: "Ascend", href: "/" },
      { label: "Ascend Africa", href: "#" },
      { label: "Investor Fellowship", href: "#" },
      { label: "The curriculum", href: "#curriculum" },
      { label: "FAQs", href: "#faqs" },
    ],
  },
  {
    title: "Included VC",
    links: [
      { label: "About", href: "#" },
      { label: "Partners", href: "#network" },
      { label: "Alumni & Community", href: "#" },
      { label: "Instructors & Mentors", href: "#faculty" },
      { label: "Resources", href: "#" },
    ],
  },
  {
    title: "Follow",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/includedvc",
      },
      { label: "Twitter", href: "https://twitter.com/INCLUDED_VC" },
      { label: "Medium", href: "https://medium.com/included-vc" },
      { label: "Instagram", href: "https://www.instagram.com/included.vc/" },
      { label: "hello@included.vc", href: "mailto:hello@included.vc" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            {/* TODO: replace with the final Ascend lockup (SVG). */}
            <span className={styles.lockup}>
              <Image
                src="/ascend/ascend-logo-placeholder.png"
                alt="Ascend"
                width={1037}
                height={226}
                className={styles.logo}
              />
              <Image
                src="/ascend/by-included-placeholder.png"
                alt="by Included VC"
                width={277}
                height={65}
                className={styles.byline}
              />
            </span>
            <p className={styles.tagline}>
              Included VC exists to change who gets to invest.
            </p>
          </div>

          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className={styles.colTitle}>{c.title}</h2>
              <ul className={styles.links}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>&copy; Included VC 2026. All rights reserved.</span>
          <span>
            {/* TODO: link the terms and privacy pages. */}
            <a href="#">Terms</a> &middot; <a href="#">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
