import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

const FullMenu = () => {
    // Ye wahi data hai jo Home mein tha, lekin yahan sab categories ek saath dikhengi
    const fullMenuData = [
        {
            category: "Appetizers",
            items: [
                { id: 1, name: 'Samosa Chat', price: 300, img: 'pasta.jpeg' },
                { id: 2, name: 'Spring Rolls', price: 370, img: 'pasta.jpeg' },
                { id: 3, name: 'French Fries', price: 440, img: 'pasta.jpeg' },
                { id: 4, name: 'Chicken Wings', price: 510, img: 'pasta.jpeg' },
                { id: 5, name: 'Garlic Bread', price: 580, img: 'pasta.jpeg' },
            ]
        },
        {
            category: "Main Course",
            items: [
                { id: 6, name: 'Chicken Karahi', price: 1200, img: 'maincourse.jpeg' },
                { id: 7, name: 'Mutton Handi', price: 1800, img: 'maincourse.jpeg' },
                { id: 8, name: 'Daal Makhni', price: 600, img: 'maincourse.jpeg' },
            ]
        },
        {
            category: "Rice & Biryani",
            items: [
                { id: 16, name: 'Chicken Biryani', price: 400, img: 'biryani.jpeg' },
                { id: 17, name: 'Egg Fried Rice', price: 550, img: 'biryani.jpeg' },
            ]
        }
        // Aap isi tarah baqi categories (BBQ, Drinks etc.) bhi yahan add kar sakti hain
    ];

    return (
        <div className="full-menu-page">
            {/* Header Section */}
            <header className="full-menu-header">
                <Link to="/home" className="back-to-home">← Back to Home</Link>
                <h1>Our Complete Menu</h1>
                <p>Freshly prepared Punjabi heritage dishes</p>
            </header>

            {/* Menu List Section */}
            <div className="full-menu-container">
                {fullMenuData.map((section, index) => (
                    <div key={index} className="full-menu-section">
                        <h2 className="category-title">{section.category}</h2>
                        <div className="full-items-grid">
                            {section.items.map(item => (
                                <div key={item.id} className="menu-item-card">
                                    <img src={item.img} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>Rs. {item.price}</p>
                                        <button className="add-btn-small">Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Checkout Bar (Optional: same as home) */}
            <div className="sticky-checkout-bar">
                <div className="checkout-info">🛒 Items in Cart: 0 | Total: Rs. 0</div>
                <button className="checkout-btn">CHECKOUT NOW</button>
            </div>
        </div>
    );
};

export default FullMenu;