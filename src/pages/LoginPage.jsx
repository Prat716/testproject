import React, { useState } from 'react';

const VALID_CREDENTIALS = [
  { identifier: 'admin@example.com', password: 'password123' },
  { identifier: 'admin716', password: 'password123' },
];

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = VALID_CREDENTIALS.find(
      (c) => c.identifier === identifier && c.password === password
    );
    if (match) {
      setError('');
      onLogin();
    } else {
      setError('Invalid email/user ID or password. Please try again.');
    }
  };

  return (
    <div data-testid="login-page" style={styles.container}>
      <div style={styles.card}>
        <h1 data-testid="login-title" style={styles.title}>
          🛍️ ShopEasy
        </h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form data-testid="login-form" onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label htmlFor="identifier" style={styles.label}>
              Email / User ID
            </label>
            <input
              id="identifier"
              data-testid="input-email"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@example.com or admin716"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              data-testid="input-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          {error && (
            <p data-testid="login-error" style={styles.error}>
              {error}
            </p>
          )}

          <button
            data-testid="btn-login"
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: 8 }}
          >
            Sign In
          </button>
        </form>

        <p style={styles.hint}>
          Demo: <strong>admin@example.com</strong> or <strong>admin716</strong> / <strong>password123</strong>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    fontSize: '32px',
    textAlign: 'center',
    color: '#4f46e5',
    marginBottom: '8px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '32px',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
  },
  error: {
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '12px',
    backgroundColor: '#fef2f2',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #fecaca',
  },
  hint: {
    marginTop: '24px',
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
  },
};

export default LoginPage;
