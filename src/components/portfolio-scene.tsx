import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import * as THREE from "three";

function WaterRibbon({ x, z, phase }: { x: number; z: number; phase: number }) {
  const ribbon = useRef<Mesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!ribbon.current) return;
    ribbon.current.position.y = Math.sin(clock.elapsedTime * 0.8 + phase) * 0.08 - 1.8;
    if (material.current) material.current.opacity = 0.16 + Math.sin(clock.elapsedTime + phase) * 0.035;
  });
  return (
    <mesh ref={ribbon} position={[x, -1.8, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.45, 15, 12, 40]} />
      <meshStandardMaterial ref={material} color="#7dd8ff" emissive="#3f8dff" emissiveIntensity={1.2} transparent opacity={0.18} roughness={0.08} metalness={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Portal({ position, scale = 1, speed = 0.08 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const portal = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!portal.current) return;
    portal.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <group ref={portal} position={position} scale={scale}>
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2, ring * 0.44, ring * 0.22]} scale={1 + ring * 0.34}>
          <torusGeometry args={[1.25, ring === 0 ? 0.025 : 0.012, 8, 100]} />
          <meshStandardMaterial color={ring === 0 ? "#ffdca0" : "#af85ff"} emissive={ring === 0 ? "#ffb456" : "#7540d8"} emissiveIntensity={2.2} transparent opacity={0.5 - ring * 0.1} />
        </mesh>
      ))}
      <pointLight color="#b178ff" intensity={8} distance={8} />
    </group>
  );
}

function Monolith({ position, height, tint }: { position: [number, number, number]; height: number; tint: string }) {
  return (
    <Float speed={0.45} rotationIntensity={0.025} floatIntensity={0.16}>
      <mesh position={position}>
        <boxGeometry args={[0.45, height, 0.45]} />
        <meshStandardMaterial color={tint} emissive={tint} emissiveIntensity={0.25} roughness={0.24} metalness={0.75} transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

function CinematicWorld() {
  const world = useRef<Group>(null);
  const cameraTarget = useRef(0);
  const monoliths = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    x: (i % 2 ? 1 : -1) * (2.2 + (i % 4) * 0.95),
    y: -0.65 + (i % 3) * 0.18,
    z: -i * 3.6 + 2,
    h: 1.5 + (i % 5) * 0.55,
  })), []);

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
    const targetZ = 8 - progress * 52;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2.6, delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.75 + Math.sin(progress * Math.PI * 5) * 0.28, 2.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.42 + Math.sin(progress * Math.PI * 3) * 0.2, 2.2, delta);
    state.camera.lookAt(state.camera.position.x * 0.15, -0.1, state.camera.position.z - 8);
    if (world.current) world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, state.pointer.x * 0.035, 2, delta);
  });

  return (
    <group ref={world}>
      <fog attach="fog" args={["#10091f", 7, 25]} />
      <Portal position={[0, 0.3, 0]} scale={1.15} />
      <Portal position={[0.7, 0.1, -17]} scale={0.9} speed={-0.06} />
      <Portal position={[-0.55, 0.35, -35]} scale={1.05} speed={0.045} />
      {monoliths.map((item, index) => <Monolith key={index} position={[item.x, item.y, item.z]} height={item.h} tint={index % 3 === 0 ? "#a55cff" : index % 3 === 1 ? "#473267" : "#d68b64"} />)}
      <WaterRibbon x={-0.75} z={-9} phase={0} />
      <WaterRibbon x={0.75} z={-24} phase={1.7} />
      <WaterRibbon x={0} z={-40} phase={3.2} />
      <Sparkles count={210} scale={[16, 9, 62]} position={[0, 0, -22]} size={1.25} speed={0.16} color="#ead8ff" opacity={0.55} />
      <Sparkles count={70} scale={[9, 3, 52]} position={[0, -1.5, -20]} size={2.1} speed={0.28} color="#87dfff" opacity={0.34} />
    </group>
  );
}

export default function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.38} color="#cab7ff" />
      <directionalLight position={[3, 5, 4]} intensity={2.8} color="#ffd8a6" />
      <pointLight position={[-4, 1, -18]} intensity={6} distance={14} color="#8f5cff" />
      <pointLight position={[4, -1, -36]} intensity={7} distance={16} color="#58c8ff" />
      <CinematicWorld />
    </Canvas>
  );
}