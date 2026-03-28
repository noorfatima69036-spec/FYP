import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Navigation ke liye lazmi hai
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            alert("Login Successful! Welcome to Dastr-Khwan.");
            navigate('/home'); // Ab ye Home page par le jayega
        } else {
            alert("Please enter email and password.");
        }
    };

    return (
        <div style={{background:'rgba(0,0,0,0.6)', height:'100vh', display:'flex', alignItems:'center'}}>
            <form onSubmit={handleLogin} className="popup" style={{width:'360px', background:'#fff', margin:'auto', padding:'25px', borderRadius:'12px'}}>
                <h2 style={{textAlign:'center'}}>Welcome!</h2>
                <div className="tabs" style={{display:'flex', background:'#eee', borderRadius:'30px', marginBottom:'20px'}}>
                    <button type="button" style={{flex:1, padding:'12px', background:'#a04000', color:'#fff', borderRadius:'30px', border:'none'}}>Login</button>
                    <button type="button" onClick={() => navigate('/signup')} style={{flex:1, background:'none', border:'none', cursor:'pointer'}}>Sign up</button>
                </div>
                
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{width:'100%', padding:'12px', marginBottom:'10px', boxSizing:'border-box'}} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{width:'100%', padding:'12px', marginBottom:'10px', boxSizing:'border-box'}} 
                    required 
                />
                
                <div style={{textAlign:'right', marginBottom:'15px'}}>
                    <Link to="/forgot" style={{textDecoration:'none', color:'#a04000', fontSize:'14px'}}>Forgot Password?</Link>
                </div>
                
                <button type="submit" style={{width:'100%', padding:'14px', background:'#a04000', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>
                    LOGIN
                </button>
            </form>
        </div>
    );
};

export default Login;