"use client";

import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ROUTES } from "@/lib/routes";
import { setServiceMode, type ServiceMode } from "@/three/interactions/sceneStore";
import styles from "./HomePreview.module.css";

const MODE_MAP: Record<string, ServiceMode> = {
  websites: "websites",
  bots: "bots",
  automation: "automation",
  crm: "crm",
  assistants: "assistants",
  ai: "ai",
};

export function HomePreview() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`section ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className="meta" data-reveal>
            {t.home.previewLabel}
          </p>
          <h2 className={`display ${styles.title}`} data-reveal>
            {t.home.previewTitle}
          </h2>
        </div>
        <div data-reveal>
          <MagneticButton href={ROUTES.services} variant="ghost">
            {t.home.previewCta}
          </MagneticButton>
        </div>
      </div>

      <div className={styles.grid}>
        {t.services.items.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={ROUTES.services}
            className={styles.item}
            data-cursor="action"
            data-reveal
            onPointerEnter={() => setServiceMode(MODE_MAP[item.id] ?? "idle")}
            onPointerLeave={() => setServiceMode("idle")}
          >
            <span className={styles.number}>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>

      <div className={styles.aboutTeaser} data-reveal>
        <div>
          <p className="meta">{t.home.aboutTeaserLabel}</p>
          <h2 className={`display ${styles.aboutTitle}`}>{t.home.aboutTeaserTitle}</h2>
          <p className={styles.aboutText}>{t.home.aboutTeaserText}</p>
        </div>
        <MagneticButton href={ROUTES.about} variant="soft">
          {t.home.aboutTeaserCta}
        </MagneticButton>
      </div>

      <div className={styles.contactStrip} data-reveal>
        <div>
          <h2 className={`display ${styles.contactTitle}`}>{t.home.contactStripTitle}</h2>
          <p>{t.home.contactStripText}</p>
        </div>
        <MagneticButton href={ROUTES.contact}>{t.contact.cta}</MagneticButton>
      </div>
    </section>
  );
}
