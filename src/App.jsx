import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Checkout from './Checkout';// Checkout page ko import karna taake App ko pata ho ye kahan hai
import Contact from './Contact'; // for contact
import Deals from './Deals';
import WasteAlert from './WasteAlert';
import Footer from './Footer';

// Kyunke App.jsx khud src folder mein hai, isliye sirf ./ likhein
import Login from './Login';
import FullMenu from './FullMenu';
import Signup from './Signup'; 
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import Blogs from './Blogs';
import './Style.css'; 
import LiveKitchen from "./LiveKitchen";
import OfficeMembership from './OfficeMembership';
import BulkOrder from './BulkOrder';


function App() {
  return (
    /* 2. Wrap all project into CartProvider */
    <CartProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Blogs />} />
          {/* Checkout route define kiya taake user cart se checkout page par ja sakay */}
          <Route path="/checkout" element={<Checkout />} />
          {/* for contacts */}
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/deals" element={<Deals />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/full-menu" element={<FullMenu />} />
          <Route path="/live-kitchen" element={<LiveKitchen />} />
          <Route path="/membership" element={<OfficeMembership />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          
          
          
        </Routes>
         <WasteAlert />
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;