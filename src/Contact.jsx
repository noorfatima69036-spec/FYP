import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css'; // Styling ke liye CSS file import ki

const Contact = () => {
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
                <form className="contact-form">
                    {/* User se uska naam aur email lene ke liye inputs */}
                    <input type="text" placeholder="Your Name" className="contact-input" />
                    <input type="email" placeholder="Your Email" className="contact-input" />
                    
                    {/* Bari space wala input box message ke liye */}
                    <textarea placeholder="Your Message" className="contact-input textarea"></textarea>
                    
                    {/* Form submit karne ka button */}
                    <button type="button" className="send-msg-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;