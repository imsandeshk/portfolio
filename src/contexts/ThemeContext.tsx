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
    
    // Apply animated gradient background for light mode
    // Regular dark background for dark mode
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      
      // Add animated gradient background effect for light mode
      const animateGradient = () => {
        const colors = [
          'rgba(18,18,18,1)',
          'rgba(24,24,24,1)',
          'rgba(20,20,20,1)',
          'rgba(16,16,16,1)'
        ];
        
        let currentIndex = 0;
        const gradientInterval = setInterval(() => {
          if (document.body.classList.contains('light-mode')) {
            document.documentElement.style.setProperty(
              '--background', 
              colors[currentIndex]
            );
            currentIndex = (currentIndex + 1) % colors.length;
          } else {
            clearInterval(gradientInterval);
          }
        }, 3000);
        
        return () => clearInterval(gradientInterval);
      };
      
      const cleanup = animateGradient();
      return cleanup;
    }
    
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
