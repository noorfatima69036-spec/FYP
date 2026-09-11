import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 import "../Style.css"; // Aapki main CSS file link ho gayi
const API_BASE = "http://localhost/dastr-khwan-backend";

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Password show/hide toggle

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
        setMessage("Please enter email and password.");
        return;
    }

    setLoading(true);

    try {
        const res = await fetch(`${API_BASE}/auth/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('userEmail', data.user.email);
            alert("Login Successful! Welcome to Dastr-Khwan.");
            navigate('/home');
        } else {
            setMessage(data.message);
        }
    } catch (err) {
        setMessage("Could not connect to the server. Please check if XAMPP is running.");
    }

    setLoading(false);
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
                    <div style={{ position: 'relative' }}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', paddingRight: '40px', boxSizing: 'border-box' }}
                            required 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                padding: 0
                            }}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                
                <div style={{textAlign: 'right', marginBottom: '15px'}}>
                    <Link to="/forgot" style={{textDecoration: 'none', color: '#a04000', fontSize: '14px', fontWeight: 'bold'}}>
                        Forgot Password?
                    </Link>
                </div>
                
                <button type="submit" className="auth-btn" disabled={loading}>
    {loading ? 'Logging in...' : 'LOGIN'}
</button>

{message && (
    <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
        {message}
    </p>
)}

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
