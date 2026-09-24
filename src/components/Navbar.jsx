import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    
    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

    
        window.addEventListener('storage', checkLogin);
        return () => window.removeEventListener('storage', checkLogin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('orderTypeSelected');

        setIsLoggedIn(false);
        alert("Logged out successfully!");
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <div className="logo-circle-nav"><img src="logo2.jpeg" alt="Logo" /></div>
                <span>Dastr-Khwan</span>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/full-menu">Menu</Link></li>
                <li><Link to="/deals">Deals</Link></li>
                <li><Link to="/membership">Office Membership</Link></li>
                <li><Link to="/articles">About Us</Link></li>
                <li><Link to="/live-kitchen">🍳 Kitchen</Link></li>
                
                {isLoggedIn ? (
                    <li>
                        <button 
                            onClick={handleLogout} 
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                                font: 'inherit'
                            }}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;