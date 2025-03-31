
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, className }) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link, index) => {
        const Icon = (Icons as any)[link.icon] || Icons.Link;
        
        return (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <Icon size={24} />
            <span className="sr-only">{link.platform}</span>
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
