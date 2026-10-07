"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LINKS } from "@/lib/links";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { Process } from "@/components/process/Process";
import styles from "./About.module.css";

export function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root, "[data-reveal]", { immediate: true });

  return (
    <>
      <section ref={root} className={`section ${styles.section}`} aria-labelledby="about-title">
        <div className={styles.top}>
          <p className="meta" data-reveal>
            {t.about.label}
          </p>
          <div className={styles.actions} data-reveal>
            <MagneticButton href={LINKS.telegram} external>
              {t.about.cta}
            </MagneticButton>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <h1 id="about-title" className={`display ${styles.lines}`}>
            <span data-reveal>{t.about.line1}</span>
            <span data-reveal>{t.about.line2}</span>
            <span className={styles.shift} data-reveal>
              {t.about.line3}
            </span>
            <span className={styles.accent} data-reveal>
              {t.about.line4}
            </span>
          </h1>

          <div className={styles.leadBlock} data-reveal>
            <p className={styles.lead}>{t.about.lead}</p>
            <ul className={styles.manifesto}>
              {t.about.manifesto.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.facts} data-reveal>
          {t.about.facts.map((fact) => (
            <article key={fact.label} className={styles.fact}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </article>
          ))}
        </div>

        <div className={styles.combine}>
          <p className="meta" data-reveal>
            {t.about.combine}
          </p>
          <ul className={styles.tags}>
            {t.about.tags.map((tag) => (
              <li key={tag.title} data-reveal>
                <h2>{tag.title}</h2>
                <p>{tag.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.focus} data-reveal>
          <div>
            <p className="meta">{t.about.focusTitle}</p>
            <p className={styles.focusText}>{t.about.focusText}</p>
          </div>
          <MagneticButton href={LINKS.telegram} external variant="soft">
            {t.about.cta}
          </MagneticButton>
        </div>
      </section>

      <Philosophy />
      <Process />
    </>
  );
}
