import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header data-testid="header" style={styles.header}>
      <div
        data-testid="logo"
        style={styles.logo}
        onClick={() => navigate('/products')}
      >
        🛍️ ShopEasy
      </div>
      <nav style={styles.nav}>
        <button
          data-testid="nav-products"
          className="btn btn-secondary"
          onClick={() => navigate('/products')}
          style={{ marginRight: 8 }}
        >
          Products
        </button>
        <button
          data-testid="nav-cart"
          className="btn btn-secondary"
          onClick={() => navigate('/cart')}
          style={{ marginRight: 8, position: 'relative' }}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span data-testid="cart-count" style={styles.badge}>
              {totalItems}
            </span>
          )}
        </button>
        <button
          data-testid="btn-logout"
          className="btn btn-danger"
          onClick={onLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#4f46e5',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Header;
