import React, { useContext } from 'react';
import { ThemeContext, THEMES } from '../../context/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-btn"
        title={currentTheme === THEMES.DARK_RANGER ? 'Switch to Frozen Throne Theme' : 'Switch to Dark Ranger Theme'}
      >
        {currentTheme === THEMES.DARK_RANGER ? '❄️' : '🔮'}
        <span className="theme-name">
          {currentTheme === THEMES.DARK_RANGER ? 'Frozen Throne' : 'Dark Ranger'}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;