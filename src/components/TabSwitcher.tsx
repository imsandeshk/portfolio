
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <div className="flex justify-center mb-10 px-2 sm:px-0">
      <motion.div 
        className={`
          ${isDark 
            ? 'backdrop-blur-md bg-black/40 border-white/10' 
            : 'backdrop-blur-md bg-light-dark/90 border-light-secondary/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          }
          p-1.5 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex overflow-hidden
          ${isMobile 
            ? 'w-full max-w-[95vw] sm:max-w-[90vw]' 
            : 'w-full max-w-md'
          }
        `}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex-1 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium 
                transition-all flex items-center justify-center
                ${isDark
                  ? (isActive ? 'text-white' : 'text-white/70 hover:text-white')
                  : (isActive ? 'text-white' : 'text-gray-300 hover:text-white')
                }
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
              whileHover={{ 
                scale: isActive ? 1.02 : 1.05,
                transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Background */}
              {isActive && (
                <motion.span
                  className={`absolute inset-0 rounded-lg ${
                    isDark ? 'bg-white/10' : 'bg-light-secondary'
                  }`}
                  layoutId="tabBackground"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.4,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                />
              )}
              
              {/* Glow effect for active tab */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,87,51,0.1))'
                      : 'linear-gradient(45deg, rgba(126,105,171,0.3), rgba(155,135,245,0.3))',
                    filter: 'blur(8px)'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                />
              )}
              
              {/* Content */}
              <motion.span 
                className="relative flex items-center justify-center gap-1 z-10"
                animate={{ 
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -1 : 0
                }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                {tab.icon && (
                  <motion.span 
                    className={`${isActive ? 'text-accent' : ''} flex items-center`}
                    animate={{
                      rotate: isActive ? [0, 5, -5, 0] : 0
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                  >
                    {tab.icon}
                  </motion.span>
                )}
                <motion.span 
                  className="truncate"
                  animate={{
                    fontWeight: isActive ? 600 : 500
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  {tab.label}
                </motion.span>
              </motion.span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TabSwitcher;
