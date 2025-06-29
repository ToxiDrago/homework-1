import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Загружаем пост
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error('Пост не найден');
        }
        const postData = await postResponse.json();
        setPost(postData);
        
        // Загружаем автора
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setAuthor(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="loading">Загрузка статьи...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="error">
          {error || 'Статья не найдена'}
        </div>
        <Link to="/blog" className="back-link">
          ← Вернуться к блогу
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/blog" className="back-link">
            ← Вернуться к блогу
          </Link>
        </nav>
        
        <article className="blog-post">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            {author && (
              <div className="post-meta">
                <span className="author">Автор: {author.name}</span>
                <span className="separator">•</span>
                <span className="post-id">Статья #{post.id}</span>
              </div>
            )}
          </header>
          
          <div className="post-content">
            {post.body.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>{paragraph}</p>
              )
            ))}
          </div>
        </article>
        
        <div className="post-navigation">
          <Link to="/blog" className="nav-button">
            Все статьи
          </Link>
          {parseInt(id!) > 1 && (
            <Link 
              to={`/blog/${parseInt(id!) - 1}`} 
              className="nav-button"
            >
              ← Предыдущая
            </Link>
          )}
          <Link 
            to={`/blog/${parseInt(id!) + 1}`} 
            className="nav-button"
          >
            Следующая →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;