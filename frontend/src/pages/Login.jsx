import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { authService } from '../services/api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (email && password) {
        await authService.login({ email, password });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Invalid credentials or server error.');
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card auth-card"
      >
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue saving lives.</p>
          {error && <div className="error-message" style={{ color: '#ff4d4d', marginTop: '10px' }}>{error}</div>}
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label><Lock size={16} /> Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            <LogIn size={18} /> Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
