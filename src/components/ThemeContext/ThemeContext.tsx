import React, { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemeContextType } from '../../contexts/themeContext';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Попытка получить тему из localStorage при инициализации
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme') as Theme;
      return savedTheme || defaultTheme;
    }
    return defaultTheme;
  });

  // Сохранение темы в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', theme);
    }
  }, [theme]);

  // Применение класса темы к body элементу
  useEffect(() => {
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${theme}`);
    
    return () => {
      body.className = body.className.replace(/theme-\w+/g, '');
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-wrapper theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};