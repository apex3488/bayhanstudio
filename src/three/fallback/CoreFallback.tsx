"use client";

import styles from "./CoreFallback.module.css";

export function CoreFallback() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.orb} />
      <div className={styles.ring} />
      <div className={styles.ringB} />
    </div>
  );
}
