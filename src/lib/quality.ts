export type QualityTier = "high" | "medium" | "low";

export type QualityProfile = {
  tier: QualityTier;
  dpr: [number, number];
  particles: number;
  bloom: boolean;
  shadows: boolean;
  sphereDetail: [number, number];
};

export function detectQuality(): QualityProfile {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      dpr: [1, 1.5],
      particles: 800,
      bloom: true,
      shadows: false,
      sphereDetail: [64, 64],
    };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (reduced || (mobile && (cores <= 4 || memory <= 4))) {
    return {
      tier: "low",
      dpr: [1, 1],
      particles: 180,
      bloom: false,
      shadows: false,
      sphereDetail: [24, 24],
    };
  }

  if (mobile || cores <= 4 || memory <= 4) {
    return {
      tier: "medium",
      dpr: [1, 1.25],
      particles: 320,
      bloom: false,
      shadows: false,
      sphereDetail: [32, 32],
    };
  }

  return {
    tier: "high",
    dpr: [1, 1.5],
    particles: 560,
    bloom: true,
    shadows: false,
    sphereDetail: [64, 64],
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}
