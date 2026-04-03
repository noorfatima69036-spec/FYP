import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; // Wahi main CSS file link karein

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const sendOTP = () => {
        const generated = Math.floor(100000 + Math.random() * 900000);
        alert("Your OTP is: " + generated);
        setStep(2);
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
                                required 
                            />
                        </div>
                        <button onClick={() => navigate('/')} className="auth-btn">
                            VERIFY & HOME
                        </button>
                    </div>
                )}

                <p className="auth-switch">
                    Remember your password? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;