import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../../services/blogService';
import categoryService from '../../services/categoryService';
import RichTextEditor from '../common/RichTextEditor';
import './Blog.css';

const EditPost = ({ authService }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    categories: [],
    tags: [],
    published: false
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated
    if (authService && !authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    const fetchData = async () => {
      try {
        // Fetch post data
        const postData = await blogService.getPostById(id);
        setPost(postData);
        
        // Fetch categories
        const fetchedCategories = await categoryService.getAllCategories();
        setAvailableCategories(fetchedCategories);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, authService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost({
      ...post,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleContentChange = (content) => {
    setPost({
      ...post,
      content
    });
  };
  
  const handleCategoryToggle = (category) => {
    const updatedCategories = post.categories.includes(category)
      ? post.categories.filter(c => c !== category)
      : [...post.categories, category];
    
    setPost({
      ...post,
      categories: updatedCategories
    });
  };
  
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    if (!post.tags.includes(tagInput.trim())) {
      setPost({
        ...post,
        tags: [...post.tags, tagInput.trim()]
      });
    }
    
    setTagInput('');
  };
  
  const handleRemoveTag = (tag) => {
    setPost({
      ...post,
      tags: post.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!post.title || !post.content) {
      setError('Title and content are required.');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      await blogService.updatePost(id, post);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Edit Post</h1>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="post-editor">
        <div className="post-editor-header">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="post-editor-body">
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <RichTextEditor
              initialValue={post.content}
              value={post.content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        
        <div className="post-options">
          <div className="post-options-header">
            <h3>Post Options</h3>
          </div>
          
          <div className="post-options-body">
            <div className="post-options-section">
              <div className="form-group">
                <label>Categories</label>
                <div className="checkbox-group">
                  {availableCategories.map(category => (
                    <div key={category} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={post.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <label htmlFor={`category-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="post-options-section">
              <div className="form-group">
                <label>Tags</label>
                <div className="tag-input">
                  <div className="tag-input-field">
                    <input
                      type="text"
                      className="form-control"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleAddTag}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="tag-list">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                        <span
                          className="tag-remove"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="post-editor-footer">
          <div className="form-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={post.published}
                onChange={handleChange}
              />
              <label htmlFor="published">Published</label>
            </div>
          </div>
          
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ marginLeft: '10px' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;