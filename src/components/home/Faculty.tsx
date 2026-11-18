import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import { Kicker } from "./Kicker";
import styles from "./Faculty.module.css";

export function Faculty({ content: c }: { content: SiteContent["faculty"] }) {
  return (
    <section id="faculty" className={styles.faculty} aria-labelledby="faculty-heading">
      <div className="container">
        <Kicker step={c.kicker.step} label={c.kicker.label} />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="faculty-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <a href={c.button.href} className={styles.button}>
            {c.button.label}
          </a>
        </div>

        <ul className={styles.grid}>
          {c.people.map((f, i) => (
            <li key={i} className={styles.card}>
              <Image
                src={f.photo.url}
                alt={f.photo.alt}
                width={f.photo.width}
                height={f.photo.height}
                sizes="(max-width: 520px) 50vw, (max-width: 760px) 33vw, (max-width: 1100px) 25vw, 180px"
                className={styles.photo}
              />
              <span className={styles.text}>
                <span className={styles.name}>{f.name}</span>
                <span className={styles.role}>{f.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
