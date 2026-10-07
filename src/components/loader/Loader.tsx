"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/quality";
import styles from "./Loader.module.css";

type Props = {
  onDone: () => void;
};

export function Loader({ onDone }: Props) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"init" | "ready">("init");
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (prefersReducedMotion()) {
      const id = window.setTimeout(() => doneRef.current(), 180);
      return () => window.clearTimeout(id);
    }

    const panel = panelRef.current;
    const progress = progressRef.current;
    if (!panel || !progress) return;

    const tl = gsap.timeline({
      onComplete: () => {
        doneRef.current();
      },
    });

    tl.to(progress, {
      scaleX: 1,
      duration: 1.35,
      ease: "power2.inOut",
    })
      .add(() => setPhase("ready"), "-=0.15")
      .to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.05,
        ease: "power4.inOut",
        delay: 0.3,
      });

    return () => {
      tl.kill();
      gsap.killTweensOf([panel, progress]);
    };
  }, []);

  return (
    <div ref={panelRef} className={styles.panel} role="status" aria-live="polite">
      <div className={styles.inner}>
        <p className={styles.brand}>{t.loader.brand}</p>
        <p className={styles.status}>
          {phase === "init" ? t.loader.initializing : t.loader.ready}
        </p>
        <div className={styles.bar}>
          <span ref={progressRef} className={styles.progress} />
        </div>
      </div>
    </div>
  );
}
