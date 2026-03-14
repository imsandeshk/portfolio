import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Reduce animation complexity on mobile
  const mobileDuration = Math.min(duration, 0.5);
  const effectiveDuration = isMobile ? mobileDuration : duration;
  const effectiveDelay = isMobile ? Math.min(delay, 0.05) : delay;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 200 : 100,
    damping: isMobile ? 40 : 30,
    restDelta: 0.001
  });

  // Parallax effect — reduced on mobile
  const effectiveParallax = isMobile ? Math.min(parallaxIntensity, 20) : parallaxIntensity;
  const y = useTransform(smoothProgress, [0, 1], [effectiveParallax, -effectiveParallax]);
  
  // Get initial and animate values based on direction — smaller offsets on mobile
  const offset = isMobile ? 20 : 40;
  const getInitialValues = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: offset };
      case "down": return { opacity: 0, y: -offset };
      case "left": return { opacity: 0, x: offset };
      case "right": return { opacity: 0, x: -offset };
      case "scale": return { opacity: 0, scale: 0.97 };
      case "rotate": return { opacity: 0, rotate: -3, scale: 0.97 };
      default: return { opacity: 0, y: offset };
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
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      transition={{
        duration: effectiveDuration,
        delay: effectiveDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={parallax ? { y } : undefined}
    >
      {blur && !isMobile ? (
        <motion.div
          initial={{ filter: "blur(10px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: effectiveDuration + 0.2, delay: effectiveDelay }}
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
