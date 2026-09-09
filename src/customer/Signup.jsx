import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 import "../Style.css"; // Aapki CSS file
const API_BASE = "http://localhost/dastr-khwan-backend";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
        const res = await fetch(`${API_BASE}/auth/signup.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success) {
            alert("Signup Successful! Now please login.");
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

        <button type="submit" className="auth-btn" disabled={loading}>
    {loading ? 'Signing up...' : 'Sign Up'}
</button>

{message && (
    <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
        {message}
    </p>
)}
        
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;