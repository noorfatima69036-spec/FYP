import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Kyunke App.jsx khud src folder mein hai, isliye sirf ./ likhein
import Login from './Login';
import FullMenu from './FullMenu';
import Signup from './Signup'; 
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import './Style.css'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/full-menu" element={<FullMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;