import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal/Modal';
import Main from './pages/Main';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Works from './pages/Works';
import Testimonials from './pages/Testimonials';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
    </>
  );
};

export default App;