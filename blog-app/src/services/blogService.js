import api from './apiService';

const blogService = {
  // Get all posts (for admin/author)
  getAllPosts: async (page = 1, perPage = 10) => {
    try {
      const response = await api.get(`/posts/all?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get published posts (for public view)
  getPublishedPosts: async (filter = {}, page = 1, perPage = 10) => {
    try {
      let url = `/posts?page=${page}&per_page=${perPage}`;
      
      if (filter.category) {
        url += `&category=${encodeURIComponent(filter.category)}`;
      }
      
      if (filter.tag) {
        url += `&tag=${encodeURIComponent(filter.tag)}`;
      }
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      // 修复405错误：确保使用正确的HTTP方法和URL
      console.log('Sending post data:', postData);
      const response = await api.post('/posts', JSON.stringify(postData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.post;
    } catch (error) {
      console.error('API Error details:', error);
      throw error.response ? error.response.data : error;
    }
  },

  // Update existing post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data.post;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data.categories;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get popular tags
  getPopularTags: async () => {
    try {
      const response = await api.get('/tags/popular');
      return response.data.tags;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default blogService;