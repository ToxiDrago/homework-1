import React from 'react';
import './Works.css';

const Works: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce платформа",
      description: "Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью",
      technologies: ["React", "Node.js"],
      image: "https://images.unsplash.com/photo-1678690832311-bb6e361989ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHdlYiUyMHNpdGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      title: "Корпоративный сайт",
      description: "Современный корпоративный сайт с адаптивным дизайном и CMS",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1704652838434-b4653b19542f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHdlYiUyMHNpdGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      title: "Мобильное приложение",
      description: "React Native приложение для iOS и Android с push-уведомлениями",
      technologies: ["React Native", "Redux"],
      image: "https://images.unsplash.com/photo-1736605804642-b66ad75b1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHdlYiUyMHNpdGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 4,
      title: "Dashboard для аналитики",
      description: "Интерактивная панель с графиками и отчетами в реальном времени",
      technologies: ["React"],
      image: "https://images.unsplash.com/photo-1649696541574-9e74c5cf34b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHdlYiUyMHNpdGV8ZW58MHx8MHx8fDA%3D"
    }
  ];

  return (
    <div className="works-container">
      <div className="container">
        <h1 className="works-title">Мои работы</h1>
        <p className="works-description">
          Здесь представлены некоторые из моих проектов, которые демонстрируют 
          мои навыки в веб-разработке
        </p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;