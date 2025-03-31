
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { SocialLink } from "@/services/storageService";

interface FooterProps {
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SocialLinks links={socialLinks} className="mb-4" />
          </motion.div>
          
          <motion.p
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            © {currentYear} Sandesh K. All rights reserved.
          </motion.p>
          
          <motion.p
            className="text-xs text-muted-foreground mt-2 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by Sandesh
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
