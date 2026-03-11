import React, { useState } from 'react';
import { Search, Barcode, Loader2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { fetchProductByBarcode } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { setSearchQuery, loading } = useProducts();
  const [localSearch, setLocalSearch] = useState('');
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleBarcodeSearch = async (e) => {
    e.preventDefault();
    if (!barcodeSearch) return;

    setIsScanning(true);
    try {
      const data = await fetchProductByBarcode(barcodeSearch);
      if (data.status === 1) {
        navigate(`/product/${barcodeSearch}`);
      } else {
        alert('Product not found with this barcode.');
      }
    } catch (err) {
      alert('Error searching by barcode.');
    } finally {
      setIsScanning(false);
      setBarcodeSearch('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search food products by name..."
          className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 hover:bg-emerald-50/10 hover:border-emerald-200 transition-all outline-none text-gray-700 shadow-sm hover:shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        />
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors ${loading ? 'animate-pulse text-emerald-500' : ''}`} size={20} />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/20 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <div className="h-px bg-gray-100 flex-1"></div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or track by barcode</span>
        <div className="h-px bg-gray-100 flex-1"></div>
      </div>

      <form onSubmit={handleBarcodeSearch} className="relative max-w-sm mx-auto group">
        <input
          type="text"
          value={barcodeSearch}
          onChange={(e) => setBarcodeSearch(e.target.value)}
          placeholder="Enter Barcode (e.g. 3017620422003)"
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-50/50 focus:border-emerald-400 transition-all outline-none text-sm text-gray-700 font-mono"
        />
        <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={18} />
        <button
          type="submit"
          disabled={isScanning}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-black transition-colors disabled:opacity-50"
        >
          {isScanning ? 'Checking...' : 'Go'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;