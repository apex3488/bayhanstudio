"use client";

import { ContactShadows, Float, Lightformer, Environment } from "@react-three/drei";
import { BayhanCore } from "@/three/objects/BayhanCore";
import { CoreParticles } from "@/three/objects/CoreParticles";
import { CameraRig } from "@/three/scene/CameraRig";
import { PostFX } from "@/three/effects/PostFX";
import { getSceneState } from "@/three/interactions/sceneStore";

export function Experience() {
  const reduced = getSceneState().reducedMotion;
  const quality = getSceneState().quality;

  return (
    <>
      <color attach="background" args={["#050608"]} />
      <fog attach="fog" args={["#050608", 7, 16]} />

      <ambientLight intensity={0.28} color="#9aa4b5" />
      <directionalLight position={[4, 5, 3]} intensity={1.55} color="#f0f2f5" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#3d8bfd" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#3d8bfd" distance={8} />

      <Environment resolution={256} environmentIntensity={0.4}>
        <Lightformer intensity={1.4} position={[0, 4, 2]} scale={[8, 2, 1]} form="rect" />
        <Lightformer
          intensity={0.7}
          position={[-3, 1, -2]}
          scale={3}
          color="#3d8bfd"
          form="ring"
        />
        <Lightformer intensity={0.55} position={[3, -1, 1]} scale={2} form="circle" />
      </Environment>

      {reduced ? (
        <>
          <BayhanCore />
          <CoreParticles />
        </>
      ) : (
        <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.25}>
          <BayhanCore />
          <CoreParticles />
        </Float>
      )}

      {quality.tier === "high" ? (
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.28}
          scale={12}
          blur={2.6}
          far={4}
          color="#000000"
        />
      ) : null}

      <CameraRig />
      <PostFX />
    </>
  );
}
