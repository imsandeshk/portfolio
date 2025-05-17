
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

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
  
  return (
    <motion.div 
      className={cn("flex flex-col items-center text-center mb-10 px-4", className)} 
      initial={{
        opacity: 0,
        y: 20
      }} 
      whileInView={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.5
      }} 
      viewport={{
        once: true
      }}
    >
      <h2 className={`font-playfair text-3xl mb-3 font-bold md:text-5xl ${
        theme === 'dark' 
          ? 'text-gradient' 
          : 'text-black'
      }`}>
        {title}
      </h2>
      {subtitle && <p className={`${
        theme === 'dark' 
          ? 'text-muted-foreground' 
          : 'text-light-dark'
      } max-w-2xl font-light`}>
        {subtitle}
      </p>}
    </motion.div>
  );
};

export default SectionHeading;
