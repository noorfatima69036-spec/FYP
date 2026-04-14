import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; // Aapki main CSS file link ho gayi

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            alert("Login Successful! Welcome to Dastr-Khwan.");
            navigate('/home'); 
        } else {
            alert("Please enter email and password.");
        }
    };

    return (
        <div className="auth-container">
            
            <form onSubmit={handleLogin} className="auth-form" style={{ position: 'relative' }}>
                
                {/* --- CORNER CROSS BUTTON --- */}
                <button 
                    type="button"
                    className="close-modal" 
                    onClick={() => navigate('/home')} // Guest wapis menu par chala jaye
                    style={{
                        position: 'absolute', top: '15px', right: '15px',
                        border: 'none', background: 'none', fontSize: '20px',
                        cursor: 'pointer', color: '#666'
                    }}
                >
                    ✖
                </button>
                <h2>Welcome!</h2>
                
                {/* Tabs design same like signup page logic */}
                <div className="auth-tabs" style={{display: 'flex', background: '#f1f1f1', borderRadius: '8px', marginBottom: '25px', overflow: 'hidden'}}>
                    <div className="tab-link active" style={{flex: 1, padding: '12px', background: '#A04000', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                        Login
                    </div>
                    <Link to="/signup" className="tab-link" style={{flex: 1, padding: '12px', textDecoration: 'none', color: '#666', fontWeight: 'bold', textAlign: 'center'}}>
                        Sign up
                    </Link>
                </div>
                
                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                
                <div style={{textAlign: 'right', marginBottom: '15px'}}>
                    <Link to="/forgot" style={{textDecoration: 'none', color: '#a04000', fontSize: '14px', fontWeight: 'bold'}}>
                        Forgot Password?
                    </Link>
                </div>
                
                <button type="submit" className="auth-btn">
                    LOGIN
                </button>

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;