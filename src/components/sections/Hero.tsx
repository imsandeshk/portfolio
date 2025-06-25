
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProfileInfo, SocialLink } from "@/services/storageService";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { ArrowDown, ExternalLink, Briefcase } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";

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
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const nameVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Content */}
        <motion.div 
          className="w-full md:w-1/2 text-center md:text-left z-10" 
          variants={containerVariants}
          initial="hidden" 
          animate="visible" 
        >
          <motion.div variants={nameVariants} className="mb-6 overflow-hidden relative">
            <motion.h1 
              className={`font-playfair text-5xl md:text-6xl lg:text-7xl font-extrabold ${
                theme === 'dark' ? 'text-gradient' : 'text-light-dark'
              } leading-tight`}
            >
              {profile.name}
            </motion.h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h2 className={`font-playfair ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-medium mb-6 ${
              theme === 'dark' ? 'text-accent/90' : 'text-light-secondary'
            }`}>
              {profile.title}
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={`flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-black/30 backdrop-blur-md border border-green-500/20' 
                    : 'bg-light-dark backdrop-blur-md border border-green-500/20 shadow-sm'
                } rounded-full px-4 py-1.5`}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-500 text-sm font-medium">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} ${
              theme === 'dark' ? 'text-muted-foreground' : 'text-light-dark/80'
            } mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed`}>
              {profile.bio}
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start"
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
                  <ExternalLink size={16} />
                </Button>
              )}
            </div>
            
            <Button 
              onClick={handleContactClick} 
              size="lg" 
              className={`mt-2 sm:mt-0 text-base font-semibold transition-all duration-300 rounded-xl ${
                theme === 'dark'
                  ? 'text-black bg-white hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                  : 'bg-light-secondary text-white hover:bg-light-tertiary shadow-md'
              }`}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full md:w-1/2 relative mb-8 md:mb-0 z-10" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative max-w-md mx-auto">
            <motion.div 
              className={`aspect-square rounded-full overflow-hidden border-2 ${
                theme === 'dark' ? 'border-white/10' : 'border-light-secondary/30'
              }`}
              initial={{ boxShadow: "0 0 0 rgba(255,255,255,0)" }}
              animate={{ 
                boxShadow: theme === 'dark' 
                  ? "0 0 40px rgba(255,255,255,0.2)" 
                  : "0 0 40px rgba(126,105,171,0.3)" 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <img 
                src="/lovable-uploads/6f0800b3-624d-42cd-9762-3cbe10931da5.png"
                alt="Profile Picture"
                className="w-full h-full profile-image object-cover"
              />
            </motion.div>
            {isAdmin && onEditProfile && (
              <Button 
                size="icon" 
                className="absolute bottom-4 right-4 rounded-full opacity-80 hover:opacity-100" 
                onClick={onEditProfile}
              >
                <ExternalLink size={16} />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${
          theme === 'dark' ? 'text-white/50' : 'text-light-secondary'
        }`}
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ 
          duration: 0.5, 
          delay: 1.5, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>

      {/* Glow effects */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 filter blur-[80px] -z-0 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 filter blur-[100px] -z-0 animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}
    </section>
  );
};

export default Hero;
