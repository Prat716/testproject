import React, { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export const ALL_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧' },
  { id: 2, name: 'Running Shoes',        price: 59.99, category: 'Sports',      image: '👟' },
  { id: 3, name: 'Coffee Maker',         price: 49.99, category: 'Kitchen',     image: '☕' },
  { id: 4, name: 'Yoga Mat',             price: 29.99, category: 'Sports',      image: '🧘' },
  { id: 5, name: 'Desk Lamp',            price: 34.99, category: 'Home',        image: '💡' },
  { id: 6, name: 'Backpack',             price: 44.99, category: 'Travel',      image: '🎒' },
  { id: 7, name: 'Smart Watch',          price: 199.99, category: 'Electronics', image: '⌚' },
  { id: 8, name: 'Water Bottle',         price: 19.99, category: 'Sports',      image: '🍶' },
];

const CATEGORIES = ['All', ...new Set(ALL_PRODUCTS.map((p) => p.category))];

function ProductsPage({ onLogout }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div data-testid="products-page">
      <Header onLogout={onLogout} />
      <main style={styles.main}>
        <h2 data-testid="products-heading" style={styles.heading}>
          Our Products
        </h2>

        <div style={styles.filters}>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div data-testid="category-filters" style={styles.categories}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className="btn"
                style={{
                  ...styles.catBtn,
                  backgroundColor: selectedCategory === cat ? '#4f46e5' : '#e5e7eb',
                  color: selectedCategory === cat ? '#fff' : '#374151',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p data-testid="no-results" style={styles.noResults}>
            No products found.
          </p>
        ) : (
          <div data-testid="products-grid" style={styles.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px',
  },
  searchInput: {
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
    outline: 'none',
  },
  categories: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  catBtn: {
    padding: '8px 16px',
    borderRadius: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
  },
  noResults: {
    color: '#6b7280',
    fontSize: '18px',
    textAlign: 'center',
    padding: '48px',
  },
};

export default ProductsPage;
