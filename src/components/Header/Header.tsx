import React from 'react';
import './Header.css';

interface HeaderProps {
  onContactClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  return (
    <header className="header">
      <div className="logo">Андрей Лысенко</div>
      <nav className="menu">
        <a href="#home">На главную</a>
        <a href="#works">Работы</a>
        <a href="#testimonials">Отзывы</a>
        <a href="#blog">Блог</a>
      </nav>
      <button className="button-contact" onClick={onContactClick}>
        Контакты
      </button>
    </header>
  );
};

export default Header;