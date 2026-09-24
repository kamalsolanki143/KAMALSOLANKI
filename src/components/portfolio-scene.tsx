import { Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";

function CinematicWorld() {
  const world = useRef<Group>(null);
  const cameraTarget = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      cameraTarget.current = window.scrollY / max;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useFrame((state, delta) => {
    const progress = cameraTarget.current;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.5, 2.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.28, 2.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 8 - progress * 2.5, 2, delta);
    state.camera.lookAt(0, 0, 0);
    if (world.current) world.current.rotation.z = THREE.MathUtils.damp(world.current.rotation.z, state.pointer.x * 0.018, 2, delta);
  });

  return (
    <group ref={world}>
      <fog attach="fog" args={["#08061c", 5, 18]} />
      <Sparkles count={145} scale={[16, 9, 10]} position={[0, 0, 0]} size={1.15} speed={0.12} color="#f8c5d9" opacity={0.48} />
      <Sparkles count={45} scale={[10, 5, 8]} position={[0, -1, 1]} size={2} speed={0.2} color="#8fdcff" opacity={0.32} />
    </group>
  );
}

export default function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <CinematicWorld />
    </Canvas>
  );
}