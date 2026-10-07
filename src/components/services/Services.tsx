"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LINKS } from "@/lib/links";
import { setServiceMode, type ServiceMode } from "@/three/interactions/sceneStore";
import styles from "./Services.module.css";

const MODE_MAP: Record<string, ServiceMode> = {
  websites: "websites",
  bots: "bots",
  automation: "automation",
  crm: "crm",
  assistants: "assistants",
  ai: "ai",
};

type Props = {
  page?: boolean;
};

export function Services({ page = false }: Props) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useReveal(root, "[data-reveal]", { immediate: page });

  return (
    <section
      id="services"
      ref={root}
      className={`section ${styles.section} ${page ? styles.page : ""}`}
    >
      <div className={styles.head}>
        <p className="meta" data-reveal>
          {t.services.label}
        </p>
        <h1 className={`display ${styles.title}`} data-reveal>
          {t.services.title}
        </h1>
        <p className={styles.subtitle} data-reveal>
          {t.services.subtitle}
        </p>
        <p className={`${styles.hint} meta`} data-reveal>
          {t.services.hint}
        </p>
        {page ? (
          <div className={styles.cta} data-reveal>
            <MagneticButton href={LINKS.telegram} external>
              {t.services.pageCta}
            </MagneticButton>
          </div>
        ) : null}
      </div>

      <ul className={styles.list}>
        {t.services.items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={styles.item}
              data-cursor="action"
              data-reveal
              onPointerEnter={() => setServiceMode(MODE_MAP[item.id] ?? "idle")}
              onPointerLeave={() => setServiceMode("idle")}
              onFocus={() => setServiceMode(MODE_MAP[item.id] ?? "idle")}
              onBlur={() => setServiceMode("idle")}
            >
              <span className={styles.number}>{item.number}</span>
              <span className={styles.body}>
                <span className={styles.name}>{item.title}</span>
                <span className={styles.desc}>{item.description}</span>
                <span className={styles.points}>
                  {item.points.map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </span>
              </span>
              <span className={styles.line} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
