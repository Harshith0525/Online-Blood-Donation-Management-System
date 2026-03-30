import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Award, Bell, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { authService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const user = authService.getCurrentUser() || {};
  return (
    <div className="dashboard-container container">
      <div className="dashboard-sidebar">
        <div className="profile-section text-center">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-img" />
          <h3 className="profile-name">{user.name || 'Rahul Sharma'}</h3>
          <p className="profile-blood">{user.bloodGroup || 'O+'} Blood Group</p>
          <span className="badge-pill role-badge">{user.role || 'Donor & Requester'}</span>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Points</h4>
            <div className="stat-val"><Award size={20} className="icon-main"/> {user.points || 0}</div>
          </div>
          <div className="stat-card">
            <h4>Donations</h4>
            <div className="stat-val"><Heart size={20} className="icon-main"/> 0</div>
          </div>
        </div>

        <div className="badges-section">
          <h4>Your Badges</h4>
          <div className="badges-list">
            <div className="badge-item tooltipped"><Activity size={24} color="#e53e3e" /> <span>First Hero</span></div>
            <div className="badge-item tooltipped"><Award size={24} color="#d69e2e" /> <span>Bronze Life Saver</span></div>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <h2 className="section-title">Welcome back, {user.name ? user.name.split(' ')[0] : 'Rahul'}</h2>
        
        <div className="notifications-panel glass-card">
          <h3 className="panel-title"><Bell size={20} /> Urgent Notifications</h3>
          <div className="notification-list">
            <div className="notification-item urgent">
              <span className="pulse-dot"></span>
              <div className="notif-content">
                <strong>O+ Blood Needed Urgently!</strong>
                <p>Apollo Hospital is 2km away and looking for O+ donors for an emergency surgery.</p>
                <div className="notif-actions">
                  <button className="btn btn-primary btn-sm">I'm Interested</button>
                  <button className="btn btn-secondary btn-sm">Not Now</button>
                </div>
              </div>
            </div>
            <div className="notification-item success">
              <CheckCircle size={20} color="green" />
              <div className="notif-content">
                <strong>Request Accepted</strong>
                <p>David Chen has accepted your blood request. Check your chat to coordinate.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="history-panel glass-card mt-4">
          <h3 className="panel-title"><Calendar size={20} /> Upcoming Appointments</h3>
          <div className="appointment-card">
            <div className="apt-date">
              <span className="month">MAR</span>
              <span className="day">15</span>
            </div>
            <div className="apt-details">
              <h4>Blood Donation Appointment</h4>
              <p><MapPin size={16} /> Max Super Speciality Hospital (4.5 <Heart fill="gold" stroke="none" size={14}/>)</p>
              <p className="apt-time">10:00 AM - 11:00 AM</p>
            </div>
            <button className="btn btn-secondary">Reschedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
