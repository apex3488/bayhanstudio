"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getSceneState } from "@/three/interactions/sceneStore";

export function CoreParticles() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const count = getSceneState().quality.particles;

  const { positions, speeds, dummy, color } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const r = 1.7 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    return {
      positions,
      speeds,
      dummy: new THREE.Object3D(),
      color: new THREE.Color("#3d8bfd"),
    };
  }, [count]);

  const lineGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const verts = new Float32Array(24 * 2 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    const scene = getSceneState();
    const inst = mesh.current;
    if (!inst) return;

    const mode = scene.serviceMode;
    const t = state.clock.elapsedTime;
    const orbitTight = mode === "bots" ? 0.55 : 1;
    const connect = mode === "automation";

    for (let i = 0; i < count; i += 1) {
      const ix = i * 3;
      let x = positions[ix];
      let y = positions[ix + 1];
      let z = positions[ix + 2];

      if (!scene.reducedMotion) {
        const angle = t * speeds[i] * 0.35;
        const cos = Math.cos(angle * delta * 60 * 0.002);
        const sin = Math.sin(angle * delta * 60 * 0.002);
        const nx = x * cos - z * sin;
        const nz = x * sin + z * cos;
        x = nx;
        z = nz;
        positions[ix] = x;
        positions[ix + 1] = y;
        positions[ix + 2] = z;
      }

      const scaleBase = mode === "ai" ? 0.028 : 0.018;
      dummy.position.set(x * orbitTight, y * orbitTight, z * orbitTight);
      dummy.scale.setScalar(scaleBase + (i % 7) * 0.0015);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;

    if (lines.current) {
      lines.current.visible = connect;
      if (connect) {
        const attr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
        const arr = attr.array as Float32Array;
        for (let i = 0; i < 24; i += 1) {
          const a = i % count;
          const b = (i * 3 + 5) % count;
          arr[i * 6] = positions[a * 3] * orbitTight;
          arr[i * 6 + 1] = positions[a * 3 + 1] * orbitTight;
          arr[i * 6 + 2] = positions[a * 3 + 2] * orbitTight;
          arr[i * 6 + 3] = positions[b * 3] * orbitTight;
          arr[i * 6 + 4] = positions[b * 3 + 1] * orbitTight;
          arr[i * 6 + 5] = positions[b * 3 + 2] * orbitTight;
        }
        attr.needsUpdate = true;
      }
    }

    inst.rotation.y = scene.reducedMotion ? 0 : t * 0.03;
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </instancedMesh>
      <lineSegments ref={lines} geometry={lineGeo} visible={false}>
        <lineBasicMaterial color="#3d8bfd" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}
