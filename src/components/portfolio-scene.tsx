import { Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";

const palette = ["#f8a5d0", "#8fdcff", "#c9a2ff", "#ffc98a", "#f8a5d0"].map((c) => new THREE.Color(c));

function Orbs({ count }: { count: number }) {
  const refs = useRef<(Mesh | null)[]>([]);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({ x: ((i * 7.3) % 14) - 7, y: ((i * 3.7) % 8) - 4, z: -((i * 2.1) % 6), s: 0.05 + (i % 4) * 0.035, p: i * 1.3 })), [count]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => { const s = seeds[i]; if (!m || !s) return; m.position.set(s.x + Math.sin(t * 0.3 + s.p) * 0.6, s.y + Math.sin(t * 0.5 + s.p) * 0.5, s.z); });
  });
  return <>{seeds.map((s, i) => <mesh key={i} ref={(m) => { refs.current[i] = m; }} position={[s.x, s.y, s.z]}><sphereGeometry args={[s.s, 12, 12]} /><meshBasicMaterial transparent opacity={0.75} color="#f8c5d9" /></mesh>)}</>;
}

function CinematicWorld({ mobile }: { mobile: boolean }) {
  const world = useRef<Group>(null);
  const progress = useRef(0);
  const tint = useRef(new THREE.Color("#f8a5d0"));

  useEffect(() => {
    const update = () => { progress.current = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1); };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useFrame((state, delta) => {
    const p = progress.current * (palette.length - 1);
    const a = palette[Math.floor(p)] ?? palette[0]!, b = palette[Math.ceil(p)] ?? a;
    tint.current.lerp(a.clone().lerp(b, p % 1), 0.05);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.5, 2.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.28, 2.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 8 - progress.current * 2.5, 2, delta);
    state.camera.lookAt(0, 0, 0);
    if (world.current) {
      world.current.rotation.z = THREE.MathUtils.damp(world.current.rotation.z, state.pointer.x * 0.018, 2, delta);
      world.current.traverse((o) => { const m = (o as Mesh).material as MeshBasicMaterial | undefined; if (m && "color" in m && (o as Mesh).isMesh) m.color.copy(tint.current); });
    }
  });

  return (
    <group ref={world}>
      <fog attach="fog" args={["#08061c", 5, 18]} />
      <Orbs count={mobile ? 6 : 14} />
      <Sparkles count={mobile ? 50 : 145} scale={[16, 9, 10]} size={1.15} speed={0.12} color="#f8c5d9" opacity={0.48} />
      <Sparkles count={mobile ? 15 : 45} scale={[10, 5, 8]} position={[0, -1, 1]} size={2} speed={0.2} color="#8fdcff" opacity={0.32} />
    </group>
  );
}

export default function PortfolioScene() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 768); }, []);
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={mobile ? [1, 1] : [1, 1.35]} gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}>
      <CinematicWorld mobile={mobile} />
    </Canvas>
  );
}
