
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
          p-1.5 rounded-3xl flex scrollbar-none
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
          ${isMobile 
            ? 'w-full max-w-full gap-1.5 overflow-x-auto' 
            : 'w-full max-w-lg gap-2'
          }
        `}
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(0,0,0,0.3)'
        }}
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
                relative flex-1 min-w-[100px] sm:min-w-[120px] px-5 sm:px-6 py-3 rounded-2xl
                text-sm font-semibold whitespace-nowrap
                flex items-center justify-center gap-2
                transition-all duration-300
                ${isActive 
                  ? 'text-white shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]' 
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }
              `}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: [0.32, 0.72, 0, 1]
              }}
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
              }}
            >
              {tab.icon && (
                <span className={`${isActive ? 'text-accent' : ''} flex items-center flex-shrink-0`}>
                  {tab.icon}
                </span>
              )}
              <span className="truncate">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TabSwitcher;
