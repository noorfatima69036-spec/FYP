import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 import "../Style.css"; // Styling ke liye CSS file import ki

const API_BASE = "http://localhost/dastr-khwan-backend";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/send_contact_message.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await res.json();
            setIsError(!data.success);
            setStatusMsg(data.message);

            if (data.success) {
                // Form clear kar do successful submit ke baad
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (err) {
            setIsError(true);
            setStatusMsg("Could not connect to the server. Please check if XAMPP is running.");
        }

        setLoading(false);
    };

    return (
        <div className="contact-container">
            {/* Back Button: User ko wapis home par bhejne ke liye */}
            <Link to="/home" className="back-link">← Back to Home</Link>
            
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">We'd love to hear from you about Dastr-Khwan!</p>

            {/* Information Cards Section */}
            <div className="info-grid">
                <div className="info-card">
                    <h3>📍 Address</h3>
                    <p>Main G.T Road, Gujranwala, Punjab</p>
                </div>
                <div className="info-card">
                    <h3>📞 Phone</h3>
                    <p>+92 300 1234567</p>
                </div>
                <div className="info-card">
                    <h3>📧 Email</h3>
                    <p>info@dastr-khwan.com</p>
                </div>
            </div>

            {/* Message Form Section */}
            <div className="contact-form-wrapper">
                <h3>Send us a Message</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                    {/* User se uska naam aur email lene ke liye inputs */}
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="contact-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="contact-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    {/* Bari space wala input box message ke liye */}
                    <textarea
                        placeholder="Your Message"
                        className="contact-input textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    
                    {/* Form submit karne ka button */}
                    <button type="submit" className="send-msg-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    {statusMsg && (
                        <p style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            fontSize: '14px',
                            color: isError ? '#c0392b' : '#2e7d32',
                            fontWeight: 600
                        }}>
                            {isError ? '⚠️ ' : '✅ '}{statusMsg}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;
