import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';

const Home = () => {
    const [showModal, setShowModal] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const itemsRef = useRef(null); // Scroll karne ke liye ref
    const navigate = useNavigate();

    // Jab user "Confirm & Continue" dabaye to ye function chalay ga
    const handleConfirm = () => {
        alert("Preferences saved. Welcome to Dastr-Khwan!"); // Ye wahi alert hai jo aapne screenshot mein dikhaya
        setShowModal(false); // Alert ke baad modal band ho jaye ga
    };

    // Jaise hi category select ho, niche scroll kar jaye
    useEffect(() => {
        if (selectedCategory && itemsRef.current) {
            itemsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedCategory]);

    const categories = [
        { id: 'appetizers', name: 'Appetizers', img: 'pasta.jpeg', count: '5 Items Available' },
        { id: 'maincourse', name: 'Main Course', img: 'maincourse.jpeg', count: 'Karahi & Handi & more' },
        { id: 'bbq', name: 'BBQ Specials', img: 'bbq.jpg', count: 'Hot & Spicy Tikka' },
        { id: 'rice', name: 'Rice & Biryani', img: 'biryani.jpeg', count: 'Long Grain Basmati' },
        { id: 'karahi', name: 'Special Karahi', img: 'karahi.jpg', count: 'Desi Butter Taste' },
        { id: 'drinks', name: 'Cold Drinks', img: 'drink.jpg', count: 'Fresh & Chilled' },
        { id: 'tandoor', name: 'Tandoor', img: 'roti.jpg', count: 'Fresh Naan & Roti' },
        { id: 'desserts', name: 'Desserts', img: 'dessert.jpeg', count: 'Sweet Endings' }
    ];

    const categoryDetails = {
        'appetizers': [
            { id: 1, name: 'Samosa Chat', price: 300, img: 'pasta.jpeg' },
            { id: 2, name: 'Spring Rolls', price: 370, img: 'pasta.jpeg' },
            { id: 3, name: 'French Fries', price: 440, img: 'pasta.jpeg' },
            { id: 4, name: 'Chicken Wings', price: 510, img: 'pasta.jpeg' },
            { id: 5, name: 'Garlic Bread', price: 580, img: 'pasta.jpeg' },
        ],
        'maincourse': [
            { id: 6, name: 'Chicken Karahi', price: 1200, img: 'maincourse.jpeg' },
            { id: 7, name: 'Mutton Handi', price: 1800, img: 'maincourse.jpeg' },
            { id: 8, name: 'Daal Makhni', price: 600, img: 'maincourse.jpeg' },
            { id: 9, name: 'Mix Veg', price: 550, img: 'maincourse.jpeg' },
            { id: 10, name: 'Palak Paneer', price: 700, img: 'maincourse.jpeg' },
        ],
        'bbq': [
            { id: 11, name: 'Chicken Tikka', price: 450, img: 'bbq.jpg' },
            { id: 12, name: 'Seekh Kabab', price: 600, img: 'bbq.jpg' },
            { id: 13, name: 'Malai Boti', price: 850, img: 'bbq.jpg' },
            { id: 14, name: 'Reshmi Kabab', price: 900, img: 'bbq.jpg' },
            { id: 15, name: 'BBQ Platter', price: 2500, img: 'bbq.jpg' },
        ],
        'maincourse': [
            { id: 6, name: 'Chicken Karahi', price: 1200, img: 'maincourse.jpeg' },
            { id: 7, name: 'Mutton Handi', price: 1800, img: 'maincourse.jpeg' },
            { id: 8, name: 'Daal Makhni', price: 600, img: 'maincourse.jpeg' },
            { id: 9, name: 'Mix Veg', price: 550, img: 'maincourse.jpeg' },
            { id: 10, name: 'Paneer Reshmi', price: 850, img: 'maincourse.jpeg' },
        ],
        'bbq': [
            { id: 11, name: 'Chicken Tikka', price: 450, img: 'bbq.jpg' },
            { id: 12, name: 'Seekh Kabab', price: 600, img: 'bbq.jpg' },
            { id: 13, name: 'Malai Boti', price: 800, img: 'bbq.jpg' },
            { id: 14, name: 'Behari Kabab', price: 900, img: 'bbq.jpg' },
            { id: 15, name: 'Fish BBQ', price: 1100, img: 'bbq.jpg' },
        ],
        'rice': [
            { id: 16, name: 'Chicken Biryani', price: 400, img: 'biryani.jpeg' },
            { id: 17, name: 'Egg Fried Rice', price: 550, img: 'biryani.jpeg' },
            { id: 18, name: 'Pulao Kabab', price: 500, img: 'biryani.jpeg' },
            { id: 19, name: 'Singaporean Rice', price: 850, img: 'biryani.jpeg' },
            { id: 20, name: 'Masala Rice', price: 350, img: 'biryani.jpeg' },
        ],
        'karahi': [
            { id: 21, name: 'White Karahi', price: 1400, img: 'karahi.jpg' },
            { id: 22, name: 'Shinwari Karahi', price: 1500, img: 'karahi.jpg' },
            { id: 23, name: 'Butter Karahi', price: 1600, img: 'karahi.jpg' },
            { id: 24, name: 'Desi Murgh', price: 2200, img: 'karahi.jpg' },
            { id: 25, name: 'Peshawari Karahi', price: 1350, img: 'karahi.jpg' },
        ],
        'drinks': [
            { id: 26, name: 'Pepsi 1.5L', price: 250, img: 'drinks.jpg' },
            { id: 27, name: 'Fresh Lime', price: 150, img: 'drinks.jpg' },
            { id: 28, name: 'Mineral Water', price: 80, img: 'drinks.jpg' },
            { id: 29, name: 'Mint Margarita', price: 350, img: 'drinks.jpg' },
            { id: 30, name: 'Mango Shake', price: 300, img: 'drinks.jpg' },
        ],
        'tandoor': [
            { id: 31, name: 'Rogni Naan', price: 60, img: 'roti.jpg' },
            { id: 32, name: 'Garlic Naan', price: 100, img: 'roti.jpg' },
            { id: 33, name: 'Plain Roti', price: 25, img: 'roti.jpg' },
            { id: 34, name: 'Kulcha', price: 50, img: 'roti.jpg' },
            { id: 35, name: 'Aloo Naan', price: 150, img: 'roti.jpg' },
        ],
        'desserts': [
            { id: 36, name: 'Gulab Jamun', price: 200, img: 'sweet.jpg' },
            { id: 37, name: 'Kheer', price: 250, img: 'sweet.jpg' },
            { id: 38, name: 'Ice Cream', price: 300, img: 'sweet.jpg' },
            { id: 39, name: 'Gajar Halwa', price: 400, img: 'sweet.jpg' },
            { id: 40, name: 'Custard', price: 220, img: 'sweet.jpg' },
        ]
    };

    return (
        <div className="home-container">
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setShowModal(false)}>✖</button>
                        <div className="logo-circle-modal"><img src="logo2.jpeg" alt="Logo" /></div>
                        <h3>Select your order type</h3>
                        <div className="order-type-tabs">
                            <button className="active">DELIVERY</button>
                            <button>PICK-UP</button>
                        </div>
                        <input type="text" className="modal-input" placeholder="Enter Street / Colony / Area" />
                       {/* Yahan Alert wala function call ho raha hai */}
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
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            <header className="slider-container">
                <div className="slides">
                    <div className="slide"><img src="ss1.jpeg" alt="S1" /></div>
                    <div className="slide"><img src="s2.jpeg" alt="S2" /></div>
                    <div className="slide"><img src="ss3.jpeg" alt="S3" /></div>
                    <div className="slide"><img src="ss4.jpeg" alt="S4" /></div>
                    <div className="slide"><img src="ss1.jpeg" alt="S1" /></div>
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

            {/* Ye wo section hai jo click par nazar aayega */}
            <div ref={itemsRef}>
                {selectedCategory && (
                    <section className="further-items">
                        <h2 className="section-title" style={{color: '#a04000'}}>
                            Top 5 {categories.find(c => c.id === selectedCategory)?.name}
                        </h2>
                        <div className="items-row">
                            {(categoryDetails[selectedCategory] || []).map((item) => (
                                <div key={item.id} className="item-card">
                                    <img src={item.img} alt={item.name} />
                                    <h4>{item.name}</h4>
                                    <p>Rs. {item.price}</p>
                                    <button className="add-cart-btn">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                        <div className="view-all-container">
                            <button className="view-all-btn" onClick={() => navigate('/full-menu')}>VIEW ALL MENU</button>
                        </div>
                    </section>
                )}
            </div>

            <div className="sticky-checkout-bar">
                <div className="checkout-info">🛒 Items: 0 | Total: Rs. 0</div>
                <button className="checkout-btn">CHECKOUT NOW</button>
            </div>
        </div>
    );
};

export default Home;