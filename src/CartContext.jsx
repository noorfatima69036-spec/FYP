import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Item add karne ka function
    const addToCart = (product) => {
        console.log("Item add ho raha hai:", product.name); // Ye line add karein
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

    // Total price calculate karne ke liye
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);