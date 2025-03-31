
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProfileInfo, SocialLink } from "@/services/storageService";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { ArrowDown, Edit } from "lucide-react";

interface HeroProps {
  profile: ProfileInfo;
  socialLinks: SocialLink[];
  isAdmin?: boolean;
  onEditProfile?: () => void;
  onEditSocial?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  profile,
  socialLinks,
  isAdmin = false,
  onEditProfile,
  onEditSocial,
}) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative px-6">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-full border-2 border-white/10 shadow-xl">
            <img
              src={profile.profileImage || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover profile-image"
            />
            {isAdmin && onEditProfile && (
              <Button
                size="icon"
                className="absolute bottom-4 right-4 rounded-full opacity-80 hover:opacity-100"
                onClick={onEditProfile}
              >
                <Edit size={16} />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {profile.name}
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-medium mb-4 text-accent/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {profile.title}
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {profile.bio}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <SocialLinks links={socialLinks} />
              {isAdmin && onEditSocial && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -right-10 top-0"
                  onClick={onEditSocial}
                >
                  <Edit size={16} />
                </Button>
              )}
            </div>
            
            <Button 
              onClick={handleContactClick}
              className="mt-2 sm:mt-0"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
