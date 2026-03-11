import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Leaf, Heart, Globe, Search, Database } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                        <Globe size={14} />
                        Our Mission
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                        Empowering <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                            Food Transparency.
                        </span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed">
                        BiteCheck was born from a simple idea: everyone deserves to know exactly what's in the food they eat. We provide the tools to make healthier, more informed choices.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <section className="space-y-6 bg-gray-50/50 p-10 rounded-[40px] border border-gray-100">
                        <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <Database size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Powered by the Community</h2>
                        <p className="text-gray-600 leading-relaxed">
                            BiteCheck leverages the <strong>Open Food Facts</strong> database, a free, open-source collaborative project. It's like Wikipedia for food products, maintained by thousands of volunteers worldwide.
                        </p>
                    </section>

                    <section className="space-y-6 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
                            <ShieldCheck size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Health First</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We simplify complex nutritional data into easy-to-understand insights, including Nutri-Scores, Eco-Scores, and detailed ingredient breakdowns.
                        </p>
                    </section>
                </div>

                <section className="text-center space-y-12 py-12">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Core Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Search />, label: 'Deep Search' },
                            { icon: <Leaf />, label: 'Eco Insights' },
                            { icon: <Heart />, label: 'Nutri-Scores' },
                            { icon: <Globe />, label: 'Global Data' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    {React.cloneElement(feature.icon, { size: 24 })}
                                </div>
                                <span className="font-bold text-gray-800 text-sm">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
