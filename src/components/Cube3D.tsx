
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

interface Cube3DProps {
  size?: number;
  position?: "left" | "right" | "center";
  className?: string;
}

const Cube3D: React.FC<Cube3DProps> = ({ 
  size = 100, 
  position = "center",
  className = ""
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const actualSize = isMobile ? size * 0.8 : size;
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(actualSize, actualSize);
    renderer.setClearColor(0x000000, 0);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Geometry and materials
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // Create materials with different colors for each face
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff5733, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0x33ff57, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0x3357ff, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0xff33ff, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0xffff33, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0x33ffff, transparent: true, opacity: 0.7 }),
    ];
    
    // Create cube with materials
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Add wireframe
    const wireframeGeometry = new THREE.BoxGeometry(3.1, 3.1, 3.1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      wireframe.rotation.x = cube.rotation.x;
      wireframe.rotation.y = cube.rotation.y;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.remove(cube);
      scene.remove(wireframe);
      geometry.dispose();
      materials.forEach(material => material.dispose());
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, [actualSize]);
  
  let positionClass = "mx-auto"; // center by default
  if (position === "left") positionClass = "ml-0 mr-auto";
  if (position === "right") positionClass = "ml-auto mr-0";
  
  return (
    <div 
      ref={mountRef} 
      className={`${positionClass} ${className}`}
      style={{ width: actualSize, height: actualSize }}
    />
  );
};

export default Cube3D;
