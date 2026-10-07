"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/I18nProvider";
import { useReveal } from "@/animations/useReveal";
import { prefersReducedMotion } from "@/lib/quality";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useReveal(root, "[data-reveal]", { immediate: true });

  useEffect(() => {
    const section = root.current;
    const row = track.current;
    if (!section || !row || prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 899px)").matches) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, row.scrollWidth - section.clientWidth + 80);
      gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [locale]);

  return (
    <section id="process" ref={root} className={styles.section}>
      <div className={`section ${styles.head}`}>
        <p className="meta" data-reveal>
          {t.process.label}
        </p>
        <h2 className={`display ${styles.title}`} data-reveal="clip">
          {t.process.title}
        </h2>
      </div>

      <div className={styles.viewport}>
        <div ref={track} className={styles.track}>
          {t.process.steps.map((step) => (
            <article key={step.number} className={styles.step} data-reveal>
              <span className={styles.number}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
