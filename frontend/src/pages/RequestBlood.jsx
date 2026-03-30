import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, MapPin, Heart, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import { requestService, authService } from '../services/api';
import './RequestBlood.css';

const RequestBlood = () => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [donors, setDonors] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const [formData, setFormData] = useState({ patientName: '', age: '', bloodGroupNeeded: '', hospitalName: '', doctorName: '', reason: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = authService.getCurrentUser();
      if (!user) { alert("Please login first!"); return; }
      
      await requestService.create({
        patientName: formData.patientName,
        age: parseInt(formData.age),
        bloodGroupNeeded: formData.bloodGroupNeeded,
        doctorName: formData.doctorName,
        reason: formData.reason,
        requester: { id: user.id }
      });
      
      setDonors([
        { id: 1, name: 'Aman S.', distance: '1.2 km', group: formData.bloodGroupNeeded, rating: 4.9 },
        { id: 2, name: 'Priya K.', distance: '3.4 km', group: formData.bloodGroupNeeded, rating: 4.7 }
      ]);
      setRequestSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit blood request.");
    }
  };

  return (
    <div className="request-container container">
      {!requestSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="form-wrapper glass-card request-form-card"
        >
          <div className="request-header">
            <h2><AlertCircle color="var(--primary)" className="inline-icon" /> Emergency Blood Request</h2>
            <p>Fill out the details below. We'll immediately notify completely matched nearby donors.</p>
          </div>

          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-grid">
              <div className="input-group col-span-2">
                <label><User size={16} /> Patient Name</label>
                <input type="text" name="patientName" onChange={handleChange} placeholder="Full Name" required />
              </div>
              <div className="input-group">
                <label><Activity size={16} /> Age</label>
                <input type="number" name="age" onChange={handleChange} placeholder="Patient Age" required />
              </div>
              <div className="input-group">
                <label><Heart size={16} /> Blood Group Needed</label>
                <select name="bloodGroupNeeded" onChange={handleChange} required>
                  <option value="">Select Group</option>
                  <option value="A+">A+</option><option value="O+">O+</option>
                  <option value="B+">B+</option><option value="AB+">AB+</option>
                  <option value="A-">A-</option><option value="O-">O-</option>
                  <option value="B-">B-</option><option value="AB-">AB-</option>
                </select>
              </div>
              <div className="input-group">
                <label><MapPin size={16} /> Hospital Name</label>
                <input type="text" name="hospitalName" onChange={handleChange} placeholder="Where is treatment ongoing?" required />
              </div>
              <div className="input-group">
                <label><User size={16} /> Doctor's Name</label>
                <input type="text" name="doctorName" onChange={handleChange} placeholder="Attending Doctor" required />
              </div>
              <div className="input-group col-span-2">
                <label><AlertCircle size={16} /> Reason for Request</label>
                <input type="text" name="reason" onChange={handleChange} placeholder="E.g., Surgery, Accident, Anemia" required />
              </div>
              <div className="input-group col-span-2">
                <label><Phone size={16} /> OTP Verification via Phone Number</label>
                <div className="otp-group">
                  <input type="tel" placeholder="Phone Number" required className="flex-1"/>
                  <button type="button" className="btn btn-secondary btn-sm">Get OTP</button>
                </div>
              </div>
              <div className="input-group col-span-2">
                 <input type="text" placeholder="Enter OTP Here" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn mt-4 w-full">
              Submit Life-saving Request
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="donors-result-view"
        >
          <div className="success-banner">
            <h3>Request Broadcasted Successfully!</h3>
            <p>Your request has been verified and sent to nearby eligible donors. Below are donors matching your criteria.</p>
          </div>

          <div className="matched-donors-list">
            <h3 className="section-title">Available Donors</h3>
            {donors.map((donor) => (
              <div key={donor.id} className="donor-match-card glass-card">
                <div className="donor-match-info">
                  <div className="donor-avatar pulse-avatar">
                     {donor.name.charAt(0)}
                  </div>
                  <div>
                    <h4>{donor.name} <span className="donor-badge">{donor.group}</span></h4>
                    <p className="donor-meta"><MapPin size={14}/> {donor.distance} away | Rating: {donor.rating}</p>
                  </div>
                </div>
                <div className="donor-actions">
                  <button className="btn btn-primary" onClick={() => { setSelectedDonor(donor.name); setChatOpen(true); }}>
                    <MessageCircle size={16}/> Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn btn-secondary mt-4" onClick={() => setRequestSubmitted(false)}>
            Back to Dashboard
          </button>
          
          <ChatBox 
            isOpen={chatOpen} 
            onClose={() => setChatOpen(false)} 
            donorName={selectedDonor} 
          />
        </motion.div>
      )}
    </div>
  );
};

export default RequestBlood;
