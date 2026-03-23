import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

function CartPage({ onLogout }) {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div data-testid="cart-page">
        <Header onLogout={onLogout} />
        <main style={styles.main}>
          <div data-testid="order-success" style={styles.centred}>
            <div style={{ fontSize: '64px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', margin: '16px 0 12px' }}>Order Placed!</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Thank you for your purchase. Your order is being processed.
            </p>
            <button
              data-testid="btn-continue-shopping"
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div data-testid="cart-page">
      <Header onLogout={onLogout} />
      <main style={styles.main}>
        <h2 data-testid="cart-heading" style={styles.heading}>
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div data-testid="empty-cart" style={styles.centred}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
              Your cart is empty.
            </p>
            <button
              data-testid="btn-shop-now"
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div style={styles.layout}>
            {/* Items list */}
            <div data-testid="cart-items" style={styles.itemsList}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  data-testid={`cart-item-${item.id}`}
                  style={styles.cartItem}
                >
                  <span style={styles.itemImage}>{item.image}</span>

                  <div style={styles.itemDetails}>
                    <h3
                      data-testid={`cart-item-name-${item.id}`}
                      style={{ fontWeight: '600' }}
                    >
                      {item.name}
                    </h3>
                    <p
                      data-testid={`cart-item-price-${item.id}`}
                      style={{ color: '#4f46e5', fontWeight: 'bold' }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div style={styles.qtyControl}>
                    <button
                      data-testid={`btn-decrease-${item.id}`}
                      className="btn btn-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span
                      data-testid={`cart-item-qty-${item.id}`}
                      style={styles.qtyValue}
                    >
                      {item.quantity}
                    </span>
                    <button
                      data-testid={`btn-increase-${item.id}`}
                      className="btn btn-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <p style={styles.lineTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    data-testid={`btn-remove-${item.id}`}
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                    style={{ padding: '8px 12px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div data-testid="cart-summary" style={styles.summary}>
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Order Summary</h3>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">${totalPrice.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '18px' }}>
                <span>Total</span>
                <span data-testid="cart-total">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                data-testid="btn-checkout"
                className="btn btn-primary"
                onClick={handleCheckout}
                style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '24px' }}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  centred: {
    textAlign: 'center',
    padding: '80px 24px',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '32px',
    alignItems: 'start',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  itemImage: {
    fontSize: '40px',
    width: '60px',
    textAlign: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  qtyBtn: {
    padding: '6px 12px',
    minWidth: '36px',
  },
  qtyValue: {
    fontWeight: '600',
    fontSize: '16px',
    minWidth: '24px',
    textAlign: 'center',
  },
  lineTotal: {
    fontWeight: 'bold',
    minWidth: '70px',
    textAlign: 'right',
  },
  summary: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: '24px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
  },
};

export default CartPage;
