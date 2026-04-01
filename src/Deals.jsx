import React, { useState } from 'react';
import { useCart } from './CartContext'; // Cart logic ke liye
import { Link } from 'react-router-dom'; // Home par jane ke liye
import './Style.css'; // Apni CSS file import karein

const Deals = () => {
    // 1. useCart() se data nikaalein (taake deals cart mein add hon sakain)
    const { addToCart } = useCart();

    // 2. Deals ka Data (Hamein 4 deals chahiye, kyunke picture mein 4 circles hain)
    const dealsData = [
        { id: 101, name: "Deal 1: Student Platter", price: 499, description: "Includes Chicken Nuggets, Fries & Drink", img: "/student.jpeg" },
        { id: 102, name: "Deal 2: Family Feast", price: 2999, description: "Includes Karahi, Pulao, Kababs & Drink", img: "/family.jpeg" },
        { id: 103, name: "Deal 3: BBQ Combo", price: 850, description: "Includes Seekh Kabab, Tikka & Naan", img: "/bbq.jpeg" },
        { id: 104, name: "Deal 4: Sweet Tooth", price: 350, description: "Includes Kheer or Gulab Jamun", img: "/dessert.jpeg" },
    ];

    return (
        <div className="deals-page-wrapper">
            {/* Header Section */}
            <div className="deals-header">
                <Link to="/home" className="deals-back-btn">← Back to Home</Link>
                <h1>Current Deals</h1>
                <p>Enjoy our special heritage cuisine bundles!</p>
            </div>

            {/* Layout Container: Iske andar logic aur images ko merge karenge */}
            <div className="deals-grid-layout">
                
                {/* 3. Side Wise Deals List (Picture ka Left Side) */}
                <div className="deals-text-section">
                    {dealsData.map((deal) => (
                        <div key={deal.id} className="deal-text-card">
                            <h3>{deal.name}</h3>
                            <p>{deal.description}</p>
                            <span className="deal-price">Rs. {deal.price}</span>
                            
                            {/* 4. Add to Cart Button (Logic already working hai!) */}
                            <button 
                                className="add-deal-btn" 
                                onClick={() => addToCart(deal)}
                            >
                                Add Deal
                            </button>
                        </div>
                    ))}
                </div>

                {/* 5. Circular Pics Section (Picture ka Right Side) */}
                <div className="deals-images-section">
                    {dealsData.map((deal) => (
                        <div key={deal.id} className="deal-circle-wrapper">
                            <img 
                                src={deal.img} 
                                alt={deal.name} 
                                className="deal-circle-pic" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deals;