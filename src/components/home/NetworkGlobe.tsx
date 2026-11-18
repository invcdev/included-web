import React from "react";
import type { SiteContent } from "@/content/schema";
import { GLOBE_DOTS, GLOBE_LOGOS } from "./globeData";
import { placeLogos, WIDE_GLOBE } from "./globeLayout";
import { LogoGlobe } from "./LogoGlobe";
import styles from "./NetworkGlobe.module.css";

type Props = Pick<SiteContent["network"], "groups" | "partners">;

/** Partner globe that turns into the partner grid (two groups) on scroll. */
export function NetworkGlobe({ groups, partners }: Props) {
  const placed = placeLogos(WIDE_GLOBE, GLOBE_LOGOS, partners);
  return (
    <LogoGlobe logos={placed} dots={GLOBE_DOTS}>
      <div className={styles.grid}>
        {groups.map((g) => (
          <section key={g.id} className={styles.group} aria-labelledby={`partners-${g.id}`}>
            <p className={styles.eyebrow} data-reveal>
              {g.eyebrow}
            </p>
            <h3 id={`partners-${g.id}`} className={styles.groupHeading} data-reveal>
              {g.heading}
            </h3>
            <ul className={styles.slots}>
              {placed
                .filter((_, i) => partners[i].group === g.id)
                .map((l) => (
                  <li
                    key={l.slug}
                    data-slot={l.slug}
                    className={styles.slot}
                    style={{ "--w": l.w, "--h": l.h } as React.CSSProperties}
                  >
                    <span className="sr-only">{l.name}</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </LogoGlobe>
  );
}
