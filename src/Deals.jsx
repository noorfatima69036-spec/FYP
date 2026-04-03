import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './Style.css';

const Deals = () => {
    const { addToCart } = useCart();

    const dealsData = [
        { id: 101, name: "Deal 1: Single Value Deal", price: 499, description: "Chicken Biryani + Raita + Salad + Soft Drink", img: "/deal1.jpeg" },
        { id: 102, name: "Deal 2: Family Deal", price: 2800, description: "Chicken Karahi  + Beef Pulao (2 plates) + 4 Naan + Salad + 1.5L Drink", img: "/deal2.jpeg" },
        { id: 103, name: "Deal 3: Friends Combo", price: 1100, description: "Chicken Biryani (2 plates) + Chicken Handi (Half) + 3 Naan + Raita+1L Drink", img: "/deal3.jpeg" },
        { id: 104, name: "Deal 4: Biryani Lover ", price: 1100, description: "Chicken Biryani (2 plates) + Raita + Salad + 2 Drinks", img: "/deal4.jpeg" },
        { id: 105, name: "Deal 5: Economy Dea", price: 500, description: "Chicken Pulao (1 plate) + Raita + Drink(1L)", img: "/deal5.jpeg" },
        { id: 106, name: "Deal 6: Student Deal", price: 350, description: "Egg Fried Rice (Half plate)+ Drink", img: "/deal6.jpeg" },
        { id: 107, name: "Deal 7: Mini Family Deal", price: 1900, description: "Chicken Karahi (Half) + Chicken Biryani (2 plates) + 3 Naan+Raita+Salad + 1.5L Drink", img: "/deal7.jpeg" },
        { id: 108, name: "Deal 8: Desi Combo", price: 2400, description: "Chicken Qorma + Zeera Rice + 4 Naan + Salad+Raita+1L Drink", img: "/deal8.jpeg" },
    ];

    return (
        <div className="deals-page-container">
            {/* --- Header with Back Option --- */}
            <div className="deals-header-section">
                <Link to="/home" className="back-home-link">← Back to Home</Link>
                <h1 className="deals-main-title">Dastr-Khwan Special Deals</h1>
            </div>
            
            <div className="deals-split-layout">
                {/* --- Left Side: Line by Line Deals --- */}
                <div className="deals-list-column">
                    {dealsData.map((deal) => (
                        <div key={deal.id} className="deal-list-item">
                            <h3>{deal.name}</h3>
                            <p>{deal.description}</p>
                            <span className="price-tag">Rs. {deal.price}</span>
                            <button 
                                onClick={() => {
                                    addToCart(deal);
                                    alert(`${deal.name} added to cart!`); // Feedback ke liye
                                }} 
                                className="home-style-btn"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* --- Right Side: Zig-Zag Pictures --- */}
                <div className="deals-zigzag-images-column">
                    {dealsData.map((deal, index) => (
                        <div key={deal.id} className={`image-wrapper ${index % 2 === 0 ? 'move-left' : 'move-right'}`}>
                            <img src={deal.img} alt={deal.name} className="deal-circle-img" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deals;