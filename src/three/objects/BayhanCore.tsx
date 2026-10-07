"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import {
  getSceneState,
  type SceneSection,
  type ServiceMode,
} from "@/three/interactions/sceneStore";

const MODE_EMISSIVE: Record<ServiceMode, number> = {
  idle: 0.08,
  websites: 0.14,
  bots: 0.18,
  automation: 0.16,
  crm: 0.12,
  assistants: 0.28,
  ai: 0.35,
};

function sectionTargets(section: SceneSection, progress: number) {
  if (section === "services") {
    return { x: 1.25, y: 0.1, z: -0.35, scale: 0.82, rotSpeed: 0.16 };
  }
  if (section === "about" || section === "philosophy" || section === "process") {
    const drift = progress * 0.35;
    return { x: -0.85 + drift * 0.2, y: 0.05, z: -0.9, scale: 0.7, rotSpeed: 0.08 };
  }
  if (section === "contact") {
    return { x: 0.15, y: 0.05, z: -0.25, scale: 0.9, rotSpeed: 0.07 };
  }

  // home / hero — subtle scroll drift
  const t = Math.min(1, progress * 1.4);
  return {
    x: 0.2 * t,
    y: 0.1 - t * 0.05,
    z: -0.15 * t,
    scale: 1 - t * 0.08,
    rotSpeed: 0.12,
  };
}

export function BayhanCore() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const grid = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const gridMat = useRef<THREE.MeshBasicMaterial>(null);

  const quality = getSceneState().quality;
  const [wSeg, hSeg] = quality.sphereDetail;

  useFrame((state, delta) => {
    const scene = getSceneState();
    const groupRef = group.current;
    if (!groupRef) return;

    const targets = sectionTargets(scene.section, scene.scrollProgress);
    const pointerInfluence = scene.reducedMotion ? 0 : 0.35;
    const px = scene.pointerX * pointerInfluence;
    const py = scene.pointerY * pointerInfluence;

    groupRef.position.x = THREE.MathUtils.damp(
      groupRef.position.x,
      targets.x + px * 0.35,
      3,
      delta,
    );
    groupRef.position.y = THREE.MathUtils.damp(
      groupRef.position.y,
      targets.y - py * 0.25,
      3,
      delta,
    );
    groupRef.position.z = THREE.MathUtils.damp(groupRef.position.z, targets.z, 3, delta);

    const nextScale = THREE.MathUtils.damp(groupRef.scale.x, targets.scale, 3, delta);
    groupRef.scale.setScalar(nextScale);

    if (!scene.reducedMotion) {
      groupRef.rotation.y += delta * targets.rotSpeed;
      groupRef.rotation.x = THREE.MathUtils.damp(groupRef.rotation.x, py * 0.2, 4, delta);
      if (ringA.current) ringA.current.rotation.x += delta * 0.25;
      if (ringB.current) ringB.current.rotation.y += delta * 0.18;
    }

    const mode = scene.serviceMode;
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = THREE.MathUtils.damp(
        coreMat.current.emissiveIntensity,
        MODE_EMISSIVE[mode],
        4,
        delta,
      );
    }
    if (innerMat.current) {
      const pulse =
        mode === "assistants" || mode === "ai"
          ? 0.2 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08
          : 0.12;
      innerMat.current.emissiveIntensity = THREE.MathUtils.damp(
        innerMat.current.emissiveIntensity,
        pulse,
        4,
        delta,
      );
    }

    if (wireMat.current && wire.current) {
      wireMat.current.opacity = THREE.MathUtils.damp(
        wireMat.current.opacity,
        mode === "websites" ? 0.35 : 0,
        5,
        delta,
      );
      wire.current.visible = wireMat.current.opacity > 0.01;
    }

    if (gridMat.current && grid.current) {
      gridMat.current.opacity = THREE.MathUtils.damp(
        gridMat.current.opacity,
        mode === "crm" ? 0.22 : 0,
        5,
        delta,
      );
      grid.current.visible = gridMat.current.opacity > 0.01;
    }

    if (shell.current) {
      const target = mode === "ai" ? 1.18 : mode === "assistants" ? 1.08 : 1.02;
      shell.current.scale.setScalar(
        THREE.MathUtils.damp(shell.current.scale.x, target, 4, delta),
      );
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, wSeg, hSeg]} />
        <meshPhysicalMaterial
          ref={coreMat}
          color="#141820"
          metalness={0.92}
          roughness={0.28}
          clearcoat={0.65}
          clearcoatRoughness={0.2}
          envMapIntensity={1.1}
          emissive="#0a2548"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh ref={shell} scale={1.02}>
        <sphereGeometry args={[1, Math.max(24, Math.floor(wSeg / 2)), Math.max(24, Math.floor(hSeg / 2))]} />
        <meshPhysicalMaterial
          ref={innerMat}
          color="#1a2433"
          metalness={0.85}
          roughness={0.18}
          transmission={0.12}
          thickness={0.4}
          transparent
          opacity={0.85}
          emissive="#3d8bfd"
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh ref={wire} scale={1.05} visible={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={wireMat}
          color="#3d8bfd"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={grid} scale={1.12} visible={false}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial
          ref={gridMat}
          color="#a8b0bd"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0.1]} scale={1.35}>
        <torusGeometry args={[1, 0.008, 12, 128]} />
        <meshStandardMaterial
          color="#8a93a3"
          metalness={0.95}
          roughness={0.22}
          emissive="#3d8bfd"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh ref={ringB} rotation={[0.4, Math.PI / 3, 0.6]} scale={1.55}>
        <torusGeometry args={[1, 0.006, 12, 160]} />
        <meshStandardMaterial
          color="#8a93a3"
          metalness={0.95}
          roughness={0.22}
          emissive="#3d8bfd"
          emissiveIntensity={0.04}
        />
      </mesh>
    </group>
  );
}
