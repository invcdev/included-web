import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import styles from "./FounderLetter.module.css";

export function FounderLetter() {
  return (
    <section id="founder-letter" className={styles.letter} aria-labelledby="founder-letter-heading">
      <div className={`container ${styles.inner}`}>
        <figure className={styles.media}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.frame}>
            {/* TODO: replace with the final portrait (cropped from the design for now). */}
            <Image
              src="/team/nikita-thakrar-placeholder.jpg"
              alt="Nikita Thakrar"
              width={528}
              height={660}
              className={styles.photo}
            />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.name}>Nikita Thakrar</span>
            <span className={styles.role}>Founder and CEO, Included VC</span>
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>A letter from the founder</p>
          <blockquote className={styles.quote}>
            <p id="founder-letter-heading">
              &ldquo;One of the hardest things about building an organisation around representation is
              knowing there are always more brilliant people outside the room than you can fit inside
              it.&rdquo;
            </p>
          </blockquote>
          <p className={styles.body}>For seven years, we could only say yes to a few.</p>
          <p className={styles.kicker}>So this year, we&rsquo;re opening the doors.</p>
          <div className={styles.ctas}>
            <a href={siteConfig.cta.enrol} className={styles.primaryBtn}>
              Take your seat
            </a>
            <a href={siteConfig.cta.founderLetter} className={styles.secondaryBtn}>
              Read the full letter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
