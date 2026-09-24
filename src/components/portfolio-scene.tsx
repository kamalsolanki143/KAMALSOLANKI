import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Core() {
  const core = useRef<Mesh>(null);
  const orbit = useRef<Group>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.12;
      core.current.rotation.y += delta * 0.2;
    }
    if (orbit.current) {
      orbit.current.rotation.z -= delta * 0.08;
      orbit.current.rotation.y += delta * 0.05;
    }
    const pointerX = state.pointer.x * 0.25;
    const pointerY = state.pointer.y * 0.18;
    state.camera.position.x += (pointerX - state.camera.position.x) * 0.025;
    state.camera.position.y += (pointerY - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <Float speed={1.35} rotationIntensity={0.55} floatIntensity={0.55}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshStandardMaterial color="#9f70ff" emissive="#6f36d9" emissiveIntensity={1.8} roughness={0.16} metalness={0.62} wireframe />
        </mesh>
        <mesh scale={0.78}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshPhysicalMaterial color="#5b2ca0" emissive="#7f42e8" emissiveIntensity={0.7} transmission={0.45} opacity={0.85} transparent roughness={0.12} metalness={0.2} />
        </mesh>
      </Float>

      <group ref={orbit} rotation={[0.8, 0.15, 0.2]}>
        <mesh>
          <torusGeometry args={[2.15, 0.025, 10, 180]} />
          <meshBasicMaterial color="#d7c0ff" transparent opacity={0.65} />
        </mesh>
        <mesh position={[2.05, 0.42, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#ffbf70" emissive="#ff8d4c" emissiveIntensity={4} />
        </mesh>
      </group>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.1}>
        <mesh position={[-2.55, 1.55, -0.6]} rotation={[0.4, 0.2, 0.8]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#be96ff" emissive="#6b34b5" emissiveIntensity={1.2} wireframe />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={1.4} floatIntensity={0.9}>
        <mesh position={[2.55, -1.5, -0.8]} rotation={[0.5, 0.9, 0.1]}>
          <tetrahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#ffb36b" emissive="#c96038" emissiveIntensity={1.1} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.8], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 4, 4]} intensity={25} color="#cbb0ff" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#ff8c5f" />
      <Core />
      <Sparkles count={105} scale={[9, 7, 5]} size={2.2} speed={0.28} color="#decfff" opacity={0.72} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.25} autoRotate autoRotateSpeed={0.28} />
    </Canvas>
  );
}