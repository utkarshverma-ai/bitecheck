import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('unique_scans_n');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadProducts = useCallback(async (isNextPage = false) => {
        setLoading(true);
        setError(null);
        try {
            const currentPage = isNextPage ? page + 1 : 1;

            const data = await fetchProducts({
                search: searchQuery,
                category,
                sort,
                page: currentPage
            });

            // Ensure data is valid JSON and has products
            if (!data || typeof data !== 'object' || !Array.isArray(data.products)) {
                console.error('Invalid API response:', data);
                throw new Error('Could not retrieve product list.');
            }

            const newProducts = data.products || [];

            if (isNextPage) {
                setProducts(prev => [...prev, ...newProducts]);
                setPage(currentPage);
            } else {
                setProducts(newProducts);
                setPage(1);
            }

            setHasMore(newProducts.length > 0);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to fetch products. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [searchQuery, category, sort, page]);

    // Initial load or filter change
    useEffect(() => {
        loadProducts(false);
    }, [searchQuery, category, sort]);

    const loadMore = () => {
        if (!loading && hasMore) {
            loadProducts(true);
        }
    };

    const refresh = () => loadProducts(false);

    const resetFilters = () => {
        setSearchQuery('');
        setCategory('');
        setSort('unique_scans_n');
    };

    const value = {
        products,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
        sort,
        setSort,
        loadMore,
        hasMore,
        refresh,
        resetFilters
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};


export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
