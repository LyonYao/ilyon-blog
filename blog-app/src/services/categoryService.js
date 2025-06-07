import api from './apiService';

const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data.categories.map(category => category.name);
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Add new category
  addCategory: async (categoryName) => {
    try {
      const response = await api.post('/categories', { name: categoryName });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Delete category
  deleteCategory: async (categoryName) => {
    try {
      const response = await api.delete(`/categories/${encodeURIComponent(categoryName)}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Update category
  updateCategory: async (categoryName, newName) => {
    try {
      const response = await api.put(`/categories/${encodeURIComponent(categoryName)}`, { name: newName });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default categoryService;