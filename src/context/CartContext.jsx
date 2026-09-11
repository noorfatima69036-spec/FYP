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
        alert("An order cannot be placed without logging in. Please log in first.");
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
    // portionType: 'full' ya 'half' - default 'full' rakha hai taake purani jagah se call ho to na toote
    const addToCart = (product, portionType = 'full') => {
        // Selected portion ke hisaab se sahi price nikal rahe hain
        const unitPrice = portionType === 'half'
            ? Number(product.price_half)
            : Number(product.price_full);

        console.log("Items are being added:", product.name, "-", portionType);

        setCartItems((prevItems) => {
            // Match ab id AND portion_type dono se hoga
            // taake "Full" aur "Half" ek hi dish ke alag cart rows banein
            const isItemInCart = prevItems.find(
                (item) => item.id === product.id && item.portion_type === portionType
            );

            if (isItemInCart) {
                return prevItems.map((item) =>
                    (item.id === product.id && item.portion_type === portionType)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prevItems,
                {
                    ...product,
                    portion_type: portionType,
                    price: unitPrice, // isi price se totalPrice calculate hota hai
                    quantity: 1
                }
            ];
        });
    };
    // Item ko cart se completely remove karne ka function
const removeFromCart = (itemId, portionType) => {
    setCartItems((prevItems) =>
        prevItems.filter(
            (item) => !(item.id === itemId && item.portion_type === portionType)
        )
    );
};


    return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, setCartItems }}>
        {children}
    </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);
