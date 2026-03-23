# ShopEasy – React E-Commerce UI

A React + Vite demo e-commerce application. This is the **application under test** for the Playwright automation suite in the companion repo `playwright-tests`.

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Login form with email & password |
| `/products` | Product listing with search and category filter |
| `/cart` | Shopping cart with quantity controls and checkout |

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | `admin@example.com` |
| Password | `password123` |

## Setup & Run

```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

## Tech Stack

- React 18
- React Router v6
- Vite 5
- Plain CSS (no framework)

## data-testid Attributes

All interactive elements carry `data-testid` attributes so the Playwright tests can locate them reliably without coupling to CSS classes or text content.

## Companion Test Repo

Playwright tests live in: **`../playwright-tests`**  
Run `npm test` from that directory to execute the full test suite.
