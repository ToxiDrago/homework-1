import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Ошибка загрузки постов');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading">Загрузка статей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="error">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="container">
        <h1 className="blog-title">Блог</h1>
        <p className="blog-description">
          Здесь я делюсь своими знаниями и опытом в веб-разработке
        </p>
        
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <h2 className="post-title">
                <Link to={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="post-excerpt">
                {post.body.length > 150 
                  ? `${post.body.substring(0, 150)}...` 
                  : post.body
                }
              </p>
              <Link to={`/blog/${post.id}`} className="read-more">
                Читать далее →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;