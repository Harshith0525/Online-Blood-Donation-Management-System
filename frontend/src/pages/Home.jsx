import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplet, Heart, MapPin, Search, Award, Activity } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <span className="badge-pill">Save Lives Today</span>
            <h1 className="hero-title">Give the Gift of <span className="text-primary">Life</span></h1>
            <p className="hero-subtitle">
              Join our global platform connecting willful donors with patients in critical need. 
              Your single donation can save up to three lives. Make an impact today.
            </p>
            <div className="hero-actions">
              <Link to="/donate" className="btn btn-primary btn-lg">
                <Heart size={20} fill="currentColor" /> I Want to Donate
              </Link>
              <Link to="/request" className="btn btn-secondary btn-lg btn-white">
                <Search size={20} /> Request Blood
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <h3 className="stat-num">10k+</h3>
                <p>Donors Registered</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-num">5k+</h3>
                <p>Lives Saved</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-num">200+</h3>
                <p>Hospital Partners</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights & News */}
      <section className="container highlights-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card achievement-card"
        >
          <div className="achievement-icon"><Award size={32} color="var(--primary)" /></div>
          <div className="achievement-text">
            <h3>Remarkable Achievement!</h3>
            <p>Our team successfully facilitated a rare blood group delivery from Kashmir to Telangana in critical time, saving a patient's life last Tuesday!</p>
          </div>
        </motion.div>

        <div className="news-and-donors">
          <div className="medical-news">
            <h2 className="section-title"><Activity className="icon-main"/> Medical News</h2>
            <div className="news-list">
              <div className="news-card">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80" alt="Blood lab" className="news-img"/>
                <div className="news-info">
                  <span className="news-date">Mar 10, 2026</span>
                  <h4>New advances in blood matching precision technology deployed globally.</h4>
                </div>
              </div>
              <div className="news-card">
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80" alt="Doctor" className="news-img"/>
                <div className="news-info">
                  <span className="news-date">Mar 8, 2026</span>
                  <h4>Who guidelines updated for post-vaccination donation waiting periods.</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="top-donors">
            <h2 className="section-title"><Heart className="icon-main" /> Top Donors This Month</h2>
            <div className="donor-list">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="donor-card"
                >
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Donor" className="donor-avatar"/>
                  <div className="donor-details">
                    <h4>{['Rahul Sharma', 'Priya Patel', 'David Chen'][i-1]}</h4>
                    <p className="blood-group">O+ | 12 Donations</p>
                  </div>
                  <div className="donor-points">
                    <span>{5000 - i*450}</span> pts
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
