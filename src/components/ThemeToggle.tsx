
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`flex items-center gap-2 ${
      theme === 'dark' 
        ? 'bg-background/30 backdrop-blur-md border border-white/10'
        : 'bg-white/40 backdrop-blur-md border border-black/10'
      } rounded-full p-2`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center"
      >
        <Switch 
          id="theme-toggle" 
          checked={theme === 'light'}
          onCheckedChange={toggleTheme}
          className={`data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary`}
        />
        <span className="sr-only">Toggle theme</span>
        
        <motion.div 
          className={`ml-2 ${theme === 'dark' ? 'text-white' : 'text-primary'}`}
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      </motion.div>
    </div>
  );
}
