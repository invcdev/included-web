import React from "react";
import Link from "next/link";
import { UnicornCanvas } from "@/components/home/UnicornCanvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section id="world" className={styles.heroSection} aria-labelledby="hero-heading">
      {/* Left Column: Typography & CTAs */}
      <div className={styles.leftCol}>
        {/* Kicker badge */}
        <p className={styles.kicker}>
          <span className={styles.kickerBar} aria-hidden="true" />
          <span>GLOBAL FELLOWSHIP — CLASS &apos;26 REGISTRATIONS OPEN</span>
        </p>

        {/* SEO Single H1 */}
        <h1 id="hero-heading" className={styles.heading}>
          <span className={styles.headingLine}>Changing</span>
          <span className={styles.headingLine}>
            the <em className={styles.faceEm}>face</em>
          </span>
          <span className={styles.headingLine}>of venture</span>
          <span className={styles.headingLine}>capital.</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subheading}>
          A fully funded fellowship, launchpad and lifelong community for
          exceptional people from overlooked backgrounds — breaking into VC and
          deciding what gets built next.
        </p>

        {/* Action Buttons */}
        <div className={styles.ctaGroup}>
          <a
            href="https://form.typeform.com/to/bALnGEQ7"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryBtn}
            id="cta-apply-fellowship"
          >
            Apply to the Fellowship
          </a>
          <Link href="#voices" className={styles.secondaryLink} id="cta-see-fellows">
            See where Fellows land →
          </Link>
        </div>

        {/* Fact highlights */}
        <p className={styles.factsLine}>
          FULLY FUNDED <span className={styles.sparkle}>✦</span> PART-TIME{" "}
          <span className={styles.sparkle}>✦</span> 40+ NATIONALITIES{" "}
          <span className={styles.sparkle}>✦</span> SIX CONTINENTS
        </p>
      </div>

      {/* Right Column: Interactive Spectrum Dot-Matrix Unicorn */}
      <div className={styles.rightCol} aria-hidden="true">
        <UnicornCanvas />
      </div>
    </section>
  );
}
