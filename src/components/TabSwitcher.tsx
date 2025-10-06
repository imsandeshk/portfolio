
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
    <div className="flex justify-center mb-8 sm:mb-10 px-3 sm:px-2">
      <motion.div 
        className={`
          ${isDark 
            ? 'backdrop-blur-xl bg-black/50 border-white/15' 
            : 'backdrop-blur-xl bg-light-dark/95 border-light-secondary/40 shadow-[0_10px_40px_rgba(0,0,0,0.3)]'
          }
          p-2 rounded-2xl border-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex overflow-x-auto scrollbar-none
          ${isMobile 
            ? 'w-full max-w-full gap-2' 
            : 'w-full max-w-md gap-1'
          }
        `}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{
          scale: isMobile ? 1 : 1.02,
          transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
        }}
        style={{
          boxShadow: isDark 
            ? '0 10px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset'
            : '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2) inset'
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex-1 min-w-[90px] sm:min-w-0 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl text-sm sm:text-sm font-semibold 
                transition-all flex items-center justify-center btn-3d
                ${isDark
                  ? (isActive ? 'text-white' : 'text-white/70 hover:text-white')
                  : (isActive ? 'text-white' : 'text-gray-300 hover:text-white')
                }
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: [0.19, 1, 0.22, 1]
              }}
              whileHover={{ 
                scale: isActive ? 1.02 : 1.05,
                y: -2,
                transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
              }}
              whileTap={{ 
                scale: 0.96,
                y: 1,
                transition: { duration: 0.1 }
              }}
            >
              {/* Background */}
              {isActive && (
                <motion.span
                  className={`absolute inset-0 rounded-xl ${
                    isDark 
                      ? 'bg-gradient-to-br from-white/15 to-white/5' 
                      : 'bg-gradient-to-br from-light-secondary to-light-tertiary'
                  }`}
                  layoutId="tabBackground"
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    duration: 0.4,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    boxShadow: isDark
                      ? '0 4px 20px rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset'
                      : '0 4px 20px rgba(126,105,171,0.4), 0 0 0 1px rgba(255,255,255,0.2) inset'
                  }}
                />
              )}
              
              {/* Glow effect for active tab */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,87,51,0.15))'
                      : 'linear-gradient(135deg, rgba(126,105,171,0.4), rgba(155,135,245,0.4))',
                    filter: 'blur(12px)'
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                />
              )}
              
              {/* Content */}
              <motion.span 
                className="relative flex items-center justify-center gap-1.5 z-10"
                animate={{ 
                  scale: isActive ? 1.08 : 1,
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
                      rotate: isActive ? [0, 6, -6, 0] : 0,
                      scale: isActive ? [1, 1.1, 1] : 1
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
                    fontWeight: isActive ? 700 : 600
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
