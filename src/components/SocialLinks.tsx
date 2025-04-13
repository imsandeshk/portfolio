
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";
import { LucideIcon } from "lucide-react";

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
  // Helper function to get platform-specific icon
  const getPlatformIcon = (platform: string): LucideIcon => {
    // Map common social platforms to their icons
    const iconMapping: Record<string, keyof typeof Icons> = {
      facebook: "Facebook",
      twitter: "Twitter",
      x: "Twitter", // For "X" (formerly Twitter)
      linkedin: "Linkedin",
      github: "Github",
      instagram: "Instagram",
      youtube: "Youtube",
      dribbble: "Dribbble",
      behance: "Figma", // Using Figma as closest substitute
      medium: "FileText", // Using FileText as substitute
      discord: "MessageSquare",
      telegram: "Send",
      whatsapp: "Phone",
      email: "Mail"
    };

    // Convert platform to lowercase for case-insensitive matching
    const platformLower = platform.toLowerCase();
    
    // Find the corresponding icon or use a default
    const iconName = Object.keys(iconMapping).find(key => 
      platformLower.includes(key)
    );
    
    if (iconName) {
      return Icons[iconMapping[iconName]] as LucideIcon;
    }
    
    // If we have an explicit icon name specified
    if (platform && typeof platform === 'string' && platform in Icons) {
      const IconComponent = Icons[platform as keyof typeof Icons];
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
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
      className={`flex flex-wrap items-center gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {links.map((link, index) => {
        const IconComponent = getPlatformIcon(link.platform);
        
        return (
          <motion.a
            key={link.id || index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-300 flex items-center gap-2 
                      bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md p-2.5 rounded-full 
                      hover:shadow-[0_0_15px_rgba(255,87,51,0.5)] border border-white/10 hover:border-accent/40"
            variants={item}
            whileHover="hover"
            initial="rest"
            title={link.platform}
          >
            <motion.div 
              variants={iconHover}
              className="text-white group-hover:text-accent transition-colors duration-300"
            >
              <IconComponent size={iconSize} />
            </motion.div>
            {showLabels && (
              <span className="text-sm hidden md:inline pr-2">{link.platform}</span>
            )}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
