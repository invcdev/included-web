import React from "react";
import { siteConfig } from "@/config/site";
import styles from "./Employers.module.css";

export function Employers() {
  return (
    <section id="employers" className={styles.employers} aria-labelledby="employers-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Teams and employers</p>
            <h2 id="employers-heading" className={styles.heading}>
              Your organisation can cover the fee.
            </h2>
          </div>
          <p className={styles.body}>
            Many employers have a learning budget for exactly this. We give you what you need to ask
            for it.
          </p>
        </div>

        <div className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Your employer can pay</h3>
            <p className={styles.cardText}>
              We invoice your organisation directly and send a one-page summary that covers the fee
              and the Tuesday time. Bringing three or more people, or want Ascend run inside your
              institution? Email <a href="mailto:hello@included.vc">hello@included.vc</a>.
            </p>
          </div>
          <a href={siteConfig.cta.invoiceTemplate} className={styles.button}>
            Ask for the invoice template
          </a>
        </div>
      </div>
    </section>
  );
}
