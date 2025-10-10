
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
          p-2 rounded-3xl flex overflow-x-auto scrollbar-none glass-card
          ${isMobile 
            ? 'w-full max-w-full gap-2' 
            : 'w-full max-w-md gap-1'
          }
        `}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        whileHover={{
          scale: isMobile ? 1 : 1.01,
          transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                tab-ios flex-1 min-w-[90px] sm:min-w-0 px-4 sm:px-5 py-3 sm:py-2.5 rounded-2xl text-sm font-semibold 
                flex items-center justify-center
                ${isActive 
                  ? 'active text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: [0.32, 0.72, 0, 1]
              }}
              whileHover={{ 
                scale: 1.03,
                y: -2,
                transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
              }}
              whileTap={{ 
                scale: 0.97,
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
