import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';
import { useCart } from './CartContext';

const API_BASE = "http://localhost/dastr-khwan-backend";

const CATEGORY_LABELS = {
    appetizers: "Appetizers",
    maincourse: "Main Course",
    rice: "Rice & Biryani",
    drinks: "Drinks",
    bfm: "Breakfast Menu",
    extra: "Extras",
    desserts: "Desserts",
    deals: "Deals"
};

const FullMenu = () => {
    const { cartItems, totalPrice, addToCart } = useCart();
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState({});
    const [loading, setLoading] = useState(true);

    // Har item ke liye currently selected portion (full/half) track karta hai
    const [selectedPortions, setSelectedPortions] = useState({});

    const handlePortionChange = (itemId, portion) => {
        setSelectedPortions((prev) => ({ ...prev, [itemId]: portion }));
    };

    const handleMenuAdd = (item) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            const portion = selectedPortions[item.id] || 'full';
            addToCart(item, portion);
        } else {
            alert("Please login first! You cannot place an order without logging in.");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetch(`${API_BASE}/get_menu_items.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const grouped = {};
                    data.items.forEach((item) => {
                        if (!grouped[item.category]) {
                            grouped[item.category] = [];
                        }
                        grouped[item.category].push(item);
                    });
                    setMenuItems(grouped);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Menu fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="admin-loading-text">Loading menu...</p>;

    return (
        <div className="full-menu-page">
            <header className="full-menu-header">
                <Link to="/home" className="back-to-home">← Back to Home</Link>
                <h1>Our Complete Menu</h1>
                <p>Freshly prepared Punjabi heritage dishes</p>
            </header>

            <div className="full-menu-container">
                {Object.keys(menuItems).map((category) => (
                    <div key={category} className="full-menu-section">
                        <h2 className="category-title">{CATEGORY_LABELS[category] || category}</h2>
                        <div className="full-items-grid">
                            {menuItems[category].map(item => {
                                const hasHalf = item.price_half !== null && Number(item.price_half) > 0;
                                const currentPortion = selectedPortions[item.id] || 'full';
                                return (
                                <div key={item.id} className="menu-item-card">
                                    <img src={item.image_name} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        {item.description && item.description !== '----' && (
                                            <p className="description">{item.description}</p>
                                        )}

                                        {hasHalf ? (
                                            <div className="portion-select" style={{ display: 'flex', gap: '10px', margin: '6px 0' }}>
                                                <label style={{ fontSize: '13px', cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name={`portion-${item.id}`}
                                                        checked={currentPortion === 'full'}
                                                        onChange={() => handlePortionChange(item.id, 'full')}
                                                    /> Full - Rs. {item.price_full}
                                                </label>
                                                <label style={{ fontSize: '13px', cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name={`portion-${item.id}`}
                                                        checked={currentPortion === 'half'}
                                                        onChange={() => handlePortionChange(item.id, 'half')}
                                                    /> Half - Rs. {item.price_half}
                                                </label>
                                            </div>
                                        ) : (
                                            <p>Rs. {item.price_full}</p>
                                        )}

                                        <button className="add-btn-small" onClick={() => handleMenuAdd(item)}>Add to Cart</button>
                                    </div>
                                </div>
                            );})}
                        </div>
                    </div>
                ))}
            </div>

            <div className="sticky-checkout-bar">
                <div className="checkout-info">🛒 Items in Cart: {cartItems.length} | Total: Rs. {totalPrice}</div>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <button className="checkout-btn">CHECKOUT NOW</button>
                </Link>
            </div>
        </div>
    );
};

export default FullMenu;
