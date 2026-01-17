
import React, { useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
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
  
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxRow1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxRow2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
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
    const walk = (x - startX) * 0.8;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent, row: number) => {
    const isDragging = row === 1 ? isDragging1 : isDragging2;
    const scrollRef = row === 1 ? scrollRef1 : scrollRef2;
    const startX = row === 1 ? startX1 : startX2;
    const scrollLeft = row === 1 ? scrollLeft1 : scrollLeft2;
    
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 0.8;
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

  // First row of interests - Orange theme colors
  const baseInterestsRow1: Interest[] = [
    { id: "web-dev", name: "Web Development", icon: Code2, color: "#FF8C42" },
    { id: "software-dev", name: "Software Development", icon: Monitor, color: "#FF6B35" },
    { id: "data-viz", name: "Data Visualization", icon: BarChart, color: "#F7931E" },
    { id: "game-dev", name: "Game Development", icon: Gamepad, color: "#FF8C42" },
    { id: "ai", name: "Artificial Intelligence", icon: Brain, color: "#FF6B35" },
    { id: "ml", name: "Machine Learning", icon: Infinity, color: "#F7931E" },
    { id: "fullstack", name: "Full Stack", icon: Package, color: "#FF8C42" },
    { id: "beta-testing", name: "Beta Testing", icon: TestTube, color: "#FF6B35" },
  ];

  // Create array with 3 repetitions for seamless infinite scroll
  const interestsRow1: Interest[] = Array(3).fill(baseInterestsRow1).flat().map((interest, index) => ({
    ...interest,
    id: `${interest.id}-${index}`
  }));

  // Second row of interests - Orange theme colors
  const baseInterestsRow2: Interest[] = [
    { id: "databases", name: "Databases", icon: Database, color: "#FF8C42" },
    { id: "cybersecurity", name: "Cybersecurity", icon: Key, color: "#FF6B35" },
    { id: "cloud-computing", name: "Cloud Computing", icon: Package, color: "#F7931E" },
    { id: "mobile-dev", name: "Mobile Development", icon: Monitor, color: "#FF8C42" },
    { id: "devops", name: "DevOps", icon: TestTube, color: "#FF6B35" },
    { id: "ui-design", name: "UI/UX Design", icon: Code2, color: "#F7931E" },
    { id: "blockchain", name: "Blockchain", icon: Brain, color: "#FF8C42" },
    { id: "api-dev", name: "API Development", icon: Package, color: "#FF6B35" },
  ];

  // Create array with 3 repetitions for seamless infinite scroll
  const interestsRow2: Interest[] = Array(3).fill(baseInterestsRow2).flat().map((interest, index) => ({
    ...interest,
    id: `${interest.id}-${index}`
  }));

  return (
    <section ref={sectionRef} id="interests" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Interests" subtitle="What I'm passionate about" />
      </div>
      
      {/* Full-width container - no padding on mobile, with fade on desktop */}
      <div className="w-full space-y-2">
        {/* First row - scrolling left */}
        <div className="relative overflow-hidden">
          {/* Animated glow pulse fade effect - only on desktop */}
          <div className="hidden md:block absolute left-0 top-0 h-full w-48 z-10 pointer-events-none fade-glow-left" 
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)' }}
          />
          <div className="hidden md:block absolute right-0 top-0 h-full w-48 z-10 pointer-events-none fade-glow-right" 
            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)' }}
          />
          
          <motion.div 
            ref={scrollRef1}
            className={`py-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing ${!isDragging1 ? 'infinite-scroll-left' : ''}`}
            onMouseDown={(e) => handleMouseDown(e, 1)}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseUp={() => handleMouseUp(1)}
            onMouseLeave={() => handleMouseLeave(1)}
            onTouchStart={(e) => handleTouchStart(e, 1)}
            onTouchMove={(e) => handleTouchMove(e, 1)}
            onTouchEnd={() => handleMouseUp(1)}
            style={{ userSelect: 'none', scrollBehavior: 'auto', x: parallaxRow1 }}
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
          </motion.div>
        </div>

        {/* Second row - scrolling right */}
        <div className="relative overflow-hidden">
          {/* Animated glow pulse fade effect - only on desktop */}
          <div className="hidden md:block absolute left-0 top-0 h-full w-48 z-10 pointer-events-none fade-glow-left" 
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)' }}
          />
          <div className="hidden md:block absolute right-0 top-0 h-full w-48 z-10 pointer-events-none fade-glow-right" 
            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)' }}
          />
          
          <motion.div 
            ref={scrollRef2}
            className={`py-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing ${!isDragging2 ? 'infinite-scroll-right' : ''}`}
            onMouseDown={(e) => handleMouseDown(e, 2)}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseUp={() => handleMouseUp(2)}
            onMouseLeave={() => handleMouseLeave(2)}
            onTouchStart={(e) => handleTouchStart(e, 2)}
            onTouchMove={(e) => handleTouchMove(e, 2)}
            onTouchEnd={() => handleMouseUp(2)}
            style={{ userSelect: 'none', scrollBehavior: 'auto', x: parallaxRow2 }}
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
          </motion.div>
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
        
        /* Animated glow pulse effect for fade edges */
        .fade-glow-left {
          animation: glowPulseLeft 3s ease-in-out infinite;
        }
        .fade-glow-right {
          animation: glowPulseRight 3s ease-in-out infinite;
        }
        
        @keyframes glowPulseLeft {
          0%, 100% {
            box-shadow: inset -20px 0 40px rgba(255, 140, 66, 0.1);
          }
          50% {
            box-shadow: inset -30px 0 60px rgba(255, 140, 66, 0.2);
          }
        }
        
        @keyframes glowPulseRight {
          0%, 100% {
            box-shadow: inset 20px 0 40px rgba(255, 140, 66, 0.1);
          }
          50% {
            box-shadow: inset 30px 0 60px rgba(255, 140, 66, 0.2);
          }
        }
        
        @keyframes infiniteScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-90px * 24 - 8px * 24));
          }
        }
        @keyframes infiniteScrollRight {
          0% {
            transform: translateX(calc(-90px * 24 - 8px * 24));
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
              transform: translateX(calc(-180px * 24 - 16px * 24));
            }
          }
          @keyframes infiniteScrollRight {
            0% {
              transform: translateX(calc(-180px * 24 - 16px * 24));
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
