import React from "react";
import { NetworkGlobe } from "./NetworkGlobe";
import styles from "./Network.module.css";

export function Network() {
  return (
    <section id="network" className={styles.network} aria-labelledby="network-heading">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>The network</p>
          <h2 id="network-heading" className={styles.heading}>
            The industry is paying for you to learn how it works.
          </h2>
        </div>
        <p className={styles.body}>
          Ascend&rsquo;s teaching, faculty and platform are funded by partners of
          Included VC. Why would they? Because Included VC exists to change who
          gets to invest, and they have backed that since 2019.
        </p>
      </div>
      <NetworkGlobe />
    </section>
  );
}
