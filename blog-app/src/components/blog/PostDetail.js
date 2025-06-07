import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const PostDetail = ({ blogService }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Use useCallback to prevent recreation of fetchPost on every render
  const fetchPost = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const fetchedPost = await blogService.getPostById(parseInt(id));
      setPost(fetchedPost);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post. It may have been removed or is unavailable.');
    } finally {
      setLoading(false);
    }
  }, [id, blogService]);
  
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  
  if (loading) {
    return <div className="loading">Loading post...</div>;
  }
  
  if (error || !post) {
    return (
      <div className="post-detail-container">
        <div className="error-message">{error}</div>
        <Link to="/" className="back-link">Back to Blog</Link>
      </div>
    );
  }
  
  return (
    <div className="post-detail-container">
      <Link to="/" className="back-link">Back to Blog</Link>
      
      <article className="post-content">
        <header>
          <h1>{post.title}</h1>
          
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            
            {post.categories && post.categories.length > 0 && (
              <div className="post-categories">
                {post.categories.map(category => (
                  <Link 
                    key={category} 
                    to={`/?category=${encodeURIComponent(category)}`}
                    className="category-badge post-detail-category"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div 
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/?tag=${encodeURIComponent(tag)}`}
                className="tag-badge post-detail-tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default React.memo(PostDetail);