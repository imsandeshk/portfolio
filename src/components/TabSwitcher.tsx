
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <div className="flex justify-center mb-10 px-2 sm:px-0">
      <div className="backdrop-blur-md bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex w-full max-w-md">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center
                ${isActive ? 'text-black' : 'text-white/80 hover:text-white'}
              `}
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-br from-white to-white/80 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
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
                className="relative flex items-center justify-center gap-2 z-10"
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
                <span className={isMobile ? (tab.id === "certificates" ? "text-xs" : "") : ""}>
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
