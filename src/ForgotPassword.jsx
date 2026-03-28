import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const sendOTP = () => {
        const generated = Math.floor(100000 + Math.random() * 900000);
        alert("Your OTP is: " + generated);
        setStep(2);
    };

    return (
        <div style={{background:'rgba(0,0,0,0.7)', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="popup" style={{width:'360px', background:'#fff', padding:'30px', borderRadius:'15px', textAlign:'center'}}>
                <h2>Forgot Password</h2>
                {step === 1 ? (
                    <div>
                        <p>Enter email to get OTP</p>
                        <input type="email" placeholder="Email" style={{width:'100%', padding:'12px', margin:'10px 0'}} />
                        <button onClick={sendOTP} style={{width:'100%', padding:'12px', background:'#000', color:'#fff'}}>Send OTP</button>
                    </div>
                ) : (
                    <div>
                        <input type="text" placeholder="Enter OTP" style={{width:'100%', padding:'12px', margin:'10px 0'}} />
                        <button onClick={() => navigate('/')} style={{width:'100%', padding:'12px', background:'#000', color:'#fff'}}>Verify & Home</button>
                    </div>
                )}
                <Link to="/login" style={{display:'block', marginTop:'20px', color:'#000', fontWeight:'bold'}}>Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;