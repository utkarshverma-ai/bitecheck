import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

    if (cartCount === 0) return (
        <>
            <Navbar />
            <div className="text-center py-20 text-gray-400 text-lg">Your cart is empty 🛒</div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount} items)</h1>
                {cartItems.map(item => (
                    <div key={item.code} className="flex items-center gap-4 border-b py-4">
                        <img src={item.image_front_small_url} alt={item.product_name} className="w-16 h-16 object-contain" />
                        <div className="flex-1">
                            <p className="font-semibold">{item.product_name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <button onClick={() => updateQuantity(item.code, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.code, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                            </div>
                        </div>
                        <button onClick={() => removeFromCart(item.code)} className="text-red-500 text-sm">Remove</button>
                    </div>
                ))}
                <button onClick={clearCart} className="mt-6 text-sm text-gray-500 underline">Clear Cart</button>
            </div>
        </>
    );
};

export default Cart;