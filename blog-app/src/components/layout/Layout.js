import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import './Layout.css';
import logo from '../../assets/logo.svg';

const Layout = ({ children, authService }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useContext(ThemeContext);
  
  // Use useCallback to prevent recreation of checkAuth on every render
  const checkAuth = useCallback(() => {
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      setUser(authService.getCurrentUser());
    } else {
      setUser(null);
    }
  }, [authService]);
  
  useEffect(() => {
    checkAuth();
  }, [location.pathname, checkAuth]);
  
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className="layout">
      <header className="main-header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Lyon's Blog" className="logo-image" />
              Lyon's Blog
            </Link>
          </div>
          
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              
              <li>
                <ThemeSwitcher />
              </li>
              
              {isAuthenticated ? (
                <li className="user-menu">
                  <span onClick={toggleDropdown}>
                    {user?.username} ▼
                  </span>
                  
                  {showDropdown && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      {user && user.role === 'admin' && (
                        <li>
                          <Link to="/categories">Categories</Link>
                        </li>
                      )}
                      <li>
                        <button onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About</h3>
            <div className="footer-logo">
              <img src={logo} alt="Lyon's Blog" className="footer-logo-image" />
            </div>
            <p>A platform for sharing thoughts, stories, and ideas.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@lyonsblog.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lyon's Blog. All rights reserved. Built by Amazon Q AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;