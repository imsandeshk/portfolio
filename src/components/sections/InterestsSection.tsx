
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { 
  Database, 
  Code, 
  BarChart, 
  BrainCircuit, 
  Infinity, 
  Computer, 
  TestTube,
  LucideIcon 
} from "lucide-react";

interface Interest {
  id: string;
  name: string;
  icon: LucideIcon; // Changed from React.ReactNode to LucideIcon
  color: string;
}

const InterestsSection: React.FC = () => {
  const interests: Interest[] = [
    { id: "web-dev", name: "Web Development", icon: Code, color: "#3498db" },
    { id: "software-dev", name: "Software Development", icon: Computer, color: "#e74c3c" },
    { id: "data-viz", name: "Data Visualization", icon: BarChart, color: "#2ecc71" },
    { id: "game-dev", name: "Game Development", icon: Code, color: "#9b59b6" },
    { id: "ai", name: "Artificial Intelligence", icon: BrainCircuit, color: "#f39c12" },
    { id: "ml", name: "Machine Learning", icon: Infinity, color: "#1abc9c" },
    { id: "fullstack", name: "Full Stack", icon: Database, color: "#e67e22" },
    { id: "beta-testing", name: "Beta Testing", icon: TestTube, color: "#3498db" },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const interestVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.08,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="interests" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Interests" subtitle="What I'm passionate about" />

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto px-2 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {interests.map((interest) => (
            <motion.div
              key={interest.id}
              variants={interestVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-lg bg-black/40 border border-white/10 backdrop-blur-md p-3 flex items-center gap-3"
            >
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full" 
                style={{ backgroundColor: `${interest.color}30` }}
              >
                <span style={{ color: interest.color }}>
                  {interest.icon && <interest.icon size={18} />}
                </span>
              </div>
              <span className="text-sm sm:text-base font-medium truncate">{interest.name}</span>
              
              {/* Continuous flash animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InterestsSection;
