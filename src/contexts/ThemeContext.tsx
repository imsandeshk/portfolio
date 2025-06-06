
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if user has previously set a theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Otherwise use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Update the data-theme attribute on the document element
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Apply appropriate background for each mode with improved transitions
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      document.documentElement.style.setProperty('background-color', '#000000');
      document.body.style.backgroundColor = '#000000';
      document.documentElement.style.setProperty('--background', '0 0% 0%');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      
      // Set background color directly on both html and body for mobile consistency
      document.documentElement.style.setProperty('background-color', '#FAF1E6');
      document.body.style.backgroundColor = '#FAF1E6';
      document.documentElement.style.setProperty('--light-bg-color', '#FAF1E6');
      document.documentElement.style.setProperty('--background', '36 54% 95%');
    }
    
    // Apply smooth transition for theme change
    document.body.style.transition = 'background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
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
