"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/quality";
import { setScrollProgress } from "@/three/interactions/sceneStore";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const updateProgress = (scrollY: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setScrollProgress(Math.min(1, Math.max(0, p)));
    };

    if (prefersReducedMotion()) {
      const onScroll = () => updateProgress(window.scrollY);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => updateProgress(lenis.scroll);
    lenis.on("scroll", onScroll);
    onScroll();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [enabled]);
}
