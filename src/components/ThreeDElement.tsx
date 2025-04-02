
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mesh } from "three";

const SpinningCube = () => {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color="#FF5722" 
        metalness={0.6}
        roughness={0.2}
        emissive="#FF5722"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const ThreeDElement: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="rounded-xl bg-black/20 backdrop-blur-sm"
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />
        <SpinningCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeDElement;
