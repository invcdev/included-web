import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import styles from "./Footer.module.css";
import { siteHref } from "./siteHref";

export function Footer({ content: c }: { content: SiteContent["footer"] }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <span className={styles.lockup}>
              <Image
                src={c.logo.url}
                alt={c.logo.alt}
                width={c.logo.width}
                height={c.logo.height}
                className={styles.logo}
              />
              <Image
                src={c.byline.url}
                alt={c.byline.alt}
                width={c.byline.width}
                height={c.byline.height}
                className={styles.byline}
              />
            </span>
            <p className={styles.tagline}>{c.tagline}</p>
          </div>

          {c.columns.map((col, i) => (
            <nav key={i} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul className={styles.links}>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a
                      href={siteHref(l.href)}
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
          <span>{c.copyright}</span>
          <span>
            {c.legal.map((l, i) => (
              <React.Fragment key={i}>
                {i > 0 && " \u00b7 "}
                <a href={siteHref(l.href)}>{l.label}</a>
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
