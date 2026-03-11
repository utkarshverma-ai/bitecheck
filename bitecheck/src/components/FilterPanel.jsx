import React from 'react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES, SORT_OPTIONS } from '../services/api';
import { Filter, SortAsc } from 'lucide-react';

const FilterPanel = () => {
    const { category, setCategory, sort, setSort } = useProducts();

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50 p-4 rounded-3xl border border-gray-100/50">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 text-gray-500 min-w-max">
                    <Filter size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Category</span>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 hover:bg-emerald-50/30 hover:border-emerald-200 outline-none transition-all w-full md:w-48 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 text-gray-500 min-w-max">
                    <SortAsc size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Sort By</span>
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 hover:bg-emerald-50/30 hover:border-emerald-200 outline-none transition-all w-full md:w-48 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;
