import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; // Aapki CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // Signup ke baad login page par bhejne ke liye
    alert("Signup Successful! Ab login karein.");
    navigate('/'); 
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up - Dastr-Khwan</h2>
        
        <div className="input-group">
          <label>Username</label>
          <input 
            type="text" name="username" 
            placeholder="Enter username" 
            onChange={handleChange} required 
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" name="email" 
            placeholder="Enter email" 
            onChange={handleChange} required 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" name="password" 
            placeholder="Enter password" 
            onChange={handleChange} required 
          />
        </div>

        <button type="submit" className="auth-btn">Sign Up</button>
        
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;