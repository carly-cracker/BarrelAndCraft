# JSON Server Setup Guide

## Overview
This project uses **JSON Server** to simulate a REST API backend for the Barrel & Craft application.

## Starting the Server

Run one of these commands in your terminal:

```bash
npm run server
```

or

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Available Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/1` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/1` - Update a product
- `DELETE /products/1` - Delete a product

### Users
- `GET /users` - Get all users
- `GET /users/1` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/1` - Update a user

### Orders
- `GET /orders` - Get all orders
- `GET /orders/1` - Get a specific order
- `POST /orders` - Create a new order
- `PUT /orders/1` - Update an order

### Cart
- `GET /cart` - Get cart items
- `POST /cart` - Add to cart
- `PUT /cart/1` - Update cart item
- `DELETE /cart/1` - Remove from cart

### Reviews
- `GET /reviews` - Get all reviews
- `POST /reviews` - Add a review
- `GET /reviews?productId=1` - Get reviews for a product

### Categories
- `GET /categories` - Get all categories
- `GET /categories/1` - Get a specific category

## Filtering & Querying

You can filter results using query parameters:

```
GET /products?category=whiskey
GET /products?inStock=true
GET /orders?status=delivered
GET /reviews?productId=1&rating=5
```

## Pagination

```
GET /products?_page=1&_limit=10
```

## Sorting

```
GET /products?_sort=price&_order=asc
GET /products?_sort=rating&_order=desc
```

## Sample API Calls

### Get all products
```bash
curl http://localhost:3000/products
```

### Get a specific product
```bash
curl http://localhost:3000/products/1
```

### Create a new product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hennessy VSOP",
    "category": "cognac",
    "price": 120,
    "description": "Premium French cognac",
    "rating": 4.7,
    "reviews": 89,
    "inStock": true,
    "origin": "France"
  }'
```

### Update a product
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 900}'
```

### Delete a product
```bash
curl -X DELETE http://localhost:3000/products/1
```

## Using in Your Frontend

Example fetch request in JavaScript:

```javascript
// Get all products
fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(data => console.log(data))

// Create a new product
fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Product',
    category: 'whiskey',
    price: 75,
    description: 'A great whiskey',
    rating: 4.5,
    reviews: 0,
    inStock: true,
    origin: 'Scotland'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

## Database Structure

The database is stored in `db.json` with the following collections:
- **products** - All beverages available for sale
- **users** - Customer accounts
- **orders** - Customer orders with items and status
- **cart** - Shopping cart items
- **reviews** - Product reviews and ratings
- **categories** - Product categories

## Important Notes

- Changes to `db.json` will auto-reload in watch mode
- The server uses an ID-based system for all resources
- All requests/responses use JSON format
- CORS is enabled by default

## Stopping the Server

Press `Ctrl+C` in your terminal to stop the server.

## Next Steps

Once the server is running, connect your frontend to it by updating API calls to point to `http://localhost:3000/`
