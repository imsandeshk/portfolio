import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -40 : -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 40 : 120]);

  // Fewer, smaller, less blurry elements on mobile
  const elements = isMobile
    ? [
        { size: 200, x: "10%", y: "15%", color: "rgba(139, 92, 246, 0.03)", blur: 60, motionY: y1 },
        { size: 180, x: "75%", y: "60%", color: "rgba(99, 102, 241, 0.02)", blur: 50, motionY: y2 },
      ]
    : [
        { size: 400, x: "8%", y: "12%", color: "rgba(139, 92, 246, 0.04)", blur: 120, motionY: y1 },
        { size: 350, x: "82%", y: "30%", color: "rgba(99, 102, 241, 0.03)", blur: 130, motionY: y2 },
        { size: 300, x: "55%", y: "70%", color: "rgba(139, 92, 246, 0.03)", blur: 110, motionY: y1 },
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
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
