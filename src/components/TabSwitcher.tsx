
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
                relative flex-1 min-w-[90px] sm:min-w-0 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl text-sm sm:text-sm font-semibold 
                transition-all flex items-center justify-center
                ${isDark
                  ? (isActive 
                      ? 'bg-gradient-to-br from-white/20 to-white/10 text-white shadow-[0_4px_20px_rgba(255,255,255,0.2)]' 
                      : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5')
                  : (isActive 
                      ? 'bg-gradient-to-br from-light-secondary to-light-tertiary text-white shadow-[0_4px_20px_rgba(126,105,171,0.4)]' 
                      : 'bg-transparent text-gray-300 hover:text-white hover:bg-light-secondary/20')
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
                scale: 1.03,
                y: -2,
                transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
              }}
              whileTap={{ 
                scale: 0.97,
                y: 0,
                transition: { duration: 0.1 }
              }}
              style={{
                transform: isActive ? 'translateZ(10px)' : 'translateZ(0)',
                boxShadow: isActive 
                  ? (isDark 
                      ? '0 8px 30px rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.15) inset' 
                      : '0 8px 30px rgba(126,105,171,0.5), 0 0 0 1px rgba(255,255,255,0.3) inset')
                  : 'none'
              }}
            >
              {/* Content */}
              <span className="relative flex items-center justify-center gap-1.5 z-10">
                {tab.icon && (
                  <span className={`${isActive ? 'text-accent' : ''} flex items-center`}>
                    {tab.icon}
                  </span>
                )}
                <span className="truncate">
                  {tab.label}
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TabSwitcher;
