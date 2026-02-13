# CheersKenya (Barrel & Craft)

A minimal e-commerce prototype for premium spirits and craft beer. Browse products, verify age/login, add to cart, and view your cart. A local mock API powers data via json-server.

- Frontend: Vanilla HTML/CSS/JS (no build step)
- Mock API: json-server with db.json
- Session: Cookie + localStorage (demo only)
- Cart: Client-side in localStorage

## Features

- Home (home.html): Landing UI with featured products
- Shop (shop.html + shop.js):
  - Loads from http://localhost:3000/products
  - Search, category filter, premium badge for $100+
  - Add-to-cart; cart count in navbar
- Auth (auth.html): Age 18+ check and demo login (users in db.json)
  - Stores user in localStorage and sets userLogin cookie
  - Shop redirects to auth if not logged in
- Cart (cart.html):
  - Update quantities, remove items, running total
  - State persisted via localStorage

## Structure

- home.html — Landing page
- shop.html — Shop UI; cart entry
- shop.js — Fetch, filters, add-to-cart, cookie banner, session UI
- auth.html — Age verification + demo login
- cart.html — Cart rendering and controls
- index.css — Shared styles
- db.json — Mock database (products, users, cart, orders, reviews, categories)
- SERVER_README.md — json-server usage and endpoints
- package.json — Scripts + json-server dependency
- LICENSE — License text

## Prerequisites

- Node.js 18+
- npm

## Setup

1) Install dependencies

   npm install

2) Start the mock API server (port 3000)

   npm run json-server

The API is now at http://localhost:3000 (auto-watches db.json).

## Using the Frontend

- Start at auth.html (use demo: john@example.com / password123 / age 32)
- On success, you’re redirected to home.html
- Go to shop.html to browse and add items
- Open cart.html to adjust quantities or remove items

If you open shop.html unauthenticated, it will redirect to auth.html.

## API Quick Reference (json-server)

- GET /products, /products/:id
- GET /users, /users/:id
- GET /cart, /orders, /reviews, /categories

Filtering, sorting, pagination, and CRUD are supported by json-server. See SERVER_README.md for details and curl examples.

## Notes & Caveats

- shop.js and auth.html expect the API at http://localhost:3000
- Demo data images in db.json may not hotlink reliably; replace with direct JPG/PNG URLs for a cleaner demo
- The repository includes an npm run server script referencing server.js, but server.js is not present. Use npm run json-server
- Authentication and storage here are for demo only (insecure). Passwords are plain text in db.json; do not reuse in production

## Troubleshooting

- Products not loading: Ensure npm run json-server is running and db.json has products
- Login fails: Use credentials from db.json and age >= 18; confirm /users is reachable
- Cart count not updating: Validate localStorage (key: cart) is enabled and JSON is valid
- Broken images: Update product image URLs in db.json to direct image links

## Scripts

- npm run json-server — Start mock API on port 3000
- npm test — Placeholder

## License

ISC — see LICENSE.
