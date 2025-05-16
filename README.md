<!-- @format -->

# E-commerce API

A simple Express.js REST API for managing products, categories, users, and shopping carts.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

For development with auto-restart:

```
npm run dev
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?keyword=mac&minPrice=1000` - Search products by query
- `POST /api/products` - Add a new product (JSON body)
- `PUT /api/products/:id` - Replace product by ID
- `PATCH /api/products/:id` - Update part of product (e.g., price)
- `DELETE /api/products/:id` - Remove product

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/products` - Get all products in a category
- `POST /api/categories` - Add new category

### Users

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Add a new user
- `PUT /api/users/:id` - Replace a user
- `DELETE /api/users/:id` - Delete a user

### Cart

- `GET /api/cart/:userId` - Get cart items for a user
- `POST /api/cart/:userId/items` - Add product to user's cart (JSON body)
- `PATCH /api/cart/:userId/items/:productId` - Update quantity
- `DELETE /api/cart/:userId/items/:productId` - Remove item from cart
- `DELETE /api/cart/:userId` - Clear all cart items for user

## Data Structure

The API uses in-memory data stored in arrays. The data structure includes:

- Products
- Categories
- Users
- Cart

## Project Structure

```
project/
├── controllers/
│   ├── productController.js
│   ├── categoryController.js
│   ├── userController.js
│   └── cartController.js
├── routes/
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── userRoutes.js
│   └── cartRoutes.js
├── data.js
├── index.js
├── package.json
└── README.md
```
