import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import { useCart } from './CartContext';

const FullMenu = () => {
             const { cartItems, totalPrice, addToCart } = useCart();
    // This is the same data that was on the Home screen, but here all categories will be shown together.

    const fullMenuData = [
        {
            category: "Appetizers",
            items: [
                { id: 1, name: 'Chicken Nuggets', price: 650, img: 'nuggets.jpeg'  },
                { id: 2, name: 'Chicken Pakora', price: 399, img: 'chikenpkora.jpeg' },
                { id: 3, name: 'Vegetable Pakora', price: 299, img: 'vegpakora.jpeg' },
                { id: 4, name: 'Chicken Spring Rolls', price: 350, img: 'roll.jpeg' },
                { id: 5, name: 'Vegetable Spring Rolls', price: 300, img: 'vegroll.jpeg' },
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
                { id: 9, name: 'Chicken Biryani', price: 500, img: 'biryani.jpeg' },
                { id: 10, name: 'Egg Fried Rice', price: 550, img: 'eggrice.jpeg'},
                { id: 11, name: 'Beef Pulao', price: 500, img: 'beefpulao.jpeg'},
                { id: 12, name: 'Mutton Pulao', price: 500, img: 'muttonpulao.jpeg'},
                { id: 13, name: 'Chicken Pulao', price: 400, img: 'chikenpulao.jpeg'},
            ]
        },
        {
            category: "Breakfast Menu",
            items: [
                { id: 14, name: 'Aloo Paratha ', price: 200, img: 'aloparatha.jpeg'},
                { id: 15, name: 'Plain Paratha', price: 120, img: 'plainparatha.jpeg'},
                { id: 16, name: 'Anda Paratha ', price: 180, img: 'andaparatha.jpeg'},
                { id: 17, name: 'Channy Kofty', price: 250, img: 'kofty.jpeg' },
                { id: 18, name: 'Paya', price: 500, img: 'paya.jpeg'},
            ]
        },
        {
            category: "Drinks",
            items: [
                { id: 19, name: 'Lassi', price: 150, img: 'lassi.jpeg'},
                { id: 20, name: 'Cold Drink', price: '70/130/160', img: 'colddrink.jpeg'},
                { id: 21, name: 'Mineral Water', price: '60/120', img: 'water.jpeg'},
                { id: 22, name: 'Tea', price: 200, img: 'tea.jpeg'},
            ]
        },
        {
            category: "Extras",
            items: [
                { id: 23, name: 'Tndoori Naan', price: 30, img: 'naan.jpeg' },
                { id: 24, name: 'Chapati/Roti', price: 30, img: 'roti.jpeg' },
                { id: 25, name: 'Raita', price: 50, img: 'raita.jpeg' },
                { id: 26, name: 'Salad', price: 60, img: 'salad.jpeg' },
                { id: 27, name: 'Cold Drink', price: '70/130/170', img: 'colddrink.jpeg' },
            ]
        },
        {
            category: "Desserts",
            items: [
            { id: 28, name: 'Gulab Jamun', price: 150, img: 'gulabjamun.jpeg' },
            { id: 29, name: 'Kheer', price: 200, img: 'kheer.jpeg' },
            { id: 30, name: 'Zarda Rice', price: 200, img: 'zarda.jpeg' },
            ]
        }
        // Add extra items here
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

                                        {/* ---For DESCRIPTION--- */}
                                        <p className="description">{item.description}</p>
                                        
                                        <button className="add-btn-small" onClick={() => addToCart(item)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Checkout Bar (Optional: same as home) */}
            <div className="sticky-checkout-bar">
                <div className="checkout-info">🛒 Items in Cart: {cartItems.length} | Total: Rs. {totalPrice}</div>
                {/* wrap button like this */}
             <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <button className="checkout-btn">CHECKOUT NOW</button>
             </Link>
            </div>
        </div>
    );
};

export default FullMenu;