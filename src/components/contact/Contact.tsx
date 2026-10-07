"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { LINKS } from "@/lib/links";
import { useReveal } from "@/animations/useReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./Contact.module.css";

type Props = {
  page?: boolean;
};

export function Contact({ page = false }: Props) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root, "[data-reveal]", { immediate: page });

  return (
    <section
      id="contact"
      ref={root}
      className={`section ${styles.section} ${page ? styles.page : ""}`}
    >
      <p className="meta" data-reveal>
        {t.contact.label}
      </p>

      <h1 className={`display ${styles.title}`}>
        <span data-reveal>{t.contact.title1}</span>
        <span data-reveal>{t.contact.title2}</span>
        <span className={styles.dim} data-reveal>
          {t.contact.title3}
        </span>
      </h1>

      <p className={styles.lead} data-reveal>
        {t.contact.lead}
      </p>

      <div className={styles.ctaRow} data-reveal>
        <MagneticButton href={LINKS.telegram} external>
          {t.contact.cta}
        </MagneticButton>
        <MagneticButton href={LINKS.telegramChannel} external variant="ghost">
          {t.contact.channel}
        </MagneticButton>
      </div>

      <ul className={styles.channels}>
        <li data-reveal>
          <span>{t.contact.telegram}</span>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" data-cursor="link">
            {LINKS.telegramHandle}
          </a>
        </li>
        <li data-reveal>
          <span>{t.contact.channel}</span>
          <a href={LINKS.telegramChannel} target="_blank" rel="noreferrer" data-cursor="link">
            {LINKS.channelHandle}
          </a>
        </li>
        <li data-reveal>
          <span>{t.contact.instagram}</span>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" data-cursor="link">
            {LINKS.instagramHandle}
          </a>
        </li>
        <li data-reveal>
          <span>{t.contact.phone}</span>
          <a href={LINKS.phone} data-cursor="link">
            {LINKS.phoneDisplay}
          </a>
        </li>
        <li data-reveal>
          <span>{t.contact.hours}</span>
          <strong>{t.contact.hoursValue}</strong>
        </li>
      </ul>
    </section>
  );
}
