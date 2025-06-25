
import { useTheme } from "@/contexts/ThemeContext";

const SkipLink: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <a
      href="#main-content"
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-white text-black focus:bg-white focus:text-black'
          : 'bg-light-secondary text-white focus:bg-light-secondary focus:text-white'
      }`}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
