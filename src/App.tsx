import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadUserFromToken } from './store/slices/authSlice';
import { ThemeContext, type Theme } from './contexts/themeContext';
import AuthForms from './components/Auth/AuthForms';
import TodosList from './components/Todos/TodosList';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal/Modal';
import Main from './pages/Main';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Works from './pages/Works';
import Testimonials from './pages/Testimonials';
import './App.css';
import './theme.css';

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Проверяем токен при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(loadUserFromToken());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Загрузка...
      </div>
    );
  }

  return (
    <CustomThemeProvider>
      <Layout onContactClick={openModal}>
        {!isAuthenticated ? (
          <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1>Добро пожаловать!</h1>
              <p>Пожалуйста, войдите в систему или зарегистрируйтесь</p>
              <button
                onClick={() => setShowAuth(!showAuth)}
                style={{
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                {showAuth ? 'Скрыть форму' : 'Войти / Регистрация'}
              </button>
            </div>
            {showAuth && <AuthForms onClose={() => setShowAuth(false)} />}
          </div>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <Main onContactClick={openModal} />
                  <div style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Ваши задачи
                      </h2>
                      <TodosList />
                    </div>
                  </div>
                </div>
              } 
            />
            <Route path="/works" element={<Works />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route 
              path="/todos" 
              element={
                <div style={{ padding: '2rem' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      Управление задачами
                    </h1>
                    <TodosList />
                  </div>
                </div>
              } 
            />
          </Routes>
        )}
      </Layout>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </CustomThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;