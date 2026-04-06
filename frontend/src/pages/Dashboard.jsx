import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Award, Bell, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { authService, requestService, appointmentService } from '../services/api';
import './Dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = authService.getCurrentUser() || {};
  const [notifications, setNotifications] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [rescheduleData, setRescheduleData] = React.useState({ id: null, dateTime: '' });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.id) {
          const [notifs, apts] = await Promise.all([
            requestService.getNotifications(user.id, user.bloodGroup || 'O+'),
            appointmentService.getForDonor(user.id)
          ]);
          setNotifications(notifs);
          setAppointments(apts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleInterest = async (requestId) => {
    try {
      await requestService.updateStatus(requestId, 'ACCEPTED');
      toast.success('Interest registered! The requester will be notified.');
      setNotifications(notifications.filter(n => n.id !== requestId));
    } catch (error) {
      toast.error('Failed to register interest.');
    }
  };

  const handleReschedule = async (appointmentId) => {
    if (!rescheduleData.dateTime) {
      toast.warn('Please select a new date and time.');
      return;
    }
    try {
      const updated = await appointmentService.update(appointmentId, { appointmentTime: rescheduleData.dateTime });
      setAppointments(appointments.map(a => a.id === appointmentId ? updated : a));
      setRescheduleData({ id: null, dateTime: '' });
      toast.success('Appointment rescheduled successfully!');
    } catch (error) {
      toast.error('Failed to reschedule appointment.');
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return {
      month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: d.getDate(),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
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
          <div className="appointment-list">
            {isLoading ? (
              <div className="text-center p-3">Loading appointments...</div>
            ) : appointments.length > 0 ? (
              appointments.map((apt) => {
                const { month, day, time } = formatDate(apt.appointmentTime);
                return (
                  <div key={apt.id} className="appointment-card">
                    <div className="apt-date">
                      <span className="month">{month}</span>
                      <span className="day">{day}</span>
                    </div>
                    <div className="apt-details">
                      <h4>Blood Donation Appointment</h4>
                      <p><MapPin size={16} /> {apt.hospital?.name || 'Assigned Hospital'}</p>
                      {rescheduleData.id === apt.id ? (
                        <div className="reschedule-controls mt-2">
                          <input 
                            type="datetime-local" 
                            className="form-control form-control-sm"
                            value={rescheduleData.dateTime}
                            onChange={(e) => setRescheduleData({ ...rescheduleData, dateTime: e.target.value })}
                          />
                          <div className="mt-2 d-flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={() => handleReschedule(apt.id)}>Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setRescheduleData({ id: null, dateTime: '' })}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="apt-time">{time}</p>
                      )}
                    </div>
                    {rescheduleData.id !== apt.id && (
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => setRescheduleData({ id: apt.id, dateTime: apt.appointmentTime.split('.')[0] })}
                      >
                        Reschedule
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="no-apt-msg text-center p-4 text-muted">
                No upcoming appointments.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
