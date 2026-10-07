"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/quality";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");
    const rootEl = root.current;
    if (!rootEl) return;

    const xTo = gsap.quickTo(rootEl, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(rootEl, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      if (!interactive) {
        rootEl.dataset.state = "default";
        return;
      }
      const mode = (interactive as HTMLElement).dataset.cursor ?? "link";
      rootEl.dataset.state = mode;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={root} className={`${styles.cursor} custom-cursor`} data-state="default" aria-hidden="true">
      <div className={styles.dot} />
    </div>
  );
}
