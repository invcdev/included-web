import React from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Employers.module.css";

export function Employers({ content: c }: { content: SiteContent["employers"] }) {
  return (
    <section id="employers" className={styles.employers} aria-labelledby="employers-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="employers-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <div className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>{c.cardTitle}</h3>
            <p className={styles.cardText}>
              <RichText text={c.cardText} />
            </p>
          </div>
          <a href={c.button.href} className={styles.button}>
            {c.button.label}
          </a>
        </div>
      </div>
    </section>
  );
}
