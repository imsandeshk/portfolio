import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface TabSwitcherProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}
const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="w-full flex justify-center mb-8 rounded-xl">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-md">
        <TabsList className="grid grid-cols-3 w-full rounded-xl">
          {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="font-normal rounded-xl">
              {tab.label}
            </TabsTrigger>)}
        </TabsList>
      </Tabs>
    </motion.div>;
};
export default TabSwitcher;