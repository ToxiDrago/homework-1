import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal/Modal';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Layout>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-rectangle"></span>
            <div className="hero-text">
              <h1 className="hero-title">Меня зовут Андрей,</h1>
              <h1 className="hero-title">я веб разработчик</h1>
            </div>
            <p className="hero-description">
              Я создаю высокопроизводительные, красивые веб-сайты, которые 
              ориентированы на конверсию, соответствуют бренду и удобны для людей.
            </p>
            <button className="cta-button" onClick={openModal}>
              Связаться со мной
            </button>
          </div>
          <div className="hero-image">
            <img 
              src="/path-to-your-photo.jpg" 
              alt="Андрей Лысенко"
              className="profile-photo"
            />
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2>О себе</h2>
            <p>
              Веб-разработчик с опытом создания современных, 
              адаптивных и высокопроизводительных веб-приложений.
            </p>
          </div>
        </section>

        <section className="skills-section">
          <div className="container">
            <h2>Навыки</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3>Frontend</h3>
                <p>React, JavaScript, HTML5, CSS3, TypeScript</p>
              </div>
              <div className="skill-card">
                <h3>Backend</h3>
                <p>Node.js, Python</p>
              </div>
              <div className="skill-card">
                <h3>Инструменты</h3>
                <p>Git, Webpack, Vite</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default App;