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
        { id: 'appetizers', name: 'Appetizers', img: 'appet.jpeg', count: '5 Items Available' },
        { id: 'maincourse', name: 'Main Course', img: 'maincourse.jpeg', count: 'Karahi & Handi & more' },
        { id: 'bfm', name: 'Breakfast Menu', img: 'bfm.jpeg', count: 'Fresh & Healthy Morning' },
        { id: 'rice', name: 'Rice & Biryani', img: 'menubiryani.jpeg', count: 'Long Grain Basmati' },
        { id: 'deals', name: 'Deals', img: 'deals.jpeg', count: 'Exclusive Bundles for You' },
        { id: 'drinks', name: 'Drinks', img: 'drink.jpeg', count: 'Fresh & Chilled' },
        { id: 'extra', name: 'Extras', img: 'extras.jpeg', count: 'Raita, Salad & More' },
        { id: 'desserts', name: 'Desserts', img: 'dessert.jpeg', count: 'Sweet Endings' }
    ];

    const categoryDetails = {
        'appetizers': [
        { 
            id: 1, 
            name: 'Chicken Nuggets', 
            price: 650, 
            description: 'Crispy golden bites of tender chicken.', 
            img: 'nuggets.jpeg' 
        },
        { 
            id: 2, 
            name: 'Chicken Pakora', 
            price: 399, 
            description: 'Juicy chicken pieces coated in spiced gram flour.', 
            img: 'chikenpkora.jpeg' 
        },
        { 
            id: 3, 
            name: 'Vegetable Pakora', 
            price: 299, 
            description: 'Mixed vegetables dipped in seasoned batter and fried to perfection.', 
            img: 'vegpakora.jpeg' 
        },
        { 
            id: 4, 
            name: 'Chicken Spring Rolls', 
            price: 350, 
            description: 'Crunchy rolls filled with flavorful chicken and fresh vegetables.', 
            img: 'roll.jpeg' 
        },
        { 
            id: 5, 
            name: 'Vegetable Spring Rolls', 
            price: 300, 
            description: 'Light and crispy rolls stuffed with seasoned vegetables.', 
            img: 'vegroll.jpeg' 
        },
    ],
        'maincourse': [
            { id: 6, name: 'Chicken Karahi', price: 1200, img: 'maincourse.jpeg' },
            { id: 7, name: 'Mutton Handi', price: 1800, img: 'maincourse.jpeg' },
            { id: 8, name: 'Daal Makhni', price: 600, img: 'maincourse.jpeg' },
            { id: 9, name: 'Mix Veg', price: 550, img: 'maincourse.jpeg' },
            { id: 10, name: 'Palak Paneer', price: 700, img: 'maincourse.jpeg' },
        ],
        'bfm': [
            { id: 11, name: 'Paya', price: 500, img: 'paya.jpeg', description:'Traditional slow-cooked trotters with naan' },
            { id: 12, name: 'Aloo Paratha ', price: 200, img: 'aloparatha.jpeg', description:'Paratha served with Raita' },
            { id: 13, name: 'Plain Paratha', price: 120, img: 'plainparatha.jpeg',description:'----'},
            { id: 14, name: 'Anda Paratha ', price: 180, img: 'andaparatha.jpeg', description:'Paratha with omelette' },
            { id: 15, name: 'Channy Kofty', price: 250, img: 'kofty.jpeg', description:'Traditionally cooked served along meat balls for classic taste' },
        ],
        'rice': [
            { id: 16, name: 'Chicken Biryani', price: 500, img: 'biryani.jpeg',description: 'A rich and flavorful spiced chicken and layered basmati rice.'},
            { id: 17, name: 'Egg Fried Rice', price: 550, img: 'eggrice.jpeg',description: 'Basmati rice with scrambled eggs, vegetables, and seasonings.' },
            { id: 18, name: 'Beef Pulao', price: 500, img: 'beefpulao.jpeg',description: 'Tender beef with aromatic spices and basmati rice for a traditional taste.' },
            { id: 19, name: 'Mutton Pulao', price: 500, img: 'muttonpulao.jpeg',description: 'Mutton cooked with fragrant rice in mild spices.' },
            { id: 20, name: 'Chicken Pulao', price: 400, img: 'chikenpulao.jpeg',description: 'Lightly spiced rice cooked with tender chicken.' },
        ],
        'deals': [
            { id: 21, name: 'Single Value Deal', price: 400, img: 'karahi.jpg' ,description:'Chicken Biryani + Raita + Salad + Soft Drink'},
            { id: 22, name: 'Family Deal', price: 0.00, img: 'karahi.jpg',description:'Chicken Karahi  + Beef Pulao (2 plates) + 4 Naan + Salad + 1.5L Drink' },
            { id: 23, name: 'Friends Combo', price: 0.00, img: 'karahi.jpg',description:'Chicken Biryani (2 plates) + Chicken Handi (Half) + 3 Naan + Raita' },
            { id: 24, name: 'Biryani Lover', price: 1100, img: 'karahi.jpg',description:'Chicken Biryani (2 plates) + Raita + Salad + 2 Drinks' },
            { id: 25, name: 'Economy Deal', price: 500, img: 'karahi.jpg',description:'Chicken Pulao (1 plate) + Raita + Drink(1L)' },
            { id: 26, name: 'Student Deal', price: 350, img: 'milkshake.jpeg',description:'Egg Fried Rice (Half plate)+ Drink' },
            { id: 27, name: 'Mini Family Deal', price: 1999, img: 'milkshake.jpeg',description:'Chicken Karahi (Half) + Chicken Biryani (2 plates) + 3 Naan + 1.5L Drink' },
            { id: 28, name: 'Desi Combo', price: 1299, img: 'milkshake.jpeg',description:'Chicken Qorma + Zeera Rice + 2 Naan + Salad+Raita+1L Drink' },
        ],
        'drinks': [
            { id: 29, name: 'Lassi', price: 150, img: 'lassi.jpeg', description: 'Sweet / Salted'},
            { id: 30, name: 'Cold Drink', price: '70/130/160', img: 'colddrink.jpeg',description:'----'},
            { id: 31, name: 'Mineral Water', price: '60/120', img: 'water.jpeg',description:'----'},
            { id: 32, name: 'Tea', price: 200, img: 'tea.jpeg',description:'----'},
            
        ],
        'extra': [
            { id: 33, name: 'Tndoori Naan', price: 30, img: 'naan.jpeg',description:'----' },
            { id: 34, name: 'Chapati/Roti', price: 30, img: 'roti.jpeg',description:'----' },
            { id: 35, name: 'Raita', price: 50, img: 'raita.jpeg',description:'----' },
            { id: 36, name: 'Salad', price: 60, img: 'salad.jpeg',description:'----' },
            { id: 37, name: 'Cold Drink', price: '70/130/170', img: 'colddrink.jpeg',description:'----' },
        ],
        'desserts': [
            { id: 38, name: 'Gulab Jamun', price: 150, img: 'gulabjamun.jpeg',description:'----' },
            { id: 39, name: 'Kheer', price: 200, img: 'kheer.jpeg',description:'----' },
            { id: 40, name: 'Zarda Rice', price: 200, img: 'zarda.jpeg',description:'----' },
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

                                    {/* DESCRIPTION LOGIC: Agar khali hai ya ---- hai to hide ho jaye */}
                                    {item.description && item.description !== '----' && (
                                        <p className="description" style={{fontSize: '12px', color: '#666', minHeight: '30px'}}>
                                            {item.description}
                                        </p>
                                    )}
            
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