import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* Column 1: About/Logo */}
                <div className="footer-col">
                    <h2 className="footer-logo">Dastr-Khwan</h2>
                    <p>Authentic taste delivered to your doorstep. Your satisfaction is our priority.</p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/full-menu">Menu</Link></li>
                        <li><Link to="/articles">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <p>📍 Shop #4, Hafizabad Road, Gujranwala</p>
                    <p>📞 +92 320 5811056</p>
                    <p><FaEnvelope /> send us message: info@dastrkhwan.com</p>
                </div>

                {/* Column: Big Orders / Events */}
                <div className="footer-col">
                    <h3>Big Orders / Events</h3>
                    <p>
                        Planning a wedding, party, or office event? <Link to="/bulk-order" style={{ color: '#e8a33d', fontWeight: '600' }}>Book here</Link>
                    </p>
                    <p style={{ fontSize: '13px', marginTop: '8px' }}>
                        ⚠️ Please contact us at least 1–2 days in advance. We do not accept urgent/same-day bulk orders.
                    </p>
                </div>

                {/* Column 4: Social Media */}
                <div className="footer-col">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://www.instagram.com/noor_seharghp?igsh=eGdsb3J2MTFxYWc4" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a href="https://www.tiktok.com/@noor.sehar06" target="_blank" rel="noreferrer"><FaTiktok /></a>
                        <a href="https://wa.me/923205811056" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                    </div>
                </div>

            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 Dastr-Khwan | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;