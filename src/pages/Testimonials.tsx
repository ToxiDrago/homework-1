import React from 'react';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Анна Петрова",
      position: "CEO, TechStart",
      text: "Андрей создал для нас потрясающий сайт! Профессиональный подход, внимание к деталям и отличный результат. Рекомендую!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      position: "Маркетинг-директор, Digital Agency",
      text: "Работа выполнена на высшем уровне. Сайт получился современным, быстрым и удобным. Спасибо за качественную работу!",
      avatar: "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNlb3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 3,
      name: "Елена Козлова",
      position: "Основатель, Beauty Studio",
      text: "Андрей понял наши потребности с первого раза. Результат превзошел ожидания! Клиенты отмечают удобство сайта.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VvfGVufDB8fDB8fHww"
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      position: "CTO, FinTech Solutions",
      text: "Отличный специалист! Сложный проект был выполнен в срок и с высоким качеством. Обязательно будем сотрудничать еще.",
      avatar: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VvfGVufDB8fDB8fHww"
    }
  ];

  return (
    <div className="testimonials-container">
      <div className="container">
        <h1 className="testimonials-title">Отзывы клиентов</h1>
        <p className="testimonials-description">
          Что говорят обо мне мои клиенты
        </p>
        
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
                  <p className="author-position">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;