import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Blog.css';

const PublicBlog = ({ blogService, categoryService }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const tagParam = queryParams.get('tag');
  const pageParam = queryParams.get('page');
  
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    category: categoryParam || '',
    tag: tagParam || ''
  });
  const [pagination, setPagination] = useState({
    page: parseInt(pageParam) || 1,
    perPage: 6,
    total: 0,
    pages: 0
  });
  
  // Update filter when URL params change
  useEffect(() => {
    setFilter({
      category: categoryParam || '',
      tag: tagParam || ''
    });
    
    if (pageParam) {
      setPagination(prev => ({
        ...prev,
        page: parseInt(pageParam) || 1
      }));
    } else {
      // Reset to page 1 when filters change but page isn't specified
      setPagination(prev => ({
        ...prev,
        page: 1
      }));
    }
  }, [categoryParam, tagParam, pageParam]);
  
  // Memoize fetch function to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch categories only once
      if (categories.length === 0) {
        const fetchedCategories = await categoryService.getAllCategories();
        setCategories(fetchedCategories);
      }
      
      // Fetch posts based on filter and pagination
      const result = await blogService.getPublishedPosts(
        filter, 
        pagination.page, 
        pagination.perPage
      );
      
      setPosts(result.posts);
      setPagination(prev => ({
        ...prev,
        total: result.pagination.total,
        pages: result.pagination.pages
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filter, pagination.page, pagination.perPage, blogService, categoryService, categories.length]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleFilterChange = (type, value) => {
    setFilter(prev => ({
      ...prev,
      [type]: value
    }));
    
    // Reset to page 1 when filters change
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };
  
  const clearFilters = () => {
    setFilter({
      category: '',
      tag: ''
    });
    
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
    
    // Clear URL params
    window.history.replaceState({}, '', '/');
  };
  
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
    
    // Update URL with page parameter
    const params = new URLSearchParams();
    if (filter.category) params.set('category', filter.category);
    if (filter.tag) params.set('tag', filter.tag);
    params.set('page', newPage);
    
    window.history.pushState({}, '', `/?${params.toString()}`);
  };

  // Function to strip HTML tags for excerpt
  const createExcerpt = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 150) + '...';
  };
  
  if (loading && posts.length === 0) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <div className="public-blog-container">
      <header className="blog-header">
        <h1>Lyon's Blog</h1>
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
                const params = new URLSearchParams();
                if (e.target.value) params.set('category', e.target.value);
                if (filter.tag) params.set('tag', filter.tag);
                window.history.pushState({}, '', params.toString() ? `/?${params.toString()}` : '/');
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
                // Update URL
                const params = new URLSearchParams();
                if (filter.category) params.set('category', filter.category);
                if (e.target.value) params.set('tag', e.target.value);
                window.history.pushState({}, '', params.toString() ? `/?${params.toString()}` : '/');
              }}
            />
            
            <button onClick={clearFilters} className="clear-filter">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="card-grid">
        {posts.length === 0 ? (
          <p className="no-posts">No posts found. Try changing your filters.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="card blog-post-card">
              <div className="card-body">
                <h2>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                
                <div className="post-meta">
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  
                  {post.categories.length > 0 && (
                    <div className="post-categories">
                      {post.categories.map(category => (
                        <span 
                          key={category} 
                          className="category-badge"
                          onClick={() => {
                            handleFilterChange('category', category);
                            const params = new URLSearchParams();
                            params.set('category', category);
                            window.history.pushState({}, '', `/?${params.toString()}`);
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
                        const params = new URLSearchParams();
                        params.set('tag', tag);
                        window.history.pushState({}, '', `/?${params.toString()}`);
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="read-more-container">
                  <Link to={`/post/${post.id}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Pagination controls */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="pagination-button"
          >
            &laquo; Previous
          </button>
          
          <div className="pagination-info">
            Page {pagination.page} of {pagination.pages}
          </div>
          
          <button 
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="pagination-button"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicBlog;