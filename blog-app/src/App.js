import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicBlog from './components/blog/PublicBlogWithPagination';
import PostDetail from './components/blog/PostDetail';
import Login from './components/auth/Login';
import Dashboard from './components/blog/Dashboard';
import CreatePost from './components/blog/CreatePost';
import EditPost from './components/blog/EditPost';
import CategoryManager from './components/blog/CategoryManager';
import Layout from './components/layout/Layout';
import ThemeProvider from './context/ThemeContext';
import './App.css';
import './components/blog/reset-text-transform.css';

// Import real services directly
import authService from './services/authService';
import blogService from './services/blogService';
import categoryService from './services/categoryService';

function App() {
  // Memoize service instances to prevent unnecessary re-renders
  const services = useMemo(() => ({
    auth: authService,
    blog: blogService,
    category: categoryService
  }), []);

  return (
    <ThemeProvider>
      <Router>
        <Layout authService={services.auth}>
          <Routes>
            <Route path="/" element={<PublicBlog blogService={services.blog} categoryService={services.category} />} />
            <Route path="/post/:id" element={<PostDetail blogService={services.blog} />} />
            <Route path="/login" element={<Login authService={services.auth} />} />
            <Route path="/register" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard blogService={services.blog} authService={services.auth} />} />
            <Route path="/create-post" element={<CreatePost blogService={services.blog} categoryService={services.category} authService={services.auth} />} />
            <Route path="/edit-post/:id" element={<EditPost blogService={services.blog} categoryService={services.category} authService={services.auth} />} />
            <Route path="/categories" element={<CategoryManager categoryService={services.category} />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;