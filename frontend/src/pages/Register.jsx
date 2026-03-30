import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Heart, Phone, MapPin } from 'lucide-react';
import { authService } from '../services/api';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', bloodGroup: '', password: '', userType: 'donor'
  });
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Failed to register account.');
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card auth-card register-card"
      >
        <div className="auth-header">
          <h2>Join LifeDrop</h2>
          <p>Become a donor or requester today.</p>
          {error && <div className="error-message" style={{ color: '#ff4d4d', marginTop: '10px' }}>{error}</div>}
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="role-selector">
            <button 
              type="button" 
              className={`role-btn ${formData.userType === 'donor' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'donor'})}
            >
              <Heart size={16} /> Donor
            </button>
            <button 
              type="button" 
              className={`role-btn ${formData.userType === 'requester' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'requester'})}
            >
              <User size={16} /> Requester
            </button>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label><User size={16} /> Full Name</label>
              <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><Mail size={16} /> Email</label>
              <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><Phone size={16} /> Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 XXXXXXXXXX" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><Heart size={16} /> Blood Group</label>
              <select name="bloodGroup" onChange={handleChange} required>
                <option value="">Select Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            </div>
            <div className="input-group col-span-2">
              <label><MapPin size={16} /> Location</label>
              <input type="text" name="location" placeholder="City, State" onChange={handleChange} required />
            </div>
            <div className="input-group col-span-2">
              <label><Lock size={16} /> Password</label>
              <input type="password" name="password" placeholder="Create a strong password" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
