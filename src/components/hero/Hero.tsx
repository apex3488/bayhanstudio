"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { LINKS } from "@/lib/links";
import { ROUTES } from "@/lib/routes";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className={styles.hero} aria-label="Hero">
      <div className={styles.metaRow}>
        <span className="meta">{t.hero.status}</span>
        <span className="meta">{t.hero.coords}</span>
      </div>

      <div className={styles.copy}>
        <h1 className={`display ${styles.title}`}>
          <span>{t.hero.line1}</span>
          <span>{t.hero.line2}</span>
        </h1>
        <p className={styles.support}>{t.hero.support}</p>
        <div className={styles.actions}>
          <MagneticButton href={LINKS.telegram} external>
            {t.hero.primary}
          </MagneticButton>
          <MagneticButton href={ROUTES.services} variant="ghost">
            {t.hero.secondary}
          </MagneticButton>
        </div>
      </div>

      <div className={styles.corner} aria-hidden="true">
        <span>SYS // 01</span>
        <span>CORE / STABLE</span>
      </div>
    </section>
  );
}
