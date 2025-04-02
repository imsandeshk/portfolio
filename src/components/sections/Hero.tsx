
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
  onEditSocial
}) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Content */}
        <motion.div className="w-full md:w-1/2 text-center md:text-left" 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} 
            className="text-5xl md:text-6xl mb-6 text-gradient font-extrabold text-left lg:text-7xl"
          >
            {profile.name}
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-accent/90" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {profile.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {profile.bio}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center">
              <SocialLinks links={socialLinks} iconSize={20} className="mt-1" />
              {isAdmin && onEditSocial && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="ml-2" 
                  onClick={onEditSocial}
                >
                  <Edit size={16} />
                </Button>
              )}
            </div>
            
            <Button 
              onClick={handleContactClick} 
              size="lg" 
              className="mt-2 sm:mt-0 text-white bg-blue-800 hover:bg-blue-700 rounded-xl text-base"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full md:w-1/2 relative mb-8 md:mb-0" 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative max-w-md mx-auto">
            <div className="aspect-square rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_35px_rgba(255,255,255,0.15)] hover-glow">
              <img 
                src={profile.profileImage || "/public/lovable-uploads/6f0800b3-624d-42cd-9762-3cbe10931da5.png"} 
                alt={profile.name} 
                className="w-full h-full profile-image object-cover" 
              />
            </div>
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
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
