
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div 
      ref={ref}
      className={cn("flex flex-col items-center text-center mb-14 px-4", className)} 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent line above title */}
      <motion.div 
        className="w-8 h-0.5 mb-6 rounded-full"
        style={{ background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      
      <h2 
        className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 50%, #A1A1AA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {title}
      </h2>
      
      {subtitle && (
        <motion.p 
          className="text-zinc-500 max-w-md text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
