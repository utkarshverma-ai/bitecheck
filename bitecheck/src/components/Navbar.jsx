import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Info, Home as HomeIcon, ShoppingCart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { resetFilters } = useProducts();
    const { cartCount } = useCart();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <NavLink to="/" onClick={resetFilters} className="flex items-center gap-2 group">
                        <div className="bg-emerald-600 text-white p-1.5 rounded-lg group-hover:bg-emerald-700 transition-colors">
                            <Search size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                            BiteCheck
                        </span>
                    </NavLink>

                    <div className="flex gap-2 items-center">
                        <NavLink
                            to="/"
                            onClick={resetFilters}
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-2 rounded-xl ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'}`
                            }
                        >
                            <HomeIcon size={18} />
                            Home
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-2 rounded-xl ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'}`
                            }
                        >
                            <Info size={18} />
                            About
                        </NavLink>

                        {/* Cart Link */}
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `relative flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-2 rounded-xl ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'}`
                            }
                        >
                            <ShoppingCart size={18} />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
