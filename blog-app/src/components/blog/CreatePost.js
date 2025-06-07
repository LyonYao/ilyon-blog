import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../common/RichTextEditor';
import './Blog.css';

const CreatePost = ({ blogService, categoryService, authService }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
    categories: [],
    tags: []
  });
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getAllCategories();
        setAvailableCategories(categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };
    
    fetchCategories();
  }, [categoryService, authService, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };
  
  const handleCategoryToggle = (category) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    
    setFormData({
      ...formData,
      categories: updatedCategories
    });
  };
  
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
    }
    
    setTagInput('');
  };
  
  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      setError('Title and content are required.');
      return;
    }
    
    try {
      setLoading(true);
      await blogService.createPost(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Create New Post</h1>
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
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="post-editor-body">
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <RichTextEditor
              initialValue=""
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
                        checked={formData.categories.includes(category)}
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
                    {formData.tags.map(tag => (
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
                checked={formData.published}
                onChange={handleChange}
              />
              <label htmlFor="published">Publish immediately</label>
            </div>
          </div>
          
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ marginLeft: '10px' }}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;