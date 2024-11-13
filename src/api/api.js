import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace this with your JSON server or backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch books (example of GET request)
export const fetchBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add book to cart (example of POST request)
export const addToCart = async (book) => {
  try {
    const response = await api.post('/cart', book);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Fetch cart items (example of GET request)
export const fetchCartItems = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Place an order (example of POST request)
export const placeOrder = async (orderDetails) => {
  try {
    const response = await api.post('/orders', orderDetails);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Fetch order history (example of GET request)
export const fetchOrderHistory = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

// Apply promo code (example of POST request)
export const applyPromoCode = async (promoCode) => {
  try {
    const response = await api.post('/apply-promo', { code: promoCode });
    return response.data;
  } catch (error) {
    console.error('Error applying promo code:', error);
    throw error;
  }
};

export default api;