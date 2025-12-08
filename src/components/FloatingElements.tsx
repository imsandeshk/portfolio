import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  const elements = [
    { 
      size: 300, 
      x: "10%", 
      y: "15%", 
      color: "rgba(255, 140, 66, 0.15)", 
      blur: 80,
      motionY: y1,
      rotate: rotate1
    },
    { 
      size: 400, 
      x: "80%", 
      y: "25%", 
      color: "rgba(74, 144, 226, 0.12)", 
      blur: 100,
      motionY: y2,
      rotate: rotate2
    },
    { 
      size: 250, 
      x: "70%", 
      y: "60%", 
      color: "rgba(16, 185, 129, 0.1)", 
      blur: 70,
      motionY: y1,
      rotate: rotate1
    },
    { 
      size: 350, 
      x: "20%", 
      y: "75%", 
      color: "rgba(255, 107, 157, 0.12)", 
      blur: 90,
      motionY: y2,
      rotate: rotate2
    },
    { 
      size: 200, 
      x: "50%", 
      y: "40%", 
      color: "rgba(155, 135, 245, 0.1)", 
      blur: 60,
      motionY: y1,
      rotate: rotate1
    }
  ];

  return (
    <div ref={ref} className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: `radial-gradient(circle, ${el.color} 0%, transparent 70%)`,
            filter: `blur(${el.blur}px)`,
            y: el.motionY,
            rotate: el.rotate,
            scale
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0]
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255, 140, 66, 0.05), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(74, 144, 226, 0.05), transparent),
            radial-gradient(ellipse 70% 50% at 50% 80%, rgba(16, 185, 129, 0.03), transparent)
          `
        }}
      />
    </div>
  );
};

export default FloatingElements;
