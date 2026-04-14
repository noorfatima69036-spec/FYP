import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        navigate('/checkout');
    } else {
        alert("Bagair login ke order place nahi ho sakta. Pehle login karein.");
        navigate('/login');
    }
};

    // add useEffect for AUTOMATIC CALCULATION HO 
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            // Price ko number mein convert karein taake calculation sahi ho
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            return acc + (price * quantity);
        }, 0);
        
        setTotalPrice(total);
    }, [cartItems]); // Jab bhi cartItems change honge, total khud update hoga

    // Item add karne ka function
    const addToCart = (product) => {
        console.log("Items are being added:", product.name);
        setCartItems((prevItems) => {
            const isItemInCart = prevItems.find((item) => item.id === product.id);
            if (isItemInCart) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);