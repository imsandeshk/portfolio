import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "glow" | "line";
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = memo(({ 
  variant = "gradient",
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, isMobile ? 0.4 : 0.6, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // All variants now use a minimal, elegant line with subtle glow
  return (
    <motion.div 
      ref={ref}
      className={`relative h-20 flex items-center justify-center ${className}`}
      style={{ opacity }}
    >
      <motion.div
        className="relative h-px w-full max-w-xs"
        style={{
          background: variant === 'glow' || variant === 'gradient'
            ? 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)',
          scaleX
        }}
      >
        {/* Subtle glow behind the line — skip on mobile for perf */}
        {!isMobile && (variant === 'glow' || variant === 'gradient') && (
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-violet-500/30 to-transparent scale-y-[6]" />
        )}
      </motion.div>
    </motion.div>
  );
});

SectionDivider.displayName = 'SectionDivider';

export default SectionDivider;
