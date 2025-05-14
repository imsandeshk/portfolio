
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";
import { LucideIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  infiniteScroll?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = "",
  iconSize = 24,
  showLabels = false,
  infiniteScroll = false
}) => {
  const { theme } = useTheme();
  
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

  // Get platform-specific colors
  const getPlatformColor = (platform: string): string => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes("facebook")) return "#1877F2";
    if (platformLower.includes("twitter") || platformLower.includes("x")) return "#1DA1F2";
    if (platformLower.includes("linkedin")) return "#0A66C2";
    if (platformLower.includes("github")) return theme === "dark" ? "#ffffff" : "#24292e";
    if (platformLower.includes("instagram")) return "#E4405F";
    if (platformLower.includes("youtube")) return "#FF0000";
    if (platformLower.includes("dribbble")) return "#EA4C89";
    if (platformLower.includes("behance")) return "#1769FF";
    if (platformLower.includes("medium")) return theme === "dark" ? "#ffffff" : "#000000";
    if (platformLower.includes("discord")) return "#5865F2";
    if (platformLower.includes("telegram")) return "#26A5E4";
    if (platformLower.includes("whatsapp")) return "#25D366";
    if (platformLower.includes("email") || platformLower.includes("mail")) return "#EA4335";
    
    return theme === "dark" ? "#ffffff" : "#333333"; // Default color
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

  // Duplicate links for infinite scroll effect
  const displayLinks = infiniteScroll ? [...links, ...links, ...links] : links;

  if (infiniteScroll) {
    return (
      <div className={`w-full overflow-hidden py-4 ${className}`}>
        <motion.div 
          className="flex"
          animate={{ 
            x: [0, -2000]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {displayLinks.map((link, index) => {
            const IconComponent = getPlatformIcon(link.platform);
            const platformColor = getPlatformColor(link.platform);
            
            // Calculate opacity for fade effect on first and last items
            const isFirstOrLast = index < 3 || index > displayLinks.length - 4;
            const opacity = isFirstOrLast ? 0.5 : 1;
            
            return (
              <motion.a
                key={`${link.id || link.platform}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-4 flex items-center justify-center"
                style={{ opacity }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${platformColor}30`,
                    boxShadow: `0 0 15px ${platformColor}40`
                  }}
                >
                  <IconComponent 
                    size={iconSize} 
                    color={platformColor} 
                    strokeWidth={1.5}
                    className={link.platform.toLowerCase().includes("github") ? "github-icon" : ""}
                  />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    );
  }

  // Regular social links display (non-scrolling)
  return (
    <motion.div 
      className={`flex flex-wrap items-center gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {links.map((link, index) => {
        const IconComponent = getPlatformIcon(link.platform);
        const platformColor = getPlatformColor(link.platform);
        
        return (
          <motion.a
            key={link.id || index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 flex items-center gap-2 
                      backdrop-blur-md p-2.5 rounded-full 
                      hover:shadow-[0_0_15px_rgba(255,87,51,0.5)] border 
                      ${theme === 'dark' ? 'bg-gradient-to-br from-black/60 to-black/40 border-white/10' : 
                      'bg-gradient-to-br from-white/70 to-white/50 border-black/10'}`}
            variants={item}
            whileHover="hover"
            initial="rest"
            title={link.platform}
            style={{ 
              borderColor: `${platformColor}30`,
              boxShadow: `0 0 10px ${platformColor}20`
            }}
          >
            <motion.div 
              variants={iconHover}
              style={{ color: platformColor }}
            >
              <IconComponent 
                size={iconSize} 
                className={link.platform.toLowerCase().includes("github") ? "github-icon" : ""}
              />
            </motion.div>
            {showLabels && (
              <span className={`text-sm hidden md:inline pr-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {link.platform}
              </span>
            )}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
