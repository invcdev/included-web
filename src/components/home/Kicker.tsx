import React from "react";
import styles from "./Kicker.module.css";

/** Section label: "02 / 05  WHAT YOU WILL DO" followed by a spectrum rule. */
export function Kicker({ step, label }: { step: string; label: string }) {
  return (
    <p className={styles.kicker}>
      <span className={styles.kickerNum}>{step}</span>
      <span>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </p>
  );
}
