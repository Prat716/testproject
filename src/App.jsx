import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('auth') === 'true'
  );

  const handleLogin = () => {
    sessionStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? '/products' : '/login'} replace />}
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/products" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/products"
            element={
              isAuthenticated ? (
                <ProductsPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <CartPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
