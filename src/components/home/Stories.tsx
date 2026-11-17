import React from "react";
import { siteConfig } from "@/config/site";
import styles from "./Stories.module.css";

type Story = {
  quote: string;
  name: string;
  role: string;
  /** feature = large quote on navy; wide = spans two columns. */
  kind: "feature" | "card" | "wide";
  area: string;
};

const STORIES: Story[] = [
  {
    kind: "feature",
    area: "a",
    quote: "\u201cIncluded VC gave me all the benefits of being a \u2018nepo baby\u2019 without having been born into privilege.\u201d",
    name: "Amisha Kalra",
    role: "Advent International, Fellow 2024",
  },
  {
    kind: "card",
    area: "b",
    quote: "\u201cI got my first job in VC thanks to Included VC. The moment the team heard I\u2019d gotten into Included VC, something shifted.\u201d",
    name: "Soo Min Hong",
    role: "Analyst, Pale Blue Dot, Fellow 2020",
  },
  {
    kind: "card",
    area: "c",
    quote: "\u201cIncluded VC was a life-changing experience. The depth shared by practitioners from top-performing funds took it to the next level.\u201d",
    name: "Lucas Kuziv",
    role: "Investor, Beacon Capital, Fellow 2022",
  },
  {
    kind: "feature",
    area: "d",
    quote: "\u201cIncluded VC is the warp-speed ticket into the world of VC.\u201d",
    name: "Leen Segers",
    role: "Managing Director, ForsVC, Fellow 2023",
  },
  {
    kind: "wide",
    area: "e",
    quote: "\u201cI graduated with a wealth of unspoken insights that can be found nowhere outside of this Fellowship.\u201d",
    name: "Sijue Zhao",
    role: "Included VC Fellow 2022",
  },
  {
    kind: "card",
    area: "f",
    quote: "\u201cWhat truly resonates with me is the newfound confidence and the invaluable, diverse network that has become a lifelong asset.\u201d",
    name: "Sudarshan GC",
    role: "Included VC Fellow 2025",
  },
];

// Parts in italics are set with `i`.
const STATS: { value: { t: string; i?: boolean }[]; label: string; colour: string }[] = [
  { value: [{ t: "7 years", i: true }], label: "of investment education, funded by partners", colour: "var(--brand)" },
  { value: [{ t: "5" }], label: "Fellows now Partners. All five are women.", colour: "#4194A0" },
  { value: [{ t: "500" }, { t: "+", i: true }], label: "pieces of research published by Fellows", colour: "#678826" },
  { value: [{ t: "40" }, { t: "+", i: true }], label: "countries represented in a single cohort", colour: "var(--ink)" },
];

export function Stories() {
  return (
    <section id="stories" className={styles.stories} aria-labelledby="stories-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Hear from our community</p>
            <h2 id="stories-heading" className={styles.heading}>
              In their own words.
            </h2>
          </div>
          <p className={styles.body}>
            These are Included VC Fellows, on what it is like to learn with this network.
            Ascend&rsquo;s first cohort starts in January, so its stories are still to be written.
          </p>
        </div>

        <ul className={styles.grid}>
          {STORIES.map((s) => (
            <li
              key={s.name}
              className={`${styles.story} ${styles[s.kind]}`}
              style={{ gridArea: s.area }}
            >
              <figure className={styles.figure}>
                {s.kind === "feature" && <span className={styles.bar} aria-hidden="true" />}
                <blockquote className={styles.quote}>
                  <p>{s.quote}</p>
                </blockquote>
                <figcaption className={styles.person}>
                  {/* TODO: swap the gradient placeholder for a photo if there is one. */}
                  <span className={styles.avatar} aria-hidden="true" />
                  <span className={styles.personText}>
                    <span className={styles.name}>{s.name}</span>
                    <span className={styles.role}>{s.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.label} style={{ "--stat": s.colour } as React.CSSProperties}>
              <span className={styles.statValue}>
                {s.value.map((v) =>
                  v.i ? (
                    <em key={v.t} className={styles.statItalic}>
                      {v.t}
                    </em>
                  ) : (
                    <React.Fragment key={v.t}>{v.t}</React.Fragment>
                  ),
                )}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Fellowship results. 85% of Fellowship alumni now work in investment. Ascend does not
          guarantee a job.
        </p>
        <a href={siteConfig.cta.alumni} className={styles.link}>
          Explore our alumni community
        </a>
      </div>
    </section>
  );
}
