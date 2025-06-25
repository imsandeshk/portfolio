
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  isAdmin = false,
  onEdit
}) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <motion.div 
      ref={ref}
      className={cn("flex flex-col items-center text-center mb-10 px-4", className)} 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{
        once: true,
        margin: "-50px"
      }}
    >
      <motion.h2 
        variants={childVariants}
        className={`font-playfair text-3xl mb-3 font-bold md:text-5xl ${
          theme === 'dark' 
            ? 'text-gradient' 
            : 'text-[#2D3748]' // Dark gray for excellent readability in light mode
        }`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          variants={childVariants}
          className={`${
            theme === 'dark' 
              ? 'text-muted-foreground' 
              : 'text-[#4A5568]' // Medium gray for better readability in light mode
          } max-w-2xl font-medium text-lg`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
