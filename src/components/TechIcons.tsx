
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
    { name: "HTML", color: "#E34F26", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "CSS", color: "#1572B6", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "JavaScript", color: "#F7DF1E", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "React", color: "#61DAFB", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "TypeScript", color: "#3178C6", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Node.js", color: "#339933", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Python", color: "#3776AB", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Vue", color: "#4FC08D", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Angular", color: "#DD0031", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Swift", color: "#FA7343", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
    { name: "Flutter", color: "#02569B", icon: "/lovable-uploads/54fc75ff-fd01-4c8c-88d9-14a4baef30aa.png" },
  ];

  // Add more tech icons for smoother infinite scroll
  const allIcons = [...techIcons, ...techIcons, ...techIcons];

  return (
    <div className="w-full overflow-hidden py-6" ref={containerRef}>
      <motion.div 
        className="flex"
        animate={{ 
          x: [0, isMobile ? -3000 : -4000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear"
          }
        }}
      >
        {allIcons.map((icon, index) => {
          // Calculate opacity for fade effect on first and last items
          const isFirstOrLast = index < 3 || index > allIcons.length - 4;
          const opacity = isFirstOrLast ? 0.5 : 1;
          
          return (
            <motion.div
              key={`${icon.name}-${index}`}
              className="flex items-center justify-center mx-4 relative"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              style={{ opacity }}
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
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechIcons;
