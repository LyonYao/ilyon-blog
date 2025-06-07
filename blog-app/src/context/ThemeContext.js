import React, { createContext, useState, useEffect } from 'react';

// Create a context for theme management
export const ThemeContext = createContext();

// Theme options
export const THEMES = {
  DARK_RANGER: 'darkRanger', // Current theme
  FROZEN_THRONE: 'frozenThrone' // New theme based on blue character
};

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use default
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('blog-theme');
    return savedTheme || THEMES.DARK_RANGER;
  });

  // Update theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blog-theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Toggle between themes
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => 
      prevTheme === THEMES.DARK_RANGER ? THEMES.FROZEN_THRONE : THEMES.DARK_RANGER
    );
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;