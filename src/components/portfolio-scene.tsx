import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function AtmosphericWorld() {
  const world = useRef<Group>(null);
  const gate = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (world.current) {
      world.current.rotation.y += (state.pointer.x * 0.08 - world.current.rotation.y) * 0.025;
      world.current.rotation.x += (-state.pointer.y * 0.045 - world.current.rotation.x) * 0.025;
    }
    if (gate.current) gate.current.rotation.z += delta * 0.035;
    state.camera.position.x += (state.pointer.x * 0.22 - state.camera.position.x) * 0.018;
    state.camera.position.y += (state.pointer.y * 0.16 - state.camera.position.y) * 0.018;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={world}>
      <group position={[0, 0, -1.5]}>
        {[0, 1, 2].map((ring) => (
          <mesh ref={ring === 0 ? gate : undefined} key={ring} rotation={[Math.PI / 2, 0, ring * 0.55]} scale={1 + ring * 0.72}>
            <torusGeometry args={[1.35, 0.007, 6, 150]} />
            <meshBasicMaterial color={ring === 0 ? "#ffe3aa" : "#bba0ff"} transparent opacity={0.2 - ring * 0.045} />
          </mesh>
        ))}
      </group>
      <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh position={[-3.8, 1.8, -3]} rotation={[0.2, 0.4, -0.15]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#7e62b6" emissive="#412474" emissiveIntensity={0.55} roughness={0.38} metalness={0.5} />
        </mesh>
      </Float>
      <Float speed={0.85} rotationIntensity={0.18} floatIntensity={0.32}>
        <mesh position={[4.2, -1.6, -4]} rotation={[0.35, 0.8, 0.1]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#d39b7c" emissive="#8b4d39" emissiveIntensity={0.45} roughness={0.42} metalness={0.35} />
        </mesh>
      </Float>
      <Sparkles count={120} scale={[12, 8, 7]} size={1.15} speed={0.12} color="#eadcff" opacity={0.44} />
    </group>
  );
}

export default function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.4], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 2, 4]} intensity={7} color="#ffd7a6" />
      <AtmosphericWorld />
    </Canvas>
  );
}