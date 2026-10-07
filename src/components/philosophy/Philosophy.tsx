"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import styles from "./Philosophy.module.css";

export function Philosophy() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root, "[data-reveal]", { immediate: true });

  return (
    <section id="philosophy" ref={root} className={`section ${styles.section}`}>
      <div className={styles.head}>
        <p className="meta" data-reveal>
          {t.philosophy.label}
        </p>
        <h2 className={`display ${styles.title}`} data-reveal="clip">
          {t.philosophy.title}
        </h2>
        <p className={styles.subtitle} data-reveal>
          {t.philosophy.subtitle}
        </p>
      </div>

      <div className={styles.system} aria-hidden="true">
        <span className={styles.node} />
        <span className={styles.node} />
        <span className={styles.node} />
        <span className={styles.node} />
        <span className={styles.link} />
        <span className={`${styles.link} ${styles.linkB}`} />
      </div>

      <ul className={styles.nodes}>
        {t.philosophy.nodes.map((node, index) => (
          <li key={node.id} data-reveal style={{ ["--i" as string]: index }}>
            <span className={styles.index}>0{index + 1}</span>
            <h3>{node.title}</h3>
            <p>{node.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
