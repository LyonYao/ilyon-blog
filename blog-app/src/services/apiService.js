import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Important for cookies
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    

    
    // Add cache control headers to prevent duplicate requests
    if (config.method === 'get') {
      config.headers['Cache-Control'] = 'no-cache';
      // Add timestamp to prevent browser caching
      const timestamp = new Date().getTime();
      config.url = config.url + (config.url.includes('?') ? '&' : '?') + '_t=' + timestamp;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Create a request cache to prevent duplicate API calls
const requestCache = new Map();

// Enhanced API with request deduplication
const enhancedApi = {
  get: (url, config = {}) => {
    const cacheKey = url + JSON.stringify(config);
    
    // Check if there's an ongoing request for this URL
    if (requestCache.has(cacheKey)) {
      return requestCache.get(cacheKey);
    }
    
    // Make the request and store the promise in the cache
    const request = api.get(url, config)
      .then(response => {
        // Remove from cache once completed
        setTimeout(() => requestCache.delete(cacheKey), 0);
        return response;
      })
      .catch(error => {
        // Remove from cache on error
        setTimeout(() => requestCache.delete(cacheKey), 0);
        throw error;
      });
    
    requestCache.set(cacheKey, request);
    return request;
  },
  
  // Pass through other methods
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config)
};

export default enhancedApi;