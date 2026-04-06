import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Star, Clock, Calendar, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { hospitalService, appointmentService, authService } from '../services/api';
import './Donate.css';
 
const Donate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00 AM - 11:00 AM'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
 
  useEffect(() => {
    hospitalService.getAll()
      .then(data => setHospitals(data))
      .catch(err => console.error(err));
  }, []);
 
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location) setStep(2);
  };
 
  const handleHospitalSelect = (hosp) => {
    setSelectedHospital(hosp);
    setStep(3);
  };
 
  const handleConfirm = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      alert('Please log in to schedule a donation!');
      navigate('/login');
      return;
    }
 
    setIsLoading(true);
    try {
      const appointment = {
        donor: { id: user.id },
        hospital: { id: selectedHospital.id },
        appointmentTime: `${formData.date}T${formData.time.split(' ')[0]}:00`,
        status: 'SCHEDULED'
      };
      
      await appointmentService.create(appointment);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to schedule appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
 
  if (success) {
    return (
      <div className="donate-container container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="success-card glass-card text-center"
        >
          <CheckCircle size={64} className="success-icon mb-4" />
          <h2>Appointment Scheduled!</h2>
          <p>Your life-saving donation at <strong>{selectedHospital.name}</strong> is confirmed.</p>
          <div className="details-box mt-4">
            <p><Calendar size={16} /> {formData.date}</p>
            <p><Clock size={16} /> {formData.time}</p>
          </div>
          <button className="btn btn-primary mt-4 w-100" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }
 
  return (
    <div className="donate-container container">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-wrapper glass-card"
      >
        <div className="donate-header">
          <h2>Schedule a Donation</h2>
          <p>Find nearby legitimate hospitals and pick a time.</p>
          
          <div className="progress-bar-steps">
            <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-label">Location</span>
            </div>
            <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-label">Hospital</span>
            </div>
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>
 
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handleLocationSubmit} 
              className="step-content"
            >
              <div className="input-group location-input-group">
                <label><MapPin size={18} /> Enable Location or Enter Manually</label>
                <div className="location-box">
                  <input 
                    type="text" 
                    placeholder="e.g., Hyderabad, Telangana" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="location-input"
                    required
                  />
                  <button type="button" className="btn-auto-loc" onClick={() => setLocation('Hyderabad, India')}>
                    <MapPin size={16} /> Auto-detect
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit-btn mt-4">
                Find Nearby Hospitals <ChevronRight size={18} />
              </button>
            </motion.form>
          )}
 
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <div className="step-title-row">
                <button className="btn-back-icon" onClick={() => setStep(1)}><ArrowLeft size={18} /></button>
                <h3>Hospitals near "{location}"</h3>
              </div>
              
              <div className="hospital-list">
                {hospitals.length > 0 ? hospitals.map((hosp) => (
                  <div key={hosp.id} className="hospital-card" onClick={() => handleHospitalSelect(hosp)}>
                    <div className="hosp-info">
                      <h4>{hosp.name}</h4>
                      <p className="hosp-address"><MapPin size={14} /> {hosp.address}</p>
                    </div>
                    <div className="hosp-meta">
                      <div className="hosp-rating">
                        <Star fill="#eab308" stroke="none" size={14} /> {hosp.rating || '4.5'}
                      </div>
                      <button className="btn-select">Select</button>
                    </div>
                  </div>
                )) : (
                  <div className="no-data">No hospitals found. Try a different location.</div>
                )}
              </div>
            </motion.div>
          )}
 
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <div className="step-title-row">
                <button className="btn-back-icon" onClick={() => setStep(2)}><ArrowLeft size={18} /></button>
                <h3>Confirm Appointment at {selectedHospital?.name}</h3>
              </div>
 
              <div className="datetime-selection card-panel">
                <div className="input-group">
                  <label><Calendar size={16} /> Select Date</label>
                  <input 
                    type="date" 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="input-group mt-3">
                  <label><Clock size={16} /> Select Time slot</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  >
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>02:00 PM - 03:00 PM</option>
                    <option>03:00 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>
 
              <div className="commitment-note mt-3">
                <CheckCircle size={14} /> By confirming, you agree to show up on the selected time.
              </div>
 
              <button 
                className={`btn btn-primary mt-4 w-100 ${isLoading ? 'loading' : ''}`} 
                onClick={handleConfirm}
                disabled={!formData.date || isLoading}
              >
                {isLoading ? 'Scheduling...' : 'Confirm Appointment'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
 
export default Donate;
