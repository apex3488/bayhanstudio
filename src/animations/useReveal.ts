"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/quality";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  immediate?: boolean;
};

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  selector = "[data-reveal]",
  options: Options = {},
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      targets.forEach((el) => {
        const span = el.querySelector("span");
        if (span) gsap.set(span, { clearProps: "all" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el, index) => {
        const type = el.dataset.reveal ?? "fade";
        const delay = options.immediate ? index * 0.06 : 0;
        const trigger = options.immediate
          ? undefined
          : {
              trigger: el,
              start: "top 90%",
              once: true,
            };

        if (type === "clip") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: DUR.slow,
              ease: EASE.expo,
              delay,
              scrollTrigger: trigger,
            },
          );
        } else if (type === "line") {
          const span = el.querySelector("span");
          if (!span) return;
          gsap.fromTo(
            span,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: DUR.med,
              ease: EASE.out,
              delay,
              scrollTrigger: trigger,
            },
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DUR.med,
              ease: EASE.soft,
              delay,
              scrollTrigger: trigger,
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [ref, selector, options.immediate]);
}
