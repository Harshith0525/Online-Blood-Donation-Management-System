import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Activity, User, LogIn, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Heart color="var(--primary)" size={28} fill="var(--primary)" />
          </motion.div>
          LifeDrop
        </Link>
        
        <div className="nav-links hidden-mobile">
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
             Dashboard
          </Link>
          <Link to="/donate" className={`nav-link ${location.pathname === '/donate' ? 'active' : ''}`}>
            Donate Blood
          </Link>
          <Link to="/request" className={`nav-link ${location.pathname === '/request' ? 'active' : ''}`}>
            Request Blood
          </Link>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 10px' }}></div>
          {user ? (
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <LogIn size={18} /> Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
