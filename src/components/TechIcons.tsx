
import { useRef } from "react";
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
    { name: "HTML", color: "#E34F26", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "CSS", color: "#1572B6", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "JavaScript", color: "#F7DF1E", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "React", color: "#61DAFB", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "TypeScript", color: "#3178C6", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Node.js", color: "#339933", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Python", color: "#3776AB", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Java", color: "#f0931c", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "C", color: "#4285f4", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "MongoDB", color: "#13aa52", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "UI/UX Design", color: "#ff7262", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "AWS", color: "#ff9900", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
  ];

  return (
    <div className="w-full overflow-hidden py-6" ref={containerRef}>
      <div className="flex flex-wrap gap-4 justify-center">
        {techIcons.map((icon, index) => (
          <motion.div
            key={`${icon.name}-${index}`}
            className="flex items-center justify-center mx-4 relative group"
            whileHover={{ 
              y: -5, 
              scale: 1.1,
              boxShadow: "0 0 15px rgba(255,255,255,0.5)",
            }}
            transition={{ 
              duration: 0.3,
              boxShadow: { duration: 0.2 } 
            }}
          >
            <motion.div 
              className="w-28 sm:w-32 h-12 sm:h-14 flex items-center justify-center rounded-full bg-black/40 border border-white/10 backdrop-blur-md px-4"
              whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={icon.icon} 
                alt={icon.name}
                className="w-6 h-6 mr-2 object-contain"
              />
              <span className="text-sm font-medium">{icon.name}</span>

              {/* Shine effect overlay */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden z-10 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["calc(-100% - 50px)", "calc(100% + 50px)"]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechIcons;
