import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

interface HeaderProps {
  onContactClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const MENU = [
    { title: "На главную", to: "/" },
    { title: "Работы", to: "/works" },
    { title: "Отзывы", to: "/testimonials" },
    { title: "Блог", to: "/blog" },
  ];

  if (isMobile) {
    return (
      <header className="header mobile">
        <div className="logo">Андрей Лысенко</div>
        <BurgerMenu onContactClick={onContactClick} />
      </header>
    );
  }

  return (
    <header className="header">
      <div className="logo">Андрей Лысенко</div>
      <nav className="menu">
        {MENU.map(({ title, to }, i) => (
          <Link key={`${i}-menu-item`} to={to}>
            {title}
          </Link>
        ))}
      </nav>
      <button className="button-contact" onClick={onContactClick}>
        Контакты
      </button>
    </header>
  );
};

export default Header;