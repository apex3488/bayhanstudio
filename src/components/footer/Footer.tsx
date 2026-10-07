"use client";

import Link from "next/link";
import { LOCALE_LABEL, LOCALES } from "@/i18n";
import { useI18n } from "@/i18n/I18nProvider";
import { LINKS } from "@/lib/links";
import { ROUTES } from "@/lib/routes";
import styles from "./Footer.module.css";

export function Footer() {
  const { t, locale, setLocale } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`section ${styles.inner}`}>
        <div>
          <p className={styles.brand}>BAYHAN STUDIO</p>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <div className={styles.links}>
          <Link href={ROUTES.services} data-cursor="link">
            {t.nav.services}
          </Link>
          <Link href={ROUTES.about} data-cursor="link">
            {t.nav.about}
          </Link>
          <Link href={ROUTES.contact} data-cursor="link">
            {t.nav.contact}
          </Link>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" data-cursor="link">
            Telegram
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" data-cursor="link">
            Instagram
          </a>
        </div>

        <div className={styles.langs} role="group" aria-label="Language">
          {LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={locale === code}
              data-cursor="link"
              onClick={() => setLocale(code)}
            >
              {LOCALE_LABEL[code]}
            </button>
          ))}
        </div>

        <p className={styles.copy}>{t.footer.rights}</p>
      </div>
    </footer>
  );
}
