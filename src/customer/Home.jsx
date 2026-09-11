import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { fetchCurrentAddress } from '../utils/locationHelper';
import "../Style.css";
const API_BASE = "http://localhost/dastr-khwan-backend";

const Home = () => {
    // For chacking localStorage
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState('');
const [locationLoading, setLocationLoading] = useState(false);
const [locationFailed, setLocationFailed] = useState(false);
const [selectedCity, setSelectedCity] = useState('');
const [orderType, setOrderType] = useState('delivery'); // 'delivery' ya 'pickup' - ab ye track hoga

const [menuItems, setMenuItems] = useState({});
const [menuLoading, setMenuLoading] = useState(true);

// Har item ke liye currently selected portion (full/half) track karta hai
// key = item.id, value = 'full' ya 'half'
const [selectedPortions, setSelectedPortions] = useState({});

const cityAreas = [
    'Hafizabad Road',
    'Model Town',
    'Satellite Town',
    'Peoples Colony',
    'Gulshan Colony',
    'Civil Lines',
    'Wapda Town',
    'Khalid Colony',
];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const itemsRef = useRef(null); 
    const navigate = useNavigate();
    
    const { addToCart, cartItems, totalPrice } = useCart(); 

    const handlePortionChange = (itemId, portion) => {
        setSelectedPortions((prev) => ({ ...prev, [itemId]: portion }));
    };

    const handleAddToCart = (item) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log("Is User Logged In?", isLoggedIn);
        if (isLoggedIn === 'true') {
            const portion = selectedPortions[item.id] || 'full';
            addToCart(item, portion);
        } else {
            alert("Please login first! You cannot place an order without logging in.");
            navigate('/login');
        }
};

    // when user "Confirm & Continue" 
    const handleConfirm = () => {
        // Agar Delivery select ki hai to address zaroori hai, Pickup mein nahi
        if (orderType === 'delivery' && !address.trim()) {
            alert("Please select a city or enter your delivery address.");
            return;
        }
        localStorage.setItem('orderTypeSelected', 'true');
        localStorage.setItem('orderType', orderType); // Checkout page isay use karega
        localStorage.setItem('savedAddress', orderType === 'delivery' ? address : '');
        setShowModal(false);// after alert the model close
        alert("Preferences saved. Welcome to Dastr-Khwan!"); 
        
         
    };

    const handleUseMyLocation = () => {
    setLocationFailed(false);
    fetchCurrentAddress(
        (fullAddress) => {
            setAddress(fullAddress);
            setLocationFailed(false);
        },
        () => {
            setLocationFailed(true);
        },
        (loading) => {
            setLocationLoading(loading);
        }
    );
};

    // when categories are selected ,scroll down
    useEffect(() => {
    const isSelected = localStorage.getItem('orderTypeSelected') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Modal logic
    if (isLoggedIn && !isSelected) {
        setShowModal(true);
    } else {
        setShowModal(false);
    }

    // Scroll logic 
    if (selectedCategory && itemsRef.current) {
        itemsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [selectedCategory]);

useEffect(() => {
        fetch(`${API_BASE}/admin/get_menu_items.php`)
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
                setMenuLoading(false);
            })
            .catch((err) => {
                console.error("Menu fetch error:", err);
                setMenuLoading(false);
            });
    }, []);


    const categories = [
        { id: 'appetizers', name: 'Appetizers', img: 'appet.jpeg', count: '5 Items Available' },
        { id: 'maincourse', name: 'Main Course', img: 'maincourse.jpeg', count: 'Karahi & Handi & more' },
        { id: 'bfm', name: 'Breakfast Menu', img: 'bfm.jpeg', count: 'Fresh & Healthy Morning' },
        { id: 'rice', name: 'Rice & Biryani', img: 'menubiryani.jpeg', count: 'Long Grain Basmati' },
        { id: 'deals', name: 'Deals', img: 'deals.jpeg', count: 'Exclusive Bundles for You' },
        { id: 'drinks', name: 'Drinks', img: 'drink.jpeg', count: 'Fresh & Chilled' },
        { id: 'extra', name: 'Extras', img: 'extras.jpeg', count: 'Raita, Salad & More' },
        { id: 'desserts', name: 'Desserts', img: 'dessert.jpeg', count: 'Sweet Endings' }
    ];

    
    return (
        <div className="home-container">
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ position: 'relative', padding: '40px 20px 20px 20px' }}>
                        <button className="close-modal" onClick={() => setShowModal(false)} style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                cursor: 'pointer',
                color: '#333',
                fontWeight: 'bold'
            }}>✖</button>
                        <div className="logo-circle-modal"><img src="logo2.jpeg" alt="Logo" /></div>
                        <h3>Select your order type</h3>
                        <div className="order-type-tabs">
                            <button
                                type="button"
                                className={orderType === 'delivery' ? 'active' : ''}
                                onClick={() => setOrderType('delivery')}
                            >
                                DELIVERY
                            </button>
                            <button
                                type="button"
                                className={orderType === 'pickup' ? 'active' : ''}
                                onClick={() => setOrderType('pickup')}
                            >
                                PICK-UP
                            </button>
                        </div>

                        {/* Ye sab (location button, city dropdown, address input) sirf Delivery ke liye chahiye */}
                        {orderType === 'delivery' && (
                        <>
                        <button
    type="button"
    onClick={handleUseMyLocation}
    disabled={locationLoading}
    style={{
        width: '100%',
        marginTop: '8px',
        marginBottom: '10px',
        padding: '10px',
        background: '#fff',
        border: '1px solid #a0522d',
        color: '#a0522d',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px'
    }}
>
    {locationLoading ? '📍 Fetching location...' : '📍 Use My Current Location'}
</button>

{locationFailed && (
    <div style={{
        background: '#e7f3ff',
        border: '1px solid #a8d4ff',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
    }}>
        <span style={{ fontSize: '16px' }}>ℹ️</span>
        <p style={{ margin: 0, fontSize: '13px', color: '#0c5aa6', lineHeight: '1.4' }}>
            Sorry, we could not detect your delivery area. Please select from the list below.
        </p>
    </div>
)}

<label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#444' }}>
    Select City / Region
</label>
<select
    value={selectedCity}
    onChange={(e) => {
        setSelectedCity(e.target.value);
        setAddress(e.target.value);
    }}
    className="modal-input"
    style={{ marginBottom: '10px' }}
>
    <option value="">Select City / Region</option>
    {cityAreas.map((area) => (
        <option key={area} value={area}>{area}</option>
    ))}
</select>

<input
    type="text"
    className="modal-input"
    placeholder="Ya manually Street / Colony / Area likhein"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
/>
                        </>
                        )}

                        {orderType === 'pickup' && (
                            <div style={{
                                background: '#fef9e7',
                                border: '1px solid #f0d98c',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '12px',
                                fontSize: '13px',
                                color: '#7a5c00'
                            }}>
                                🏪You will collect the order yourself from Shop #4, Hafizabad Road, Gujranwala. Providing an address is not necessary.
                            </div>
                        )}

                       {/* here Alert is function call ho raha hai */}
                        <button className="confirm-btn" onClick={handleConfirm}>
                            Confirm & Continue
                        </button>
                    </div>
                </div>
            )}

            <div className="top-red-bar"><p>📍 Shop #4, Hafizabad Road, Gujranwala | Open: 12 PM - 12 AM</p></div>
            
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-circle-nav"><img src="logo2.jpeg" alt="Logo" /></div>
                    <span>Dastr-Khwan</span>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/full-menu">Menu</Link></li>
                    <li><Link to="/deals">Deals</Link></li>
                    <li><Link to="/membership">Office Membership</Link></li>
                   <li> <Link to="/articles">About Us</Link></li>
                   <li> <Link to="/live-kitchen">🍳 Kitchen</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            <header className="slider-container">
                <div className="slides">
                    <div className="slide"><img src="s1.jpeg" alt="S1" /></div>
                    <div className="slide"><img src="s2.jpeg" alt="S2" /></div>
                    <div className="slide"><img src="s3.jpeg" alt="S3" /></div>
                    <div className="slide"><img src="s4.jpeg" alt="S4" /></div>
                    <div className="slide"><img src="s5.jpeg" alt="S1" /></div>
                    <div className="slide"><img src="s6.jpeg" alt="S1" /></div>
                    <div className="slide"><img src="s7.jpeg" alt="S1" /></div>
                </div>
            </header>

            <section className="menu-preview">
                <h2 className="section-title">OUR MENU CATEGORIES</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="category-card" onClick={() => setSelectedCategory(cat.id)}>
                            <div className="card-img-container"><img src={cat.img} alt={cat.name} /></div>
                            <h3>{cat.name}</h3>
                            <p>{cat.count}</p>
                        </div>
                    ))}
                </div>
            </section>

            
            <div ref={itemsRef}>
                {selectedCategory && (
                    <section className="further-items">
                        <h2 className="section-title" style={{color: '#a04000'}}>
                            Top 5 {categories.find(c => c.id === selectedCategory)?.name}
                        </h2>
                        <div className="items-row">
                             {(menuItems[selectedCategory] || []).map((item) => {
                                const hasHalf = item.price_half !== null && Number(item.price_half) > 0;
                                const currentPortion = selectedPortions[item.id] || 'full';
                                return (
                                <div key={item.id} className="item-card">
                                    <img src={item.image_name} alt={item.name} />
                                    <h4>{item.name}</h4>

                                    {/* DESCRIPTION LOGIC: Agar khali hai ya ---- hai to hide ho jaye */}
                                    {item.description && item.description !== '----' && (
                                        <p className="description" style={{fontSize: '12px', color: '#666', minHeight: '30px'}}>
                                            {item.description}
                                        </p>
                                    )}

                                    {hasHalf ? (
                                        <>
                                            <div className="portion-select" style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '6px 0' }}>
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
                                        </>
                                    ) : (
                                        <p>Rs. {item.price_full}</p>
                                    )}

                                    <button className="add-cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                </div>
                            );})}
                        </div>
                        <div className="view-all-container">
                            <button className="view-all-btn" onClick={() => navigate('/full-menu')}>VIEW ALL MENU</button>
                        </div>
                    </section>
                )}
            </div>

            <div className="sticky-checkout-bar">
                <div className="checkout-info">🛒 Items: {cartItems.length} | Total: Rs. {totalPrice}</div>
                <button className="checkout-btn" onClick={() => navigate('/checkout')}>CHECKOUT NOW</button>
            </div>
        </div>
    );
};

export default Home;
