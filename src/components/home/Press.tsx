import React from "react";
import Image from "next/image";
import styles from "./Press.module.css";

// `src` is the grey logo shown at rest; `color` (the real brand colour) fades in on hover.
// Forbes, Business Insider (#1A1A1A) and Startups Magazine are black wordmarks.
// TODO: swap placeholders (cropped from the design) for the final logo assets.
type Outlet = {
  name: string;
  src: string;
  color?: string;
  w: number;
  h: number;
};

const OUTLETS: Outlet[] = [
  {
    name: "Forbes",
    src: "/press/forbes-placeholder.png",
    color: "/press/forbes-color.png",
    w: 216,
    h: 56,
  },
  {
    name: "Sky News",
    src: "/press/sky-news-placeholder.png",
    color: "/press/sky-news-color.png",
    w: 220,
    h: 57,
  },
  {
    name: "Business Insider",
    src: "/press/business-insider-placeholder.png",
    color: "/press/business-insider-color.png",
    w: 185,
    h: 58,
  },
  {
    name: "Startups Magazine",
    src: "/press/startups-placeholder.png",
    color: "/press/startups-color.png",
    w: 186,
    h: 59,
  },
  {
    name: "Silicon Canals",
    src: "/press/silicon-canals-placeholder.png",
    color: "/press/silicon-canals-color.png",
    w: 173,
    h: 57,
  },
];

export function Press() {
  return (
    <section className={styles.press} aria-labelledby="press-heading">
      <div className="container">
        <h2 id="press-heading" className={styles.label}>
          As featured in
        </h2>
        <ul className={styles.logos}>
          {OUTLETS.map((o) => (
            <li
              key={o.name}
              className={styles.logo}
              data-color={o.color ? "" : undefined}
            >
              <Image
                src={o.src}
                alt={o.name}
                width={o.w}
                height={o.h}
                className={styles.grey}
                style={{ width: o.w / 2, height: "auto" }}
              />
              {o.color && (
                <Image
                  src={o.color}
                  alt=""
                  width={o.w}
                  height={o.h}
                  className={styles.color}
                  style={{ width: o.w / 2, height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
