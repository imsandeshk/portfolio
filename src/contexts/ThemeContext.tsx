
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use dark theme only
  const [theme] = useState<Theme>('dark');

  useEffect(() => {
    // Update the data-theme attribute on the document element
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    
    // Apply dark theme classes only
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.documentElement.classList.add('dark');
    
    // Store theme preference as dark
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // No-op since we only support dark theme
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
