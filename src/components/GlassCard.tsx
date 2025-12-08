import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowColor?: string;
  intensity?: "subtle" | "medium" | "strong";
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hover3D = true,
  glowColor = "rgba(255, 140, 66, 0.3)",
  intensity = "medium",
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hover3D) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const getIntensityStyles = () => {
    switch (intensity) {
      case "subtle":
        return {
          bg: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          blur: "12px"
        };
      case "strong":
        return {
          bg: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.25)",
          blur: "24px"
        };
      default:
        return {
          bg: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.15)",
          blur: "16px"
        };
    }
  };

  const styles = getIntensityStyles();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: styles.bg,
        backdropFilter: `blur(${styles.blur})`,
        WebkitBackdropFilter: `blur(${styles.blur})`,
        border: `1px solid ${styles.border}`,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={{
        rotateX: hover3D ? mousePosition.y * -10 : 0,
        rotateY: hover3D ? mousePosition.x * 10 : 0,
        scale: isHovering ? 1.02 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{
        boxShadow: `
          0 25px 50px rgba(0, 0, 0, 0.5),
          0 0 100px ${glowColor},
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `
      }}
    >
      {/* Spotlight effect following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{
          background: isHovering
            ? `radial-gradient(600px circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255, 255, 255, 0.08), transparent 50%)`
            : "none"
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Top shine line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
