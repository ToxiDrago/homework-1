import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadUserFromToken, logout } from './store/slices/authSlice';
import { ThemeContext, type Theme } from './contexts/themeContext';
import AuthForms from './components/Auth/AuthForms';
import TodosList from './components/Todos/TodosList';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal/Modal';
import Main from './pages/Main';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Works from './pages/Works';
import Testimonials from './pages/Testimonials';
import './App.css';
import './theme.css';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider defaultTheme="light">
      <Layout onContactClick={openModal}>
        <Routes>
          <Route 
            path="/" 
            element={<Main onContactClick={openModal} />} 
          />
          <Route path="/works" element={<Works />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </Layout>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </ThemeProvider>
  );
};

export default App;