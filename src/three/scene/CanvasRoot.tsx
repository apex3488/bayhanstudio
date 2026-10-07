"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "@/three/scene/Experience";
import { CoreFallback } from "@/three/fallback/CoreFallback";
import { getSceneState, initSceneRuntime, patchScene } from "@/three/interactions/sceneStore";
import styles from "./CanvasRoot.module.css";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function CanvasRoot() {
  const [supported, setSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initSceneRuntime();
    setSupported(hasWebGL());
    setMounted(true);
    patchScene({ ready: true });
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      getSceneState().pointerX = x;
      getSceneState().pointerY = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!mounted) return <div className={styles.root} aria-hidden="true" />;
  if (!supported) return <CoreFallback />;

  const quality = getSceneState().quality;

  return (
    <div className={styles.root} aria-hidden="true">
      <Canvas
        dpr={quality.dpr}
        camera={{ position: [0, 0.15, 5.2], fov: 42, near: 0.1, far: 40 }}
        gl={{
          antialias: quality.tier !== "low",
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}
