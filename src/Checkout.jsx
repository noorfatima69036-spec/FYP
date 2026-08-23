import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; 

const Checkout = () => {
    const { cartItems, totalPrice, setCartItems } = useCart();
    const [orderDone, setOrderDone] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('cod');// Payment method state
    const [transactionId, setTransactionId] = useState('');

const [fullName, setFullName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

const API_BASE = "http://localhost/dastr-khwan-backend";
    
    const navigate = useNavigate();

    // --- LOGIN CHECK LOGIC START ---
    useEffect(() => {
        const userStatus = localStorage.getItem('isLoggedIn');
        if (userStatus !== 'true') {
            // Agar login nahi hai toh alert dikha kar login page bhej do
            alert("Please sign in before placing an order.");
            navigate('/login');
        }
    }, [navigate]);
    

    const handleOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const user_id = localStorage.getItem('userId');

   const orderData = {
    user_id: user_id,
    order_type: 'delivery',
    full_name: fullName,
    phone: phone,
    address: address,
    special_instructions: instructions,
    total_amount: totalPrice,
    payment_method: paymentMethod,
    transaction_id: paymentMethod === 'online' ? transactionId : '',
    items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
    })),
};
    try {
        const res = await fetch(`${API_BASE}/place_order.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (data.success) {
    const placedOrderId = data.order_id;
    localStorage.clear();
    setCartItems([]);
    navigate(`/live-kitchen/${placedOrderId}`);
} else {
            setErrorMsg(data.message || "The order could not be placed.");
        }
    } catch (err) {
        setErrorMsg("Could not connect to the server. Please check if XAMPP is running.");
    }

    setLoading(false);
};

    if (orderDone) {
        return (
            <div className="order-success-container">
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Thank you for ordering from Dastr-Khwan.</p>
                <p style={{color: '#666', fontSize: '14px'}}>You have been logged out safely.</p>
                <button 
                onClick={() => window.location.href = "/login"} 
                className="back-home-btn"
                style={{cursor: 'pointer', border: 'none', padding: '10px 20px', backgroundColor: '#a04000', color: 'white', borderRadius: '5px'}}
            >
                Login Again to Order More
            </button>
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
                        <input 
    type="text" 
    className="checkout-input" 
    placeholder="Full Name" 
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    required 
/>
<input 
    type="text" 
    className="checkout-input" 
    placeholder="Phone Number" 
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required 
/>
<textarea 
    className="checkout-input textarea" 
    placeholder="Delivery Address" 
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
></textarea>

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
                                    <li>📱 <strong>EasyPaisa:</strong> 03701733304</li>
                                    <li>📱 <strong>JazzCash:</strong>  03137929390</li>
                                    <li>💳 <strong>Raast ID:</strong> not available</li>
                                    <li>🏦 <strong>Bank:</strong> Meezan Bank 09060112775184</li>
                                    
                                </ul>
                                <input 
    type="text" 
    className="checkout-input" 
    placeholder="Enter Transaction ID (TID)" 
    value={transactionId}
    onChange={(e) => setTransactionId(e.target.value)}
    required 
/>
                            </div>
                        )}

                        <button type="submit" className="confirm-order-btn" disabled={loading}>
    {loading ? 'Placing Order...' : 'CONFIRM ORDER'}
</button>

{errorMsg && (
    <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
        {errorMsg}
    </p>
)}
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