
import SocialLinks from "./SocialLinks";
import { SocialLink } from "@/services/storageService";

interface FooterProps {
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20">
      {/* Top border gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8">
          <SocialLinks links={socialLinks} iconSize={18} />

          <a
            href="/resume"
            className="group inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-all duration-500 border border-white/[0.07] hover:border-white/[0.15] bg-white/[0.03] backdrop-blur-2xl"
          >
            View Resume
          </a>
          
          <p className="text-xs text-zinc-600">
            © {currentYear} Sandesh K
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
