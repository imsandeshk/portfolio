
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TechIcon {
  name: string;
  color: string;
  icon: string;
}

const TechIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const techIcons: TechIcon[] = [
    { name: "HTML", color: "#E34F26", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "CSS", color: "#1572B6", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "JavaScript", color: "#F7DF1E", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "React", color: "#61DAFB", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "TypeScript", color: "#3178C6", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Node.js", color: "#339933", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Python", color: "#3776AB", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Vue", color: "#4FC08D", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Angular", color: "#DD0031", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Swift", color: "#FA7343", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
    { name: "Flutter", color: "#02569B", icon: "/lovable-uploads/35e9edd1-2261-4d5e-9d8e-7db49585a904.png" },
  ];

  // Duplicate icons for smoother infinite scroll
  const allIcons = [...techIcons, ...techIcons];

  return (
    <div className="w-full overflow-hidden py-4" ref={containerRef}>
      <motion.div 
        className="flex"
        animate={{ 
          x: [0, isMobile ? -1500 : -2500]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}
      >
        {allIcons.map((icon, index) => (
          <motion.div
            key={`${icon.name}-${index}`}
            className="flex items-center justify-center mx-4 relative"
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{
              opacity: index === 0 || index === allIcons.length - 1 ? 0.5 : 1
            }}
          >
            <div 
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${icon.color}20` }}
            >
              <img 
                src={icon.icon} 
                alt={icon.name}
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechIcons;
