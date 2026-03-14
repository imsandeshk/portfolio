
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Image from "@/components/ui/image";
import { ProfileInfo, SocialLink } from "@/services/storageService";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
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
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const fadeUp = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-4 sm:px-6 overflow-hidden py-12 sm:py-0">
      {/* Hero ambient mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Circular Profile Picture */}
          <motion.div variants={fadeUp} className="mb-8">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.04, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            >
              {/* Outer ring glow */}
              <div className="absolute -inset-3 rounded-full opacity-50">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/40 via-transparent to-cyan-500/30 animate-spin-slow" style={{ animationDuration: '12s' }} />
              </div>
              {/* Subtle pulse ring */}
              <div className="absolute -inset-4 rounded-full border border-violet-500/10 animate-pulse" style={{ animationDuration: '3s' }} />
              
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-2 ring-white/[0.1] shadow-2xl shadow-violet-500/10">
                <Image
                  src="/lovable-uploads/6f0800b3-624d-42cd-9762-3cbe10931da5.png"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fallbackSrc="/placeholder.svg"
                  decoding="async"
                />
              </div>
              {/* Soft glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-[60px] -z-10 scale-[2.5]" />
              {isAdmin && onEditProfile && (
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 rounded-full opacity-80 hover:opacity-100 w-8 h-8"
                  onClick={onEditProfile}
                >
                  <FileText size={14} />
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={fadeUp} className="mb-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium border border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-400/90 tracking-wide uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Available for work
            </span>
          </motion.div>

          {/* Name — large, bold, clean */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1] tracking-[-0.04em] mb-5"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {profile.name}
          </motion.h1>

          {/* Title — refined accent gradient */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-6 tracking-[-0.01em]"
            style={{
              background: 'linear-gradient(135deg, #C4B5FD 0%, #818CF8 40%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {profile.title}
          </motion.h2>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="hidden sm:block text-sm sm:text-[15px] text-zinc-500 max-w-lg leading-[1.8] mb-10"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="hidden sm:flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              to="/resume"
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500 to-indigo-500" />
              <FileText className="w-4 h-4 relative z-10" />
              <span className="relative z-10">View Resume</span>
            </Link>
            <button
              onClick={handleContactClick}
              className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-all duration-500 hover:-translate-y-0.5 overflow-hidden border border-white/[0.07] bg-white/[0.03] backdrop-blur-2xl hover:border-white/[0.2]"
            >
              <span className="relative z-10">Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <SocialLinks links={socialLinks} iconSize={isMobile ? 17 : 19} />
            {isAdmin && onEditSocial && (
              <Button size="icon" variant="ghost" className="ml-1" onClick={onEditSocial}>
                <FileText size={14} />
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/[0.1] flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
