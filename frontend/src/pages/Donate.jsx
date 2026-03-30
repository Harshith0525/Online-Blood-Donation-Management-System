import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Star, Clock, Calendar, ChevronRight } from 'lucide-react';
import { hospitalService } from '../services/api';
import './Donate.css';

const Donate = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    hospitalService.getAll().then(data => {
      setHospitals(data);
    }).catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) setStep(2);
  };

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
          
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Location</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Hospital</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirm</div>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSearch} className="step-content">
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
                <button type="button" className="btn-auto-loc" onClick={() => setLocation('Using GPS Location...')}>
                  <MapPin size={16} /> Auto-detect
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary submit-btn mt-4">
              Find Nearby Hospitals <ChevronRight size={18} />
            </button>
          </form>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-content">
            <h3>Hospitals near "{location}"</h3>
            <div className="hospital-list">
              {hospitals.map((hosp) => (
                <div key={hosp.id} className="hospital-card" onClick={() => setStep(3)}>
                  <div className="hosp-info">
                    <h4>{hosp.name}</h4>
                    <p className="hosp-address"><MapPin size={14} /> {hosp.address} (approx. {Math.random().toFixed(1)} km)</p>
                  </div>
                  <div className="hosp-rating">
                    <Star fill="#eab308" stroke="none" size={16} /> {hosp.rating}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary mt-4" onClick={() => setStep(1)}>Back</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-content">
            <h3>Select Date & Time</h3>
            <div className="datetime-selection">
              <div className="input-group">
                <label><Calendar size={16} /> Select Date</label>
                <input type="date" required />
              </div>
              <div className="input-group">
                <label><Clock size={16} /> Select Time slot</label>
                <select required>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 03:00 PM</option>
                </select>
              </div>
            </div>
            <div className="action-buttons mt-4">
              <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn btn-primary" onClick={() => alert('Appointment Confirmed! Check Dashboard.')}>Confirm Appointment</button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default Donate;
