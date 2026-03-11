import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { fetchProductByBarcode } from '../services/api';
import { ChevronLeft, Info, Leaf, ShieldCheck, Zap, Activity, CheckCircle2 } from 'lucide-react';
import Barcode from 'react-barcode';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProductByBarcode(id);
                if (data.status === 1) {
                    setProduct(data.product);
                } else {
                    setError('Product not found.');
                }
            } catch (err) {
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-white"><Navbar /><Loader /></div>;

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <div className="bg-red-50 text-red-700 p-8 rounded-3xl inline-block">
                        <h2 className="text-2xl font-bold mb-2">Error</h2>
                        <p>{error || 'Product not found'}</p>
                        <Link to="/" className="mt-4 inline-block text-emerald-600 font-bold hover:underline">
                            Back to search
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const {
        product_name,
        image_front_url,
        ingredients_text,
        nutriments,
        labels,
        nutrition_grades,
        categories,
        brands,
        code
    } = product;

    return (
        <div className="min-h-screen bg-gray-50/30">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-semibold mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Explorer
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 mb-12">
                    <div className="bg-gray-50 rounded-3xl p-12 flex items-center justify-center h-fit">
                        {image_front_url ? (
                            <img src={image_front_url} alt={product_name} className="max-h-[500px] w-auto object-contain transition-transform hover:scale-105 duration-700" />
                        ) : (
                            <div className="text-gray-300 flex flex-col items-center gap-4">
                                <Zap size={80} strokeWidth={1} />
                                <span className="text-sm font-bold tracking-widest uppercase">No Visual Data</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-10">
                        <header className="space-y-4">
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">
                                    {brands || 'Unknown Brand'}
                                </span>
                                {nutrition_grades && (
                                    <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md ${nutrition_grades === 'a' ? 'bg-emerald-500 text-white' :
                                            nutrition_grades === 'b' ? 'bg-lime-500 text-white' :
                                                nutrition_grades === 'c' ? 'bg-yellow-500 text-black' :
                                                    nutrition_grades === 'd' ? 'bg-orange-500 text-white' :
                                                        'bg-red-500 text-white'
                                        }`}>
                                        Nutri-Score {nutrition_grades}
                                    </span>
                                )}
                                {code && (
                                    <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                        Barcode: {code}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
                                {product_name || 'Generic Food Product'}
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-400 text-sm font-medium">
                                    Category: {categories?.split(',')[0] || 'Uncategorized'}
                                </p>
                                {code && (
                                    <div className="mt-2 bg-white p-2 rounded-xl border border-gray-100 w-fit shadow-sm">
                                        <Barcode 
                                            value={code} 
                                            width={1.2} 
                                            height={40} 
                                            fontSize={12}
                                            margin={0}
                                            background="transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        </header>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                                <Info size={22} className="text-emerald-600" />
                                Ingredients
                            </div>
                            <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 italic">
                                {ingredients_text || 'Ingredient information currently unavailable for this product.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                                <Activity size={22} className="text-emerald-600" />
                                Nutritional Values (per 100g)
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { label: 'Energy', val: nutriments?.energy_value || 0, unit: nutriments?.energy_unit || 'kcal', color: 'bg-emerald-50' },
                                    { label: 'Fat', val: nutriments?.fat_value || 0, unit: 'g', color: 'bg-blue-50' },
                                    { label: 'Proteins', val: nutriments?.proteins_value || 0, unit: 'g', color: 'bg-orange-50' },
                                    { label: 'Sugar', val: nutriments?.sugars_value || 0, unit: 'g', color: 'bg-red-50' }
                                ].map((item) => (
                                    <div key={item.label} className={`${item.color} p-4 rounded-2xl flex flex-col items-center justify-center text-center`}>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase mb-1">{item.label}</span>
                                        <span className="text-xl font-black text-gray-900">{item.val}</span>
                                        <span className="text-[10px] font-bold text-gray-400">{item.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-4 text-center">
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-900 justify-start">
                                <CheckCircle2 size={22} className="text-emerald-600" />
                                Dietary Labels
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {labels ? labels.split(',').map((label, idx) => (
                                    <span key={idx} className="flex items-center gap-1.5 bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                                        <Leaf size={14} className="text-emerald-500" />
                                        {label.trim()}
                                    </span>
                                )) : (
                                    <span className="text-gray-400 text-sm italic">No specific labels found.</span>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;
