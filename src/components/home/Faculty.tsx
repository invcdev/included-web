import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Kicker } from "./Kicker";
import styles from "./Faculty.module.css";

// TODO: real titles/funds and final photos (placeholders are cropped from the design).
const FACULTY = [
  { name: "Reshma Sohoni", photo: "reshma-sohoni" },
  { name: "Simon Schmincke", photo: "simon-schmincke" },
  { name: "Oscar Farres", photo: "oscar-farres" },
  { name: "Itxaso del Palacio", photo: "itxaso-del-palacio" },
  { name: "Andy Leaver", photo: "andy-leaver" },
  { name: "Brad Doline", photo: "brad-doline" },
  { name: "Carlos Eduardo Espinal", photo: "carlos-eduardo-espinal" },
  { name: "Maria Dramalioti-Taylor", photo: "maria-dramalioti-taylor" },
  { name: "Chris Tottman", photo: "reshma-sohoni" },
  { name: "Daniel Blomquist", photo: "simon-schmincke" },
  { name: "Daniel Glazer", photo: "oscar-farres" },
  { name: "Felix Martinez", photo: "itxaso-del-palacio" },
].map((f) => ({ ...f, role: "[Title \u00b7 Fund]" }));

export function Faculty() {
  return (
    <section id="faculty" className={styles.faculty} aria-labelledby="faculty-heading">
      <div className="container">
        <Kicker step="03 / 05" label="Who is in the room" />

        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Faculty</p>
            <h2 id="faculty-heading" className={styles.heading}>
              Taught by people who invest for a living.
            </h2>
          </div>
          <a href={siteConfig.cta.network} className={styles.button}>
            Explore the network
          </a>
        </div>

        <ul className={styles.grid}>
          {FACULTY.map((f) => (
            <li key={f.name} className={styles.card}>
              <Image
                src={`/faculty/${f.photo}-photo-placeholder.jpg`}
                alt=""
                width={357}
                height={476}
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
