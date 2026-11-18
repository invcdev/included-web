import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import styles from "./Press.module.css";

export function Press({ content: c }: { content: SiteContent["press"] }) {
  return (
    <section className={styles.press} aria-labelledby="press-heading">
      <div className="container">
        <h2 id="press-heading" className={styles.label}>
          {c.label}
        </h2>
        <ul className={styles.logos}>
          {c.outlets.map((o) => (
            <li
              key={o.name}
              className={styles.logo}
              data-color={o.colorLogo ? "" : undefined}
            >
              <Image
                src={o.logo.url}
                alt={o.logo.alt || o.name}
                width={o.logo.width}
                height={o.logo.height}
                className={styles.grey}
                style={{ width: o.logo.width / 2, height: "auto" }}
              />
              {o.colorLogo && (
                <Image
                  src={o.colorLogo.url}
                  alt=""
                  width={o.colorLogo.width}
                  height={o.colorLogo.height}
                  className={styles.color}
                  style={{ width: o.colorLogo.width / 2, height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
