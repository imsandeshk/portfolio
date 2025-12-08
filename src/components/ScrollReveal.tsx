import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
  delay?: number;
  duration?: number;
  blur?: boolean;
  parallax?: boolean;
  parallaxIntensity?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  blur = false,
  parallax = false,
  parallaxIntensity = 50
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect
  const y = useTransform(smoothProgress, [0, 1], [parallaxIntensity, -parallaxIntensity]);
  
  // Get initial and animate values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 80 };
      case "down": return { opacity: 0, y: -80 };
      case "left": return { opacity: 0, x: 80 };
      case "right": return { opacity: 0, x: -80 };
      case "scale": return { opacity: 0, scale: 0.8 };
      case "rotate": return { opacity: 0, rotate: -10, scale: 0.9 };
      default: return { opacity: 0, y: 80 };
    }
  };

  const getAnimateValues = () => {
    switch (direction) {
      case "up": return { opacity: 1, y: 0 };
      case "down": return { opacity: 1, y: 0 };
      case "left": return { opacity: 1, x: 0 };
      case "right": return { opacity: 1, x: 0 };
      case "scale": return { opacity: 1, scale: 1 };
      case "rotate": return { opacity: 1, rotate: 0, scale: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialValues()}
      whileInView={getAnimateValues()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={parallax ? { y } : undefined}
    >
      {blur ? (
        <motion.div
          initial={{ filter: "blur(10px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: duration + 0.2, delay }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;
