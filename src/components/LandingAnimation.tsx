
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface LandingAnimationProps {
  onAnimationComplete: () => void;
}

const LandingAnimation: React.FC<LandingAnimationProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const animationStartTimeRef = useRef<number>(0);
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"forming" | "glowing" | "dispersing" | "complete">("forming");

  useEffect(() => {
    // Animation timing management
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;

    // Setup timing sequence
    const setupTimers = () => {
      timeout1 = setTimeout(() => {
        setAnimationPhase("glowing");
      }, 1500);

      timeout2 = setTimeout(() => {
        setAnimationPhase("dispersing");
      }, 3500);

      timeout3 = setTimeout(() => {
        setAnimationPhase("complete");
        onAnimationComplete();
      }, 6500);
    };

    setupTimers();

    // Initialize scene only once
    initScene();

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [onAnimationComplete]);

  const initScene = () => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - use perspective for 3D effect
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Text to particles conversion
    createTextParticles("Sandesh K");

    // Start animation loop
    animationStartTimeRef.current = Date.now();
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  const createTextParticles = (text: string) => {
    if (!sceneRef.current) return;

    // Create a canvas to draw text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    // Responsive sizing
    const isMobile = window.innerWidth < 768;
    
    // Canvas size and text setup
    canvas.width = isMobile ? 512 : 1024;
    canvas.height = isMobile ? 256 : 512;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = `bold ${isMobile ? '60px' : '110px'} "Playfair Display", serif`;
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Get pixel data from canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Create particles from white pixels
    const particles = [];
    const particleCount = isMobile ? 7000 : 12000; // Decrease for mobile
    const particleSize = isMobile ? 3 : 4;
    
    const bufferSize = particleCount * 3; // 3 values per particle (x, y, z)
    particlePositionsRef.current = new Float32Array(bufferSize);
    originalPositionsRef.current = new Float32Array(bufferSize);

    // Sample pixels from the text
    let particleIndex = 0;
    const stride = isMobile ? 4 : 3; // Skip more pixels on mobile for performance
    
    for (let y = 0; y < canvas.height && particleIndex < particleCount; y += stride) {
      for (let x = 0; x < canvas.width && particleIndex < particleCount; x += stride) {
        const index = (y * canvas.width + x) * 4; // RGBA, so 4 values per pixel
        
        // If pixel is not black (text)
        if (data[index] > 10) {
          // Calculate normalized position
          const xPos = ((x / canvas.width) - 0.5) * (canvas.width / 300);
          const yPos = (-(y / canvas.height) + 0.5) * (canvas.height / 300);
          
          const i = particleIndex * 3;
          particlePositionsRef.current[i] = xPos * 15; // Scale for visibility
          particlePositionsRef.current[i + 1] = yPos * 15;
          particlePositionsRef.current[i + 2] = (Math.random() - 0.5) * 0.5; // Small z variance
          
          // Store original positions for animation
          originalPositionsRef.current[i] = particlePositionsRef.current[i];
          originalPositionsRef.current[i + 1] = particlePositionsRef.current[i + 1];
          originalPositionsRef.current[i + 2] = particlePositionsRef.current[i + 2];
          
          particleIndex++;
          
          // Add points with some initial offset for formation animation
          particles.push(
            (Math.random() - 0.5) * 40, // Start with random positions 
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
          );
        }
      }
    }

    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(particles);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    // Create particle material
    const material = new THREE.PointsMaterial({
      size: particleSize * 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    // Create particle system
    const particleSystem = new THREE.Points(geometry, material);
    particlesRef.current = particleSystem;
    sceneRef.current.add(particleSystem);
  };

  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !particlesRef.current || !particlePositionsRef.current || !originalPositionsRef.current) return;

    const elapsedTime = (Date.now() - animationStartTimeRef.current) / 1000; // in seconds
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    // Animation based on current phase
    const particleCount = positions.length / 3;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (animationPhase === "forming") {
        // Move particles from random positions to form the text
        positions[i3] += (originalPositionsRef.current[i3] - positions[i3]) * 0.08;
        positions[i3 + 1] += (originalPositionsRef.current[i3 + 1] - positions[i3 + 1]) * 0.08;
        positions[i3 + 2] += (originalPositionsRef.current[i3 + 2] - positions[i3 + 2]) * 0.08;
      } 
      else if (animationPhase === "glowing") {
        // Add subtle lightning pulse effect
        const pulseStrength = Math.sin(elapsedTime * 5 + i * 0.1) * 0.05;
        positions[i3] = originalPositionsRef.current[i3] + pulseStrength;
        positions[i3 + 1] = originalPositionsRef.current[i3 + 1] + pulseStrength;

        // Lightning effect - random particles jump outward briefly
        if (Math.random() < 0.01) {
          positions[i3] += (Math.random() - 0.5) * 0.5;
          positions[i3 + 1] += (Math.random() - 0.5) * 0.5;
        }
      } 
      else if (animationPhase === "dispersing") {
        // Outward explosion with physics
        const dx = positions[i3] - 0;
        const dy = positions[i3 + 1] - 0;
        const dz = positions[i3 + 2] - 0;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
        
        // Normalize and apply force
        const forceMagnitude = 0.2 * (1 + Math.sin(i * 0.1)); // Vary force for natural look
        const fx = (dx / dist) * forceMagnitude;
        const fy = (dy / dist) * forceMagnitude;
        const fz = (dz / dist) * forceMagnitude;
        
        // Apply velocity
        positions[i3] += fx;
        positions[i3 + 1] += fy;
        positions[i3 + 2] += fz;
        
        // Fade out by reducing particle size
        const material = particlesRef.current.material as THREE.PointsMaterial;
        material.size *= 0.995;
        material.opacity *= 0.995;
      }
    }

    // Update the geometry
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Render the scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Continue animation loop
    frameIdRef.current = requestAnimationFrame(animate);
  };

  return (
    <AnimatePresence>
      {animationPhase !== "complete" && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: animationPhase === "dispersing" ? [1, 0.8] : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
};

export default LandingAnimation;
