// src/pages/Testimonials.tsx
import React from 'react';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  avatar: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Анна Петрова",
      position: "CEO",
      company: "TechStart",
      text: "Андрей создал для нас потрясающий сайт! Профессиональный подход, внимание к деталям и отличный результат. Рекомендую!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      position: "Маркетинг-директор",
      company: "Digital Agency",
      text: "Работа выполнена на высшем уровне. Сайт получился современным, быстрым и удобным. Спасибо за качественную работу!",
      avatar: "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNlb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 3,
      name: "Елена Козлова",
      position: "CEO",
      company: "Beauty Studio",
      text: "Андрей понял наши потребности с первого раза. Результат превзошел ожидания! Клиенты отмечают удобство сайта.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VvfGVufDB8fDB8fHww"
    }
  ];

  return (
    <div className="testimonials-page">
      <div className="testimonials-hero">
        <div className="container">
          <h1 className="page-title">Отзывы клиентов</h1>
        </div>
      </div>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-position">
                      {testimonial.position} в {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10</div>
              <div className="stat-label">Проектов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Год опыта</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Поддержка</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;