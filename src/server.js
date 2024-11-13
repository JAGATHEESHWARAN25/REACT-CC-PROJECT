const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy in-memory database for cart items (you could use a real DB like MongoDB)
let cartItems = [];
let orderHistory = [];

// Serve static files (e.g., images or static assets)
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Fetch cart items
app.get('/api/cart', (req, res) => {
  res.json(cartItems);
});

// Add item to cart
app.post('/api/cart', (req, res) => {
  const newItem = req.body;

  // Simple validation
  if (!newItem.title || !newItem.imgSrc || !newItem.price) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  newItem.id = cartItems.length + 1; // Generate a unique ID
  cartItems.push(newItem);
  res.status(201).json(newItem);
});

// Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  cartItems = cartItems.filter((item) => item.id !== itemId);

  res.status(200).json({ message: 'Item removed from cart' });
});

// Place an order
app.post('/api/order', (req, res) => {
  const order = req.body;

  if (!order.cartItems || order.cartItems.length === 0 || !order.shippingInfo) {
    return res.status(400).json({ message: 'Order is incomplete' });
  }

  // Save order to order history
  const newOrder = {
    orderId: orderHistory.length + 1,
    ...order,
    date: new Date().toISOString(),
  };
  orderHistory.push(newOrder);

  // Clear the cart
  cartItems = [];

  res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.orderId });
});

// Fetch order history
app.get('/api/orders', (req, res) => {
  res.json(orderHistory);
});

// Handle 404 errors for invalid API routes
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
