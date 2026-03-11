import axios from 'axios';

const BASE_URL = '';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Simple Retry Interceptor
api.interceptors.response.use(undefined, async (err) => {
    const { config, response } = err;
    if (!config || !config.retry) return Promise.reject(err);

    if (response && response.status >= 400 && response.status < 500) {
        return Promise.reject(err); // Don't retry client errors
    }

    config.retryCount = config.retryCount || 0;
    if (config.retryCount >= config.retry) {
        return Promise.reject(err);
    }

    config.retryCount += 1;
    const backoff = new Promise((resolve) => {
        setTimeout(() => resolve(), config.retryDelay || 1000);
    });

    await backoff;
    return api(config);
});

export const fetchProducts = async ({ search = '', category = '', sort = '', page = 1 }) => {
    try {
        // We use search.pl for all list queries because it supports complex field filtering and sorting better
        let url = `/cgi/search.pl?json=true&page=${page}&page_size=24`;

        // Handle Search Term
        // If no search and no category, we default to 'popular' to show something on home
        const searchTerm = (!search && !category) ? 'popular' : search;
        if (searchTerm) {
            url += `&search_terms=${encodeURIComponent(searchTerm)}`;
        }

        // Handle Category Filter
        // tagtype_0=categories & tag_contains_0=contains & tag_0=category_name
        if (category) {
            url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}`;
        }

        // Handle Sorting
        // sort_by=field_name
        if (sort) {
            url += `&sort_by=${encodeURIComponent(sort)}`;
        }

        const response = await api.get(url, { retry: 2, retryDelay: 2000 });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductByBarcode = async (barcode) => {
    try {
        const response = await api.get(`/api/v0/product/${barcode}.json`, { retry: 1 });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with barcode ${barcode}:`, error);
        throw error;
    }
};

export const SORT_OPTIONS = [
    { label: 'Popularity', value: 'unique_scans_n' },
    { label: 'Product Name (A-Z)', value: 'product_name' },
    { label: 'Product Name (Z-A)', value: '-product_name' },
    { label: 'Nutrition Grade (Best)', value: 'nutrition_grades' },
    { label: 'Nutrition Grade (Worst)', value: '-nutrition_grades' },
];

export const CATEGORIES = [
    { label: 'All Categories', value: '' },
    { label: 'Beverages', value: 'beverages' },
    { label: 'Dairy', value: 'dairy' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Breakfast', value: 'breakfast' },
];
