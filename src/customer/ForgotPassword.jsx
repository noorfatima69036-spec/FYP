import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 import "../Style.css"; // Wahi main CSS file link karein
const API_BASE = "http://localhost/dastr-khwan-backend";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

   const sendOTP = async () => {
    setMessage('');
    if (!email) {
        setMessage("Please enter your email");
        return;
    }
    setLoading(true);

    try {
        const res = await fetch(`${API_BASE}/auth/send_otp.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (data.success) {
            alert("Your OTP is: " + data.demo_otp + " (This would normally be emailed to you)");
            setStep(2);
        } else {
            setMessage(data.message);
        }
    } catch (err) {
        setMessage("Could not connect to the server. Please check if XAMPP is running.");
    }

    setLoading(false);
};

const resetPassword = async () => {
    setMessage('');

    if (!otp || !newPassword || !confirmPassword) {
        setMessage("Please fill all fields");
        return;
    }
    if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
    }

    setLoading(true);

    try {
        const res = await fetch(`${API_BASE}/auth/reset_password.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, new_password: newPassword }),
        });
        const data = await res.json();

        if (data.success) {
            alert("Password reset successfully! Please login with your new password.");
            navigate('/');
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
            <div className="auth-form">
                <h2>Forgot Password</h2>
                
                {step === 1 ? (
                    <div>
                        <p style={{marginBottom: '15px', color: '#666', fontSize: '14px'}}>
                            Enter email to get OTP
                        </p>
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
                        <button onClick={sendOTP} className="auth-btn">
                            SEND OTP
                        </button>
                    </div>
                ) : (
                    <div>
                        <p style={{marginBottom: '15px', color: '#666', fontSize: '14px'}}>
                            OTP has been sent to your email
                        </p>
                        <div className="input-group">
                            <label>Enter OTP</label>
                            <input 
                                type="text" 
                                placeholder="6-digit code" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>New Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter new password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                placeholder="Re-enter new password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button onClick={resetPassword} className="auth-btn" disabled={loading}>
                            {loading ? 'Resetting...' : 'RESET PASSWORD'}
                        </button>
                    </div>
                )}

                {message && (
                    <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
                        {message}
                    </p>
                )}

                <p className="auth-switch">
                    Remember your password? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;