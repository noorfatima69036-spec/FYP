import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
 import "../Style.css";

const API_BASE = "http://localhost/dastr-khwan-backend";

const Deals = () => {
    const { addToCart, cartItems, totalPrice } = useCart();
    const navigate = useNavigate();
    const [dealsData, setDealsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDealAdd = (deal) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            addToCart(deal);
        } else {
            alert("Please login first! You cannot place an order without logging in.");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetch(`${API_BASE}/admin/get_menu_items.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const onlyDeals = data.items.filter((item) => item.category === 'deals');
                    setDealsData(onlyDeals);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Deals fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="admin-loading-text">Loading deals...</p>;

    return (
        <div className="deals-page-container">
            <div className="deals-header-section">
                <Link to="/home" className="back-home-link">← Back to Home</Link>
                <h1 className="deals-main-title">Dastr-Khwan Special Deals</h1>
            </div>
            
            <div className="deals-split-layout">
                <div className="deals-list-column">
                    {dealsData.map((deal) => (
                        <div key={deal.id} className="deal-list-item">
                            <h3>{deal.name}</h3>
                            <p>{deal.description}</p>
                            <span className="price-tag">Rs. {deal.price}</span>
                            <button 
                                onClick={() => handleDealAdd(deal)}
                                className="home-style-btn"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                <div className="deals-zigzag-images-column">
                    {dealsData.map((deal, index) => (
                        <div key={deal.id} className={`image-wrapper ${index % 2 === 0 ? 'move-left' : 'move-right'}`}>
                            <img src={deal.image_name} alt={deal.name} className="deal-circle-img" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky-checkout-bar">
                <div className="checkout-info">
                    🛒 Items: {cartItems.length} | Total: Rs. {totalPrice}
                </div>
                <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                    CHECKOUT NOW
                </button>
            </div>
        </div>
    );
};

export default Deals;