import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <nav className="menu">
        <a href="#home">На главную</a>
        <a href="#works">Работы</a>
        <a href="#testimonials">Отзывы</a>
        <a href="#blog">Блог</a>
      </nav>
    </footer>
  );
};

export default Footer;