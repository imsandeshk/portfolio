
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      <h2 className="text-3xl text-gradient mb-3 font-bold md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
