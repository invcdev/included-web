import React from "react";
import { NetworkGlobe } from "./NetworkGlobe";
import type { SiteContent } from "@/content/schema";
import styles from "./Network.module.css";

export function Network({ content: c }: { content: SiteContent["network"] }) {
  return (
    <section id="network" className={styles.network} aria-labelledby="network-heading">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h2 id="network-heading" className={styles.heading}>
            {c.heading}
          </h2>
        </div>
        <p className={styles.body}>{c.body}</p>
      </div>
      <NetworkGlobe groups={c.groups} partners={c.partners} />
    </section>
  );
}
