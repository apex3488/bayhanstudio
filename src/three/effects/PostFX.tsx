"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { getSceneState } from "@/three/interactions/sceneStore";

export function PostFX() {
  const { bloom, tier } = getSceneState().quality;
  if (!bloom || tier === "low") return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.35}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
    </EffectComposer>
  );
}
