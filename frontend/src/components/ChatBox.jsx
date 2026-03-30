import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import './ChatBox.css';

const ChatBox = ({ isOpen, onClose, donorName }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Secure chat initiated. Your phone number is hidden for privacy.' },
    { id: 2, sender: 'them', text: `Hi, I saw your urgent request for O+ blood. I'm nearby and willing to donate.` }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('active'); // active, interested, not_interested

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: input }]);
    setInput('');
  };

  const handleInterest = (isInterested) => {
    setStatus(isInterested ? 'interested' : 'not_interested');
    const systemMsg = isInterested 
      ? 'You indicated you are STILL INTERESTED. The requester can continue to contact you.'
      : 'You marked NOT INTERESTED. The requester can no longer send you messages.';
    setMessages([...messages, { id: Date.now(), sender: 'system', text: systemMsg }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="chat-widget glass-card"
        >
          <div className="chat-header">
            <div>
              <h3>{donorName || 'Aman S.'}</h3>
              <span className="chat-status">{status === 'not_interested' ? 'Closed' : 'Online'}</span>
            </div>
            <button onClick={onClose} className="close-btn"><X size={20} /></button>
          </div>
          
          <div className="chat-privacy-banner">
            <ShieldAlert size={14} /> End-to-end encrypted. Personal data is hidden.
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === 'system' ? (
                  <div className="sys-msg"><Info size={14}/> {msg.text}</div>
                ) : (
                  <div className="msg-bubble">{msg.text}</div>
                )}
              </div>
            ))}
          </div>

          {status === 'active' && (
            <div className="donor-controls">
              <p>Are you still interested in donating?</p>
              <div className="control-btns">
                <button className="btn btn-sm btn-outline-success" onClick={() => handleInterest(true)}>
                  Yes, Interested
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleInterest(false)}>
                  Not Interested
                </button>
              </div>
            </div>
          )}

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder={status === 'not_interested' ? "Chat is closed" : "Type a message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status === 'not_interested'}
            />
            <button type="submit" disabled={!input.trim() || status === 'not_interested'} className="send-btn">
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBox;
