import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ProfileDepthAccent() {
  const root = useRef<THREE.Group>(null);
  const dots = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ x: ((i * 17) % 11 - 5) * 0.34, y: ((i * 13) % 9 - 4) * 0.32, z: ((i * 7) % 5 - 2) * 0.25 })), []);

  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y += delta * 0.06;
    root.current.rotation.x += (state.pointer.y * 0.1 - root.current.rotation.x) * 0.025;
    root.current.rotation.z += (state.pointer.x * 0.08 - root.current.rotation.z) * 0.025;
  });

  return <group ref={root}>
    <Float speed={1.2} floatIntensity={0.16} rotationIntensity={0.12}>
      <mesh rotation={[0.25, 0.4, 0.1]} position={[0.05, 0.1, 0]}>
        <boxGeometry args={[1.35, 1.7, 0.05]} />
        <meshBasicMaterial color="#70e1ff" wireframe transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[-0.2, -0.3, 0.16]} position={[0.35, -0.18, -0.18]}>
        <boxGeometry args={[0.92, 1.18, 0.04]} />
        <meshBasicMaterial color="#a98bff" wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
    {dots.map((dot, index) => <mesh key={index} position={[dot.x, dot.y, dot.z]}>
      <sphereGeometry args={[index % 4 === 0 ? 0.035 : 0.018, 8, 8]} />
      <meshBasicMaterial color={index % 4 === 0 ? '#70e1ff' : '#a98bff'} transparent opacity={0.7} />
    </mesh>)}
  </group>;
}

export default function HeroScene() {
  return <Canvas className="r3f-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 42 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.45} />
    <ProfileDepthAccent />
    <Sparkles count={24} scale={[3.5, 3.5, 2]} size={0.7} speed={0.12} color="#70e1ff" />
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </Canvas>;
}
