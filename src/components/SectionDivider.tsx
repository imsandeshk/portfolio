import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "glow" | "line";
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = "gradient",
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 20]);

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative h-32 overflow-hidden ${className}`}>
        <motion.svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full"
          style={{ opacity }}
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
                "M0,50 C360,0 1080,100 1440,50 L1440,100 L0,100 Z",
                "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 140, 66, 0.3)" />
              <stop offset="50%" stopColor="rgba(74, 144, 226, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <motion.div 
        ref={ref} 
        className={`relative h-24 flex items-center justify-center ${className}`}
        style={{ opacity }}
      >
        <motion.div
          className="w-full max-w-4xl h-1 rounded-full relative"
          style={{ scaleX }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(255, 140, 66, 0.8), rgba(74, 144, 226, 0.8), rgba(16, 185, 129, 0.8))"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: "linear-gradient(90deg, rgba(255, 140, 66, 0.6), rgba(74, 144, 226, 0.6), rgba(16, 185, 129, 0.6))"
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (variant === "line") {
    return (
      <motion.div 
        ref={ref}
        className={`relative h-16 flex items-center justify-center overflow-hidden ${className}`}
        style={{ opacity }}
      >
        <motion.div
          className="h-px w-full max-w-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            scaleX
          }}
        />
      </motion.div>
    );
  }

  // Default gradient variant
  return (
    <motion.div 
      ref={ref}
      className={`relative h-40 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255, 140, 66, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 30% 50%, rgba(74, 144, 226, 0.1) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 70% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)
          `,
          filter: `blur(${blur}px)`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default SectionDivider;
