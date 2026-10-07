"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALE_LABEL, LOCALES } from "@/i18n";
import { useI18n } from "@/i18n/I18nProvider";
import { ROUTES } from "@/lib/routes";
import { LINKS } from "@/lib/links";
import styles from "./Navigation.module.css";

const LINKS_NAV = [
  { href: ROUTES.services, key: "services" as const },
  { href: ROUTES.about, key: "about" as const },
  { href: ROUTES.contact, key: "contact" as const },
];

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function Navigation() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const current = normalizePath(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""}`}>
        <Link href={ROUTES.home} className={styles.brand} data-cursor="link">
          <span className={styles.mark} aria-hidden="true" />
          <span>BAYHAN STUDIO</span>
        </Link>

        <nav className={styles.desktop} aria-label="Primary">
          {LINKS_NAV.map((item) => {
            const active = current === normalizePath(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navBtn} ${active ? styles.active : ""}`}
                data-cursor="action"
                aria-current={active ? "page" : undefined}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className={styles.right}>
          <div className={styles.langs} role="group" aria-label="Language">
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                className={locale === code ? styles.activeLang : undefined}
                aria-pressed={locale === code}
                data-cursor="link"
                onClick={() => setLocale(code)}
              >
                {LOCALE_LABEL[code]}
              </button>
            ))}
          </div>

          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
            data-cursor="action"
          >
            LET&apos;S BUILD
          </a>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-cursor="action"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </header>

      {open ? (
        <div id="mobile-menu" className={`${styles.overlay} ${styles.open}`}>
          <nav aria-label="Mobile">
            <Link href={ROUTES.home}>{t.nav.home}</Link>
            {LINKS_NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className={styles.overlayActions}>
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className={styles.overlayCta}
            >
              LET&apos;S BUILD
            </a>
            <div className={styles.overlayLangs}>
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={locale === code}
                  onClick={() => setLocale(code)}
                >
                  {LOCALE_LABEL[code]}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
