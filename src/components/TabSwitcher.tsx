
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
  layoutId?: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  layoutId = "activeTab"
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center mb-8 sm:mb-10 px-3 sm:px-2">
      <motion.div 
        className="relative p-1.5 rounded-[32px] flex w-full max-w-md gap-1 overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Tab container — frosted glass (reduced blur on mobile) */}
        <div className="absolute inset-0 rounded-[32px] border border-white/[0.07] bg-white/[0.03] backdrop-blur-md sm:backdrop-blur-2xl z-0" />
        
        <div className="relative z-[1] flex w-full gap-1 p-0.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex-1 px-3 sm:px-5 py-2.5 rounded-full
                  text-xs sm:text-sm font-medium
                  flex items-center justify-center gap-1.5
                  transition-colors duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-zinc-500 hover:text-zinc-300'
                  }
                `}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    layoutId={layoutId}
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{ willChange: 'transform' }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.8,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.1] to-white/[0.04]" />
                    <div className="absolute -inset-px rounded-full bg-gradient-to-b from-violet-500/15 to-transparent" />
                  </motion.div>
                )}
                {!isMobile && tab.icon && (
                  <span className={`${isActive ? 'text-violet-400' : ''} flex items-center flex-shrink-0 relative z-10 transition-colors duration-300`}>
                    {tab.icon}
                  </span>
                )}
                <span className="whitespace-nowrap overflow-hidden text-ellipsis relative z-10">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default TabSwitcher;
