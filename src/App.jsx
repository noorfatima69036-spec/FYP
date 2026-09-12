import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Customer pages
import Checkout from './customer/Checkout';
import Contact from './customer/Contact';
import Deals from './customer/Deals';
import WasteAlert from './customer/WasteAlert';
import Login from './customer/Login';
import FullMenu from './customer/FullMenu';
import Signup from './customer/Signup';
import Home from './customer/Home';
import ForgotPassword from './customer/ForgotPassword';
import Blogs from './customer/Blogs';
import LiveKitchen from "./customer/LiveKitchen";
import OfficeMembership from './customer/Officemembership';
import BulkOrder from './customer/Bulkorder';
import WeeklyMenu from './customer/WeeklyMenu';

// Components
import Footer from './components/Footer';
 import "./Style.css";

// Admin pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminMenu from './admin/AdminMenu';
import AdminWasteAlert from './admin/AdminWasteAlert';
import AdminWeeklyMenu from './admin/AdminWeeklyMenu';
import AdminDeliveryBoys from './admin/AdminDeliveryBoys';
import AdminHome from './admin/AdminHome';
import AdminBulkOrders from './admin/AdminBulkOrders';
import AdminMemberships from './admin/AdminMemberships';

// Delivery pages
import DeliveryLogin from './delivery/DeliveryLogin';
import DeliveryDashboard from './delivery/DeliveryDashboard';
import AdminReviews from "./admin/AdminReviews";



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
          <Route path="/live-kitchen/:orderId" element={<LiveKitchen />} />
          <Route path="/membership" element={<OfficeMembership />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/weekly-menu" element={<WeeklyMenu />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/waste-alert" element={<AdminWasteAlert />} />
          <Route path="/admin/weekly-menu" element={<AdminWeeklyMenu />} />
          <Route path="/admin/delivery-boys" element={<AdminDeliveryBoys />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/admin/dashboard-home" element={<AdminHome />} />
          <Route path="/admin/bulk-orders" element={<AdminBulkOrders />} />
          <Route path="/admin/memberships" element={<AdminMemberships />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          
          
          
        </Routes>
         <WasteAlert />
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;