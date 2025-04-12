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
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const savedAnimations = localStorage.getItem('animationsEnabled');
    return savedAnimations ? JSON.parse(savedAnimations) : true;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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