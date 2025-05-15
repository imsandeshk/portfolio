
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
      <div className={`
        ${isDark 
          ? 'backdrop-blur-md bg-black/30 border-white/10' 
          : 'backdrop-blur-md bg-gray-300/80 border-gray-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)]'
        }
        p-1.5 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex overflow-hidden
        ${isMobile 
          ? 'w-full max-w-[95vw] sm:max-w-[90vw]' 
          : 'w-full max-w-md'
        }
      `}>
        {tabs.map((tab) => {
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
                  : (isActive ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800')
                }
              `}
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background */}
              {isActive && (
                <motion.span
                  className={`absolute inset-0 rounded-lg ${
                    isDark ? 'bg-white/10' : 'bg-gray-200/90'
                  }`}
                  layoutId="tabBackground"
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    duration: 0.3
                  }}
                />
              )}
              
              {/* Content */}
              <motion.span 
                className="relative flex items-center justify-center gap-1 z-10"
                animate={{ 
                  scale: isActive ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.icon && (
                  <span className={`${isActive ? 'text-accent' : ''} flex items-center`}>
                    {tab.icon}
                  </span>
                )}
                <span className="truncate">
                  {tab.label}
                </span>
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitcher;
