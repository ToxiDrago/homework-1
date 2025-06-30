import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, registerUser, clearError } from '../../store/slices/authSlice';
import './AuthForms.css';

interface AuthFormsProps {
  onClose: () => void;
}

type FormMode = 'login' | 'register';

const AuthForms: React.FC<AuthFormsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  
  const [mode, setMode] = useState<FormMode>('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  React.useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      const result = await dispatch(loginUser({
        username: formData.username,
        password: formData.password,
      }));
      
      if (loginUser.fulfilled.match(result)) {
        onClose();
      }
    } else {
      const result = await dispatch(registerUser({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }));
      
      if (registerUser.fulfilled.match(result)) {
        onClose();
      }
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    });
  };

  return (
    <div className="auth-forms">
      <div className="auth-header">
        <h2>{mode === 'login' ? 'Вход в систему' : 'Регистрация'}</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>
        
        {mode === 'register' && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="firstName">Имя</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Фамилия</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </>
        )}
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="auth-switch">
        <p>
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button 
            type="button" 
            className="switch-btn" 
            onClick={switchMode}
            disabled={loading}
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForms;