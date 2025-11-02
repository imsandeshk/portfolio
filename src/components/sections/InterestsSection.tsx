
import React, { useRef, useState, useEffect } from "react";
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
  
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const [startX1, setStartX1] = useState(0);
  const [startX2, setStartX2] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);

  const handleMouseDown = (e: React.MouseEvent, row: number) => {
    const scrollRef = row === 1 ? scrollRef1 : scrollRef2;
    const setIsDragging = row === 1 ? setIsDragging1 : setIsDragging2;
    const setStartX = row === 1 ? setStartX1 : setStartX2;
    const setScrollLeft = row === 1 ? setScrollLeft1 : setScrollLeft2;
    
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent, row: number) => {
    const scrollRef = row === 1 ? scrollRef1 : scrollRef2;
    const setIsDragging = row === 1 ? setIsDragging1 : setIsDragging2;
    const setStartX = row === 1 ? setStartX1 : setStartX2;
    const setScrollLeft = row === 1 ? setScrollLeft1 : setScrollLeft2;
    
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent, row: number) => {
    const isDragging = row === 1 ? isDragging1 : isDragging2;
    const scrollRef = row === 1 ? scrollRef1 : scrollRef2;
    const startX = row === 1 ? startX1 : startX2;
    const scrollLeft = row === 1 ? scrollLeft1 : scrollLeft2;
    
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent, row: number) => {
    const isDragging = row === 1 ? isDragging1 : isDragging2;
    const scrollRef = row === 1 ? scrollRef1 : scrollRef2;
    const startX = row === 1 ? startX1 : startX2;
    const scrollLeft = row === 1 ? scrollLeft1 : scrollLeft2;
    
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (row: number) => {
    const setIsDragging = row === 1 ? setIsDragging1 : setIsDragging2;
    setIsDragging(false);
  };

  const handleMouseLeave = (row: number) => {
    const setIsDragging = row === 1 ? setIsDragging1 : setIsDragging2;
    setIsDragging(false);
  };

  // First row of interests
  const interestsRow1: Interest[] = [
    { id: "web-dev", name: "Web Development", icon: Code2, color: "#9b87f5" },
    { id: "software-dev", name: "Software Development", icon: Monitor, color: "#7E69AB" },
    { id: "data-viz", name: "Data Visualization", icon: BarChart, color: "#6E59A5" },
    { id: "game-dev", name: "Game Development", icon: Gamepad, color: "#9b87f5" },
    { id: "ai", name: "Artificial Intelligence", icon: Brain, color: "#7E69AB" },
    { id: "ml", name: "Machine Learning", icon: Infinity, color: "#6E59A5" },
    { id: "fullstack", name: "Full Stack", icon: Package, color: "#9b87f5" },
    { id: "beta-testing", name: "Beta Testing", icon: TestTube, color: "#7E69AB" },
    // Duplicate interests for seamless scrolling
    { id: "web-dev-2", name: "Web Development", icon: Code2, color: "#9b87f5" },
    { id: "software-dev-2", name: "Software Development", icon: Monitor, color: "#7E69AB" },
    { id: "data-viz-2", name: "Data Visualization", icon: BarChart, color: "#6E59A5" },
    { id: "game-dev-2", name: "Game Development", icon: Gamepad, color: "#9b87f5" },
    { id: "ai-2", name: "Artificial Intelligence", icon: Brain, color: "#7E69AB" },
    { id: "ml-2", name: "Machine Learning", icon: Infinity, color: "#6E59A5" },
    { id: "fullstack-2", name: "Full Stack", icon: Package, color: "#9b87f5" },
    { id: "beta-testing-2", name: "Beta Testing", icon: TestTube, color: "#7E69AB" },
  ];

  // Second row of interests
  const interestsRow2: Interest[] = [
    { id: "databases", name: "Databases", icon: Database, color: "#9b87f5" },
    { id: "cybersecurity", name: "Cybersecurity", icon: Key, color: "#7E69AB" },
    { id: "cloud-computing", name: "Cloud Computing", icon: Package, color: "#6E59A5" },
    { id: "mobile-dev", name: "Mobile Development", icon: Monitor, color: "#9b87f5" },
    { id: "devops", name: "DevOps", icon: TestTube, color: "#7E69AB" },
    { id: "ui-design", name: "UI/UX Design", icon: Code2, color: "#6E59A5" },
    { id: "blockchain", name: "Blockchain", icon: Brain, color: "#9b87f5" },
    { id: "api-dev", name: "API Development", icon: Package, color: "#7E69AB" },
    // Duplicate interests for seamless scrolling
    { id: "databases-2", name: "Databases", icon: Database, color: "#9b87f5" },
    { id: "cybersecurity-2", name: "Cybersecurity", icon: Key, color: "#7E69AB" },
    { id: "cloud-computing-2", name: "Cloud Computing", icon: Package, color: "#6E59A5" },
    { id: "mobile-dev-2", name: "Mobile Development", icon: Monitor, color: "#9b87f5" },
    { id: "devops-2", name: "DevOps", icon: TestTube, color: "#7E69AB" },
    { id: "ui-design-2", name: "UI/UX Design", icon: Code2, color: "#6E59A5" },
    { id: "blockchain-2", name: "Blockchain", icon: Brain, color: "#9b87f5" },
    { id: "api-dev-2", name: "API Development", icon: Package, color: "#7E69AB" },
  ];

  return (
    <section id="interests" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Interests" subtitle="What I'm passionate about" />
        
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          {/* First row - scrolling left */}
          <div className="relative overflow-hidden">
            {/* Blur/fade effect at the edges */}
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
            
            <div 
              ref={scrollRef1}
              className={`py-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing ${!isDragging1 ? 'infinite-scroll-left' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 1)}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseUp={() => handleMouseUp(1)}
              onMouseLeave={() => handleMouseLeave(1)}
              onTouchStart={(e) => handleTouchStart(e, 1)}
              onTouchMove={(e) => handleTouchMove(e, 1)}
              onTouchEnd={() => handleMouseUp(1)}
              style={{ userSelect: 'none' }}
            >
              <div className="flex gap-1 md:gap-4">
                {interestsRow1.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="badge-3d flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ 
                      scale: 1.05, 
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                      } 
                    }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(26,31,44,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(126,105,171,0.3)'
                    }}
                  >
                    <motion.div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full relative z-10" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: isDark ? interest.color : '#fff' }}>
                        <interest.icon size={16} />
                      </span>
                    </motion.div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white relative z-10">
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
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
            
            <div 
              ref={scrollRef2}
              className={`py-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing ${!isDragging2 ? 'infinite-scroll-right' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 2)}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseUp={() => handleMouseUp(2)}
              onMouseLeave={() => handleMouseLeave(2)}
              onTouchStart={(e) => handleTouchStart(e, 2)}
              onTouchMove={(e) => handleTouchMove(e, 2)}
              onTouchEnd={() => handleMouseUp(2)}
              style={{ userSelect: 'none' }}
            >
              <div className="flex gap-1 md:gap-4">
                {interestsRow2.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="badge-3d flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ 
                      scale: 1.05, 
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                      } 
                    }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(26,31,44,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(126,105,171,0.3)'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full relative z-10" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: isDark ? interest.color : '#fff' }}>
                        <interest.icon size={16} />
                      </span>
                    </div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white relative z-10">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .infinite-scroll-left > div {
          animation: infiniteScrollLeft 40s linear infinite;
          width: fit-content;
        }
        .infinite-scroll-right > div {
          animation: infiniteScrollRight 40s linear infinite;
          width: fit-content;
        }
        
        @keyframes infiniteScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
        }
        @keyframes infiniteScrollRight {
          0% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @media (min-width: 768px) {
          @keyframes infiniteScrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
          }
          @keyframes infiniteScrollRight {
            0% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
        `}
      </style>
    </section>
  );
};

export default InterestsSection;
