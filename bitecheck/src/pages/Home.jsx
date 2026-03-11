import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { AlertCircle, ArrowUp, ShoppingBasket } from 'lucide-react';

const Home = () => {
  const { products, loading, error, loadMore, hasMore, searchQuery, category, refresh } = useProducts();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
              <ShoppingBasket size={16} />
              Food Product Explorer
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
            Know exactly what's <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              inside your food.
            </span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Search millions of food products to find detailed ingredients, nutrition facts, and labels with BiteCheck.
          </p>
        </header>

        <section className="mb-12">
          <SearchBar />
        </section>

        <section className="mb-12">
          <FilterPanel />
        </section>

        {error && (
          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center mb-12">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={() => refresh()}
              className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 inline-flex items-center gap-2 mx-auto"
            >
              <ArrowUp className="rotate-90" size={18} />
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-2">
            <Loader />
            {searchQuery && (
              <p className="text-gray-400 text-sm font-medium animate-pulse">
                Finding the best matches for "{searchQuery}"...
              </p>
            )}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <ShoppingBasket size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 italic">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {hasMore && products.length > 0 && !loading && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMore}
              className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black hover:scale-105 transition-all shadow-xl shadow-gray-200"
            >
              Load More Products
            </button>
          </div>
        )}

        {!hasMore && products.length > 0 && !loading && (
          <div className="mt-20 text-center">
            <p className="text-gray-400 font-medium tracking-widest text-xs uppercase">
              ✨ You've reached the end of the collection
            </p>
          </div>
        )}

      </main>

      <Footer />

      {/* Scroll to Top Mockup */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-900/40 hover:bg-emerald-700 transition-all hover:-translate-y-2 z-40"
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Home;