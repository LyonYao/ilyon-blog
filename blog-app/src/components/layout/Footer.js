import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Layout.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Lyon's Block</h3>
          <div className="footer-logo">
            <img src={logo} alt="Lyon's Block Logo" className="footer-logo-image" />
          </div>
          <p>A place to share thoughts from the Frozen Throne.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/?category=Technology">Technology</Link></li>
            <li><Link to="/?category=Travel">Travel</Link></li>
            <li><Link to="/?category=Lifestyle">Lifestyle</Link></li>
            <li><Link to="/?category=Food">Food</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Lyon's Block. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;