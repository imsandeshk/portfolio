import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
  glowColor?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  intensity = 0.3,
  glowColor = "rgba(255, 140, 66, 0.5)"
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "font-semibold transition-colors",
        className
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      {/* Gradient border */}
      <span 
        className="absolute inset-0 rounded-full p-[2px]"
        style={{
          background: "linear-gradient(135deg, rgba(255, 140, 66, 0.8), rgba(74, 144, 226, 0.8), rgba(16, 185, 129, 0.8))"
        }}
      >
        <span className="block h-full w-full rounded-full bg-black/80 backdrop-blur-xl" />
      </span>
      
      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          rotate: [0, 180]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)"
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 px-8 py-3">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton;
