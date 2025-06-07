import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Blog.css';

const Dashboard = ({ blogService, authService }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await blogService.getAllPosts();
      setPosts(result.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      
      // If unauthorized, redirect to login
      if (err.response && err.response.status === 401) {
        authService.logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [blogService, authService, navigate]);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchPosts();
  }, [authService, navigate, fetchPosts]);
  
  const handlePublishToggle = async (post) => {
    try {
      await blogService.updatePost(post.id, {
        ...post,
        published: !post.published
      });
      
      // Update local state
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ));
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post status.');
    }
  };
  
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      await blogService.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post.');
    }
  };
  
  const filteredPosts = activeTab === 'all' 
    ? posts 
    : activeTab === 'published' 
      ? posts.filter(post => post.published) 
      : posts.filter(post => !post.published);
  
  if (loading && posts.length === 0) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
          <Link to="/create-post" className="btn btn-primary">
            Create New Post
          </Link>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard-tabs">
        <div 
          className={`dashboard-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Posts ({posts.length})
        </div>
        <div 
          className={`dashboard-tab ${activeTab === 'published' ? 'active' : ''}`}
          onClick={() => setActiveTab('published')}
        >
          Published ({posts.filter(post => post.published).length})
        </div>
        <div 
          className={`dashboard-tab ${activeTab === 'drafts' ? 'active' : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          Drafts ({posts.filter(post => !post.published).length})
        </div>
      </div>
      
      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">No posts found.</p>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="post-item">
              <div className="post-item-info">
                <h3 className="post-item-title">{post.title}</h3>
                <div className="post-item-meta">
                  <span>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              
              <div className="post-item-actions">
                <Link 
                  to={`/edit-post/${post.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                
                <button 
                  onClick={() => handlePublishToggle(post)}
                  className={post.published ? 'btn btn-secondary' : 'btn btn-success'}
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;