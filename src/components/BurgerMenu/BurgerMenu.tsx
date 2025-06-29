import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

interface BurgerMenuProps {
  onContactClick?: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const MENU = [
    { title: "На главную", to: "/" },
    { title: "Работы", to: "/works" },
    { title: "Отзывы", to: "/testimonials" },
    { title: "Блог", to: "/blog" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    }
    setIsOpen(false);
  };

  return (
    <div className="burger-menu">
      <button 
        className={`burger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`burger-nav ${isOpen ? 'open' : ''}`}>
        <ul className="burger-menu-list">
          {MENU.map(({ title, to }, i) => (
            <li key={`${i}-burger-menu-item`}>
              <Link to={to} onClick={handleLinkClick}>
                {title}
              </Link>
            </li>
          ))}
          <li>
            <button 
              className="burger-contact-btn" 
              onClick={handleContactClick}
            >
              Контакты
            </button>
          </li>
        </ul>
      </nav>
      
      {isOpen && <div className="burger-overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default BurgerMenu;