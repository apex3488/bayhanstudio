"use client";

import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import { ROUTES } from "@/lib/routes";
import styles from "./HomeGates.module.css";

export function HomeGates() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const gates = [
    {
      href: ROUTES.services,
      number: "01",
      title: t.home.gateServices,
      text: t.home.gateServicesText,
    },
    {
      href: ROUTES.about,
      number: "02",
      title: t.home.gateAbout,
      text: t.home.gateAboutText,
    },
    {
      href: ROUTES.contact,
      number: "03",
      title: t.home.gateContact,
      text: t.home.gateContactText,
    },
  ];

  return (
    <section ref={root} className={`section ${styles.section}`}>
      <div className={styles.head}>
        <p className="meta" data-reveal>
          {t.home.gatesLabel}
        </p>
        <h2 className={`display ${styles.title}`} data-reveal>
          {t.home.gatesTitle}
        </h2>
      </div>

      <div className={styles.grid}>
        {gates.map((gate) => (
          <Link
            key={gate.href}
            href={gate.href}
            className={styles.card}
            data-cursor="action"
            data-reveal
          >
            <div className={styles.cardTop}>
              <span className={styles.number}>{gate.number}</span>
              <span className={styles.open}>{t.home.open} →</span>
            </div>
            <h3>{gate.title}</h3>
            <p>{gate.text}</p>
            <span className={styles.glow} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
