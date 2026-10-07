"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSceneState } from "@/three/interactions/sceneStore";

export function CameraRig() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const scene = getSceneState();
    const px = scene.reducedMotion ? 0 : scene.pointerX * 0.15;
    const py = scene.reducedMotion ? 0 : scene.pointerY * 0.1;

    let z = 5.2;
    let y = 0.15;
    let x = 0;

    if (scene.section === "services") {
      x = -0.35;
      z = 4.9;
    } else if (
      scene.section === "about" ||
      scene.section === "philosophy" ||
      scene.section === "process"
    ) {
      x = 0.45;
      y = 0.25;
      z = 5.4;
    } else if (scene.section === "contact") {
      z = 5.1;
      y = 0.1;
    } else {
      const t = scene.scrollProgress;
      z = 5.2 - t * 0.25;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, x + px, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y - py, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 3, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
