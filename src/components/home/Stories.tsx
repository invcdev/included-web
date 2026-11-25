import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Stories.module.css";

// Grid placement and style for each of the six stories, in order.
// feature = large quote on navy; wide = spans two columns.
const SLOTS: { kind: "feature" | "card" | "wide"; area: string }[] = [
  { kind: "feature", area: "a" },
  { kind: "card", area: "b" },
  { kind: "card", area: "c" },
  { kind: "feature", area: "d" },
  { kind: "wide", area: "e" },
  { kind: "card", area: "f" },
];

// Stat value colours, in order.
const STAT_COLOURS = ["var(--brand)", "#4194A0", "#678826", "var(--ink)"];

export function Stories({ content: c }: { content: SiteContent["stories"] }) {
  const renderCard = (s: SiteContent["stories"]["stories"][number], i: number) => {
    const slot = SLOTS[i % SLOTS.length];
    return (
      <li
        key={i}
        className={`${styles.story} ${styles[slot.kind]}`}
        style={{ gridArea: slot.area }}
      >
        <figure className={styles.figure}>
          {slot.kind === "feature" && <span className={styles.bar} aria-hidden="true" />}
          <blockquote className={styles.quote}>
            <p>{s.quote}</p>
          </blockquote>
          <figcaption className={styles.person}>
            {s.avatar ? (
              <Image src={s.avatar.url} alt="" width={88} height={88} className={styles.avatar} />
            ) : (
              <span className={styles.avatar} aria-hidden="true" />
            )}
            <span className={styles.personText}>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.role}>{s.role}</span>
            </span>
          </figcaption>
        </figure>
      </li>
    );
  };

  return (
    <section id="stories" className={styles.stories} aria-labelledby="stories-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="stories-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <div className={styles.marquee}>
          <div className={styles.track}>
            <ul className={styles.grid}>{c.stories.map(renderCard)}</ul>
            <ul className={`${styles.grid} ${styles.gridClone}`} aria-hidden="true">
              {c.stories.map(renderCard)}
            </ul>
          </div>
        </div>

        <ul className={styles.stats}>
          {c.stats.map((s, i) => (
            <li key={i} style={{ "--stat": STAT_COLOURS[i % STAT_COLOURS.length] } as React.CSSProperties}>
              <span className={styles.statValue}>
                <RichText text={s.value} classNames={{ em: styles.statItalic }} />
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>{c.note}</p>
        <a href={c.link.href} className={styles.link}>
          {c.link.label}
        </a>
      </div>
    </section>
  );
}
