# 🌿 BiteCheck

A modern food product explorer web app that lets users search, filter, and explore food products with detailed nutrition information — powered by the Open Food Facts API.

🔗 **Live Demo:** 
[https://bitecheck-nine.vercel.app/](https://bitecheck-nine.vercel.app/)

---

## ✨ Features

- 🔍 **Search** food products by name in real time
- 🗂️ **Filter** by category (Beverages, Dairy, Snacks, Breakfast, etc.)
- 📊 **Sort** by popularity, product name (A-Z / Z-A), or nutrition grade
- 🏷️ **Nutrition Grade badges** (A to E) with color-coded indicators
- 📦 **Product Detail page** with full product info and barcode
- 🛒 **Cart functionality** — add/remove products, update quantities, live cart count in navbar
- ♾️ **Infinite scroll** — load more products as you scroll
- 📱 **Fully responsive** — works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests with retry logic |
| Lucide React | Icons |
| Open Food Facts API | Product data source |

---

## 🧠 Approach & Method

### State Management
- Used **React Context API** for global state — two separate contexts:
  - `ProductContext` — manages product list, search, filters, sorting, and pagination
  - `CartContext` — manages cart items, quantities, add/remove/clear operations
- Chose Context API over Redux to keep the app lightweight and simple

### API Integration
- Integrated the **Open Food Facts public API** via a custom `api.js` service built on Axios
- Used the `search.pl` endpoint for all product list queries as it supports field filters and sorting
- Implemented an **automatic retry interceptor** (2 retries with 2s backoff) for resilience
- Category filtering done via tag-based query params (`tagtype_0`, `tag_contains_0`, `tag_0`)

### Performance
- **Infinite scroll** with pagination (`page` param) to avoid loading all products at once
- Images use `object-contain` to handle varying product photo sizes cleanly
- Debounced search triggers via `useEffect` dependency on `searchQuery`

### Routing
- Three routes: `/` (Home), `/product/:id` (Product Detail), `/about` (About), `/cart` (Cart)
- `ScrollToTop` component ensures page scrolls to top on route change

---

## 📁 Project Structure

```
src/
├── components/
│   ├── FilterPanel.jsx       # Category & sort filters
│   ├── Navbar.jsx            # Navigation with cart count badge
│   ├── ProductCard.jsx       # Product grid card with Add to Cart
│   ├── SearchBar.jsx         # Search input
│   ├── Loader.jsx            # Loading spinner
│   ├── Footer.jsx            # Footer
│   └── ScrollToTop.jsx       # Scroll reset on navigation
├── context/
│   ├── ProductContext.jsx    # Products, search, filter, sort state
│   └── CartContext.jsx       # Cart items state management
├── pages/
│   ├── Home.jsx              # Product listing page
│   ├── ProductDetail.jsx     # Single product page
│   ├── Cart.jsx              # Cart page
│   └── About.jsx             # About page
└── services/
    └── api.js                # Axios instance + API functions
```

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/utkarshverma-ai/bitecheck.git

# Navigate into the project
cd bitecheck

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⏱️ Time Taken

Approximately 5 days — including API integration, state management, 
cart functionality, UI design, and deployment setup.

---


## 📄 License

This project is for evaluation purposes only.
