
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

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link, index) => {
        const IconComponent = getIconByName(link.icon);
        
        return (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            title={link.platform}
          >
            <IconComponent size={iconSize} />
            {showLabels && <span className="text-sm">{link.platform}</span>}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
