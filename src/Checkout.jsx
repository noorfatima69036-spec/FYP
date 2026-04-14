import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; 

const Checkout = () => {
    const { cartItems, totalPrice, setCartItems } = useCart();
    const [orderDone, setOrderDone] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('cod');// Payment method state
    
    const navigate = useNavigate();

    // --- LOGIN CHECK LOGIC START ---
    useEffect(() => {
        const userStatus = localStorage.getItem('isLoggedIn');
        if (userStatus !== 'true') {
            // Agar login nahi hai toh alert dikha kar login page bhej do
            alert("Order place karne ke liye pehle Login karein.");
            navigate('/login');
        }
    }, [navigate]);
    

    const handleOrder = (e) => {
        e.preventDefault();

        // check karna k instructions save ho rahi hain ya ni
        console.log("Special Instructions for Kitchen:", instructions);

        setOrderDone(true);
        // Order hone ke baad cart khali karne ke liye:
        setCartItems([]); 
    };

    if (orderDone) {
        return (
            <div className="order-success-container">
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Thank you for ordering from Dastr-Khwan.</p>
                <Link to="/home" className="back-home-btn">Go Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="checkout-title">Checkout</h1>
            
            <div className="checkout-container">
                {/* Left Side: Form */}
                <div className="checkout-form-section">
                    <h3>Delivery Details</h3>
                    <form onSubmit={handleOrder}>
                        <input type="text" className="checkout-input" placeholder="Full Name" required />
                        <input type="text" className="checkout-input" placeholder="Phone Number" required />
                        <textarea className="checkout-input textarea" placeholder="Delivery Address" required></textarea>

                        <h3 style={{marginTop: '20px'}}>Special Instructions</h3>
                        <textarea 
                            className="checkout-input textarea" 
                            placeholder="Add your instructions" 
                            style={{minHeight: '80px', marginTop: '10px'}}
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        ></textarea>

                        <h3 style={{marginTop: '20px'}}>Payment Method</h3>
                        <div className="payment-selection" style={{margin: '15px 0', display: 'flex', gap: '20px'}}>
                            <label style={{cursor: 'pointer', fontWeight: 'bold'}}>
                                <input 
                                    type="radio"
                                    name="payment" 
                                    value="cod" 
                                    checked={paymentMethod === 'cod'} 
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Cash on Delivery
                            </label>
                            <label style={{cursor: 'pointer', fontWeight: 'bold'}}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="online" 
                                    checked={paymentMethod === 'online'} 
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Online Payment
                            </label>
                        </div>

                        {/* Online Payment Details Box */}
                        {paymentMethod === 'online' && (
                            <div className="online-details-box">
                                <p><strong>Transfer to one of these:</strong></p>
                                <ul style={{listStyle: 'none', padding: '10px', background: '#fef9e7', borderRadius: '8px', fontSize: '14px'}}>
                                    <li>📱 <strong>EasyPaisa:</strong> 0300-1234567</li>
                                    <li>📱 <strong>JazzCash:</strong> 0310-7654321</li>
                                    <li>💳 <strong>Raast ID:</strong> 03001234567</li>
                                    <li>🏦 <strong>Bank:</strong> HBL 1234-5678-9012</li>
                                </ul>
                                <input type="text" className="checkout-input" placeholder="Enter Transaction ID (TID)" required />
                            </div>
                        )}

                        <button type="submit" className="confirm-order-btn">
                            CONFIRM ORDER
                        </button>
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="order-summary-section">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="summary-item">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>Rs. {item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>Rs. {totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;