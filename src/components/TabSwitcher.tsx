
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-6 py-3 rounded-xl text-sm font-medium transition-all
              ${isActive ? 'text-black' : 'text-white/80 hover:text-white'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background */}
            {isActive && (
              <motion.span
                className="absolute inset-0 bg-white rounded-xl"
                layoutId="tabBackground"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Content */}
            <span className="relative flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
