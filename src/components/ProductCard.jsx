import React from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div data-testid={`product-card-${product.id}`} style={styles.card}>
      <div style={styles.image}>{product.image}</div>
      <div style={styles.body}>
        <span
          data-testid={`product-category-${product.id}`}
          style={styles.category}
        >
          {product.category}
        </span>
        <h3 data-testid={`product-name-${product.id}`} style={styles.name}>
          {product.name}
        </h3>
        <p data-testid={`product-price-${product.id}`} style={styles.price}>
          ${product.price.toFixed(2)}
        </p>
        <button
          data-testid={`btn-add-to-cart-${product.id}`}
          className="btn btn-primary"
          onClick={() => addToCart(product)}
          style={{ width: '100%' }}
        >
          {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  image: {
    fontSize: '64px',
    textAlign: 'center',
    padding: '24px',
    backgroundColor: '#f8f9ff',
  },
  body: {
    padding: '16px',
  },
  category: {
    fontSize: '12px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '8px 0',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: '16px',
  },
};

export default ProductCard;
