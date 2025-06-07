import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import logo from '../../assets/logo.svg';
import './Layout.css';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Lyon's Block Logo" className="logo-image" />
            <span>Lyon's Block</span>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li 
                  className="user-menu"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <span>{user?.username || 'User'} ▼</span>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <li><Link to="/dashboard">My Posts</Link></li>
                      <li><Link to="/create-post">Create Post</Link></li>
                      <li><Link to="/manage-categories">Manage Categories</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;