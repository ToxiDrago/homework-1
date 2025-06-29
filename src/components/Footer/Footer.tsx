import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const MENU = [
    { title: "На главную", to: "/" },
    { title: "Работы", to: "/works" },
    { title: "Отзывы", to: "/testimonials" },
    { title: "Блог", to: "/blog" },
  ];

  return (
    <footer className="footer">
      <nav className="menu">
        {MENU.map(({ title, to }, i) => (
          <Link key={`${i}-footer-menu-item`} to={to}>
            {title}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;