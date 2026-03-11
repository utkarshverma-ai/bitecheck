import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, ShieldCheck, Zap, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const {
        product_name,
        image_front_small_url,
        image_front_url,
        categories,
        nutrition_grades,
        id,
        code
    } = product;

    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const nutritionColor = (grade) => {
        switch (grade?.toLowerCase()) {
            case 'a': return 'bg-emerald-500 text-white';
            case 'b': return 'bg-lime-500 text-white';
            case 'c': return 'bg-yellow-500 text-black';
            case 'd': return 'bg-orange-500 text-white';
            case 'e': return 'bg-red-500 text-white';
            default: return 'bg-gray-100 text-gray-400';
        }
    };

    const productId = code || id;

    return (
        <Link
            to={`/product/${productId}`}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                {image_front_url || image_front_small_url ? (
                    <img
                        src={image_front_url || image_front_small_url}
                        alt={product_name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="text-gray-300 flex flex-col items-center gap-2">
                        <Zap size={48} />
                        <span className="text-xs font-medium uppercase tracking-widest">No Image</span>
                    </div>
                )}
                {nutrition_grades && (
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold uppercase shadow-lg ${nutritionColor(nutrition_grades)}`}>
                        {nutrition_grades}
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest truncate">
                            {categories?.split(',')[0] || 'Uncategorized'}
                        </p>
                        {code && (
                            <span className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                #{code}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                        {product_name || 'Generic Product'}
                    </h3>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className={`mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-2xl transition-all duration-300 
                        ${added
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                        }`}
                >
                    {added ? (
                        <>
                            <Check size={16} />
                            Added!
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={16} />
                            Add to Cart
                        </>
                    )}
                </button>

                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-2">
                        <Leaf size={16} className="text-emerald-500" />
                        <ShieldCheck size={16} className="text-blue-500" />
                    </div>
                    <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={20} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
