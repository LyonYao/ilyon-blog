import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import blogService from '../../services/blogService';
import categoryService from '../../services/categoryService';
import './Blog.css';

const PublicBlog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const tagParam = queryParams.get('tag');
  
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    category: categoryParam || '',
    tag: tagParam || ''
  });
  
  // Update filter when URL params change
  useEffect(() => {
    setFilter({
      category: categoryParam || '',
      tag: tagParam || ''
    });
  }, [categoryParam, tagParam]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts based on filter
        const fetchedPosts = await blogService.getPublishedPosts(filter);
        setPosts(fetchedPosts);
        
        // Fetch categories
        const fetchedCategories = await categoryService.getAllCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filter]);
  
  const handleFilterChange = (type, value) => {
    setFilter({
      ...filter,
      [type]: value
    });
  };
  
  const clearFilters = () => {
    setFilter({
      category: '',
      tag: ''
    });
    
    // Clear URL params
    window.history.replaceState({}, '', '/');
  };

  // Function to strip HTML tags for excerpt
  const createExcerpt = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 150) + '...';
  };
  
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <div className="public-blog-container">
      <header className="blog-header">
        <h1>Lyon's Block</h1>
        <p>Thoughts, stories and ideas</p>
      </header>
      
      <div className="blog-filters">
        <div className="filter-section">
          <h3>Filter by:</h3>
          <div className="filter-options">
            <select 
              value={filter.category} 
              onChange={(e) => {
                handleFilterChange('category', e.target.value);
                // Update URL
                const url = e.target.value ? 
                  `/?category=${encodeURIComponent(e.target.value)}` : 
                  '/';
                window.history.pushState({}, '', url);
              }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Search by tag"
              value={filter.tag}
              onChange={(e) => {
                handleFilterChange('tag', e.target.value);
                // Update URL if tag is not empty
                if (e.target.value) {
                  window.history.pushState({}, '', `/?tag=${encodeURIComponent(e.target.value)}`);
                } else if (!filter.category) {
                  window.history.pushState({}, '', '/');
                }
              }}
            />
            
            <button onClick={clearFilters} className="clear-filter">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="blog-posts">
        {posts.length === 0 ? (
          <p className="no-posts">No posts found. Try changing your filters.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="blog-post-card">
              <h2>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              
              <div className="post-meta">
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                
                {post.categories.length > 0 && (
                  <div className="post-categories">
                    {post.categories.map(category => (
                      <span 
                        key={category} 
                        className="category-badge"
                        onClick={() => {
                          handleFilterChange('category', category);
                          window.history.pushState({}, '', `/?category=${encodeURIComponent(category)}`);
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="post-excerpt">
                {createExcerpt(post.content)}
              </p>
              
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="tag-badge"
                    onClick={() => {
                      handleFilterChange('tag', tag);
                      window.history.pushState({}, '', `/?tag=${encodeURIComponent(tag)}`);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <Link to={`/post/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PublicBlog;