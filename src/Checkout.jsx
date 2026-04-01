import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './Style.css'; // CSS file import karna mat bhooliyega

const Checkout = () => {
    const { cartItems, totalPrice } = useCart();
    const [orderDone, setOrderDone] = useState(false);

    const handleOrder = (e) => {
        e.preventDefault();
        setOrderDone(true);
        // Order hone ke baad cart ko khali karne ke liye (Optional)
        // setCartItems([]); 
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