
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { 
  Code2, 
  Monitor, 
  BarChart, 
  Brain, 
  Infinity, 
  Package, 
  TestTube,
  Gamepad,
  Database,
  Key,
  LucideIcon 
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Interest {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

const InterestsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // First row of interests
  const interestsRow1: Interest[] = [
    { id: "web-dev", name: "Web Development", icon: Code2, color: "#3498db" },
    { id: "software-dev", name: "Software Development", icon: Monitor, color: "#e74c3c" },
    { id: "data-viz", name: "Data Visualization", icon: BarChart, color: "#2ecc71" },
    { id: "game-dev", name: "Game Development", icon: Gamepad, color: "#9b59b6" },
    { id: "ai", name: "Artificial Intelligence", icon: Brain, color: "#f39c12" },
    { id: "ml", name: "Machine Learning", icon: Infinity, color: "#1abc9c" },
    { id: "fullstack", name: "Full Stack", icon: Package, color: "#e67e22" },
    { id: "beta-testing", name: "Beta Testing", icon: TestTube, color: "#3498db" },
    // Duplicate a few for continuous scrolling
    { id: "web-dev-2", name: "Web Development", icon: Code2, color: "#3498db" },
    { id: "software-dev-2", name: "Software Development", icon: Monitor, color: "#e74c3c" },
    { id: "data-viz-2", name: "Data Visualization", icon: BarChart, color: "#2ecc71" },
  ];

  // Second row of interests
  const interestsRow2: Interest[] = [
    { id: "databases", name: "Databases", icon: Database, color: "#3498db" },
    { id: "cybersecurity", name: "Cybersecurity", icon: Key, color: "#e74c3c" },
    { id: "cloud-computing", name: "Cloud Computing", icon: Package, color: "#2ecc71" },
    { id: "mobile-dev", name: "Mobile Development", icon: Monitor, color: "#9b59b6" },
    { id: "devops", name: "DevOps", icon: TestTube, color: "#f39c12" },
    { id: "ui-design", name: "UI/UX Design", icon: Code2, color: "#1abc9c" },
    { id: "blockchain", name: "Blockchain", icon: Brain, color: "#e67e22" },
    { id: "api-dev", name: "API Development", icon: Package, color: "#3498db" },
    // Duplicate a few for continuous scrolling
    { id: "databases-2", name: "Databases", icon: Database, color: "#3498db" },
    { id: "cybersecurity-2", name: "Cybersecurity", icon: Key, color: "#e74c3c" },
    { id: "cloud-computing-2", name: "Cloud Computing", icon: Package, color: "#2ecc71" },
  ];

  return (
    <section id="interests" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Interests" subtitle="What I'm passionate about" />
        
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          {/* First row - scrolling left */}
          <div className="relative overflow-hidden">
            {/* Blur/fade effect at the edges */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="auto-scroll-left py-2">
              <div className="flex gap-1 md:gap-4">
                {interestsRow1.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(20,20,20,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: interest.color }}>
                        <interest.icon size={16} />
                      </span>
                    </div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Second row - scrolling right */}
          <div className="relative overflow-hidden">
            {/* Blur/fade effect at the edges */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="auto-scroll-right py-2">
              <div className="flex gap-1 md:gap-4">
                {interestsRow2.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(20,20,20,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: interest.color }}>
                        <interest.icon size={16} />
                      </span>
                    </div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .auto-scroll-left {
          overflow: hidden;
        }
        .auto-scroll-left > div {
          animation: scrollLeft 20s linear infinite;
        }
        .auto-scroll-right {
          overflow: hidden;
        }
        .auto-scroll-right > div {
          animation: scrollRight 20s linear infinite;
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (min-width: 768px) {
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
          }
          @keyframes scrollRight {
            0% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default InterestsSection;
