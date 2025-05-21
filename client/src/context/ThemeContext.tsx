import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference first if no saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const savedAnimations = localStorage.getItem('animationsEnabled');
    return savedAnimations ? JSON.parse(savedAnimations) : true;
  });

  // Update localStorage and apply theme
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const root = document.documentElement;
    
    // Add transition classes before changing theme
    root.classList.add('transition-colors', 'duration-200');
    
    if (darkMode) {
      root.classList.add('dark');
      // Update meta theme-color for mobile browsers
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1a1b1e');
    } else {
      root.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
    }
  }, [darkMode]);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
    if (animationsEnabled) {
      document.documentElement.classList.remove('reduce-motion');
    } else {
      document.documentElement.classList.add('reduce-motion');
    }
  }, [animationsEnabled]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  const toggleAnimations = () => {
    setAnimationsEnabled((prev: boolean) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, animationsEnabled, toggleAnimations }}>
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