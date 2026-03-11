import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.code === product.code);
            if (exists) {
                // If already in cart, increase quantity
                return prev.map(item =>
                    item.code === product.code
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productCode) => {
        setCartItems(prev => prev.filter(item => item.code !== productCode));
    };

    const updateQuantity = (productCode, quantity) => {
        if (quantity <= 0) return removeFromCart(productCode);
        setCartItems(prev =>
            prev.map(item =>
                item.code === productCode ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};