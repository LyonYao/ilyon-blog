import React, { useState, useEffect } from 'react';
import './CategoryManager.css';

const CategoryManager = ({ categoryService }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validation, setValidation] = useState({});
  
  // Category name max length
  const MAX_CATEGORY_LENGTH = 30;

  useEffect(() => {
    fetchCategories();
  }, [categoryService]);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await categoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateCategoryName = (name) => {
    if (!name.trim()) {
      return 'Category name cannot be empty';
    }
    if (name.length > MAX_CATEGORY_LENGTH) {
      return `Category name cannot exceed ${MAX_CATEGORY_LENGTH} characters`;
    }
    return null;
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    const validationError = validateCategoryName(newCategory);
    if (validationError) {
      setValidation({ newCategory: validationError });
      return;
    }
    
    setError('');
    setSuccess('');
    setValidation({});
    
    try {
      await categoryService.addCategory(newCategory);
      setSuccess('Category added successfully');
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      setError('');
      setSuccess('');
      
      try {
        await categoryService.deleteCategory(categoryName);
        setSuccess('Category deleted successfully');
        fetchCategories();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const startEditing = (categoryName) => {
    setEditingCategory(categoryName);
    setEditName(categoryName);
    setValidation({});
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName('');
    setValidation({});
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    
    const validationError = validateCategoryName(editName);
    if (validationError) {
      setValidation({ editName: validationError });
      return;
    }
    
    if (!editName.trim() || editName === editingCategory) {
      cancelEditing();
      return;
    }
    
    setError('');
    setSuccess('');
    setValidation({});
    
    try {
      await categoryService.updateCategory(editingCategory, editName);
      setSuccess('Category updated successfully');
      cancelEditing();
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="add-category-form">
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            maxLength={MAX_CATEGORY_LENGTH}
            required
          />
          <button type="submit">Add Category</button>
        </form>
        {validation.newCategory && <div className="validation-error">{validation.newCategory}</div>}
      </div>
      
      <div className="categories-list">
        <h3>Current Categories</h3>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul>
            {categories.map(category => (
              <li key={category}>
                {editingCategory === category ? (
                  <form onSubmit={handleUpdateCategory} className="edit-category-form">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={MAX_CATEGORY_LENGTH}
                      required
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button type="submit">Save</button>
                      <button type="button" onClick={cancelEditing}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="category-item">
                    <span>{category}</span>
                    <div className="category-actions">
                      <button onClick={() => startEditing(category)}>Edit</button>
                      <button onClick={() => handleDeleteCategory(category)}>Delete</button>
                    </div>
                  </div>
                )}
                {editingCategory === category && validation.editName && 
                  <div className="validation-error">{validation.editName}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;