
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = "",
  iconSize = 24,
  showLabels = false 
}) => {
  const isMobile = useIsMobile();
  const actualIconSize = isMobile ? Math.min(iconSize, 20) : iconSize;

  // Helper function to get icon component by name
  const getIconByName = (iconName: string): LucideIcon => {
    // Check if the icon exists in the Icons object
    if (iconName && typeof iconName === 'string' && iconName in Icons) {
      // Only access valid icon components, not helper functions or other properties
      const IconComponent = Icons[iconName as keyof typeof Icons];
      // Check if it's a valid icon component (not a function like createIcon)
      if (typeof IconComponent === 'function' && 'displayName' in IconComponent) {
        return IconComponent as LucideIcon;
      }
    }
    // Fallback to Link icon
    return Icons.Link;
  };

  // Animation variants for the container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Animation variants for each item
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Hover animation for each icon
  const iconHover = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 5, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <motion.div 
      className={`flex flex-wrap items-center justify-center md:justify-start gap-3 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {links.map((link, index) => {
        const IconComponent = getIconByName(link.icon);
        
        return (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,87,51,0.5)] transform-gpu"
            variants={item}
            whileHover="hover"
            initial="rest"
            title={link.platform}
          >
            <motion.div 
              className="flex items-center justify-center"
              variants={iconHover}
            >
              <IconComponent size={actualIconSize} strokeWidth={1.5} />
            </motion.div>
            {showLabels && (
              <span className="text-sm hidden md:inline">{link.platform}</span>
            )}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
