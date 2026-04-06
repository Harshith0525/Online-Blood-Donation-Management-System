import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Award, Bell, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { authService, requestService } from '../services/api';
import './Dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = authService.getCurrentUser() || {};
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user.id) {
          const data = await requestService.getNotifications(user.id, user.bloodGroup || 'O+');
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [user.id, user.bloodGroup]);

  const handleInterest = async (requestId) => {
    try {
      await requestService.updateStatus(requestId, 'ACCEPTED');
      toast.success('Interest registered! The requester will be notified.');
      setNotifications(notifications.filter(n => n.id !== requestId));
    } catch (error) {
      toast.error('Failed to register interest.');
    }
  };

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
            {isLoading ? (
              <div className="text-center p-3">Loading notifications...</div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className={`notification-item ${notif.status === 'ACCEPTED' ? 'success' : 'urgent'}`}>
                  {notif.status === 'ACCEPTED' ? (
                    <CheckCircle size={20} color="green" />
                  ) : (
                    <span className="pulse-dot"></span>
                  )}
                  <div className="notif-content">
                    <strong>{notif.status === 'ACCEPTED' ? 'Request Accepted' : `${notif.bloodGroupNeeded} Blood Needed Urgently!`}</strong>
                    <p>
                      {notif.status === 'ACCEPTED' 
                        ? `A donor has accepted your request for ${notif.patientName}. Check your chat to coordinate.`
                        : `${notif.hospital?.name || 'A nearby hospital'} is looking for ${notif.bloodGroupNeeded} donors for ${notif.reason || 'emergency surgery'}.`}
                    </p>
                    {notif.status === 'PENDING' && (
                      <div className="notif-actions">
                        <button className="btn btn-primary btn-sm" onClick={() => handleInterest(notif.id)}>I'm Interested</button>
                        <button className="btn btn-secondary btn-sm">Not Now</button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notif-msg text-center p-4 text-muted">
                No urgent notifications at the moment.
              </div>
            )}
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
