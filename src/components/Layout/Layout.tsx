import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  onContactClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onContactClick }) => {
  return (
    <div className="layout">
      <Header onContactClick={onContactClick} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;