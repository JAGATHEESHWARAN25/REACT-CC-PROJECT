// /src/contexts/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchCartItems, addToCart as addToCartAPI, placeOrder as placeOrderAPI } from '../../api/api';
import axios from 'axios';

// Create the CartContext
export const CartContext = createContext();

// CartProvider component to wrap around any component that needs access to the cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Add item to cart and update state
  const addToCart = async (book) => {
    try {
      const bookWithPrice = { ...book, price: 500 }; // Set default price to 500
      const newItem = await addToCartAPI(bookWithPrice);
      setCartItems((prevItems) => [...prevItems, newItem]);
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  // Remove item from cart and delete it from db.json
  const removeFromCart = async (id) => {
    try {
      // Remove item from db.json using Axios DELETE request
      await axios.delete(`http://localhost:3000/cart/${id}`);
      // Remove item from cartItems state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  // Place an order and clear the cart
  const placeOrder = async (orderDetails) => {
    try {
      await placeOrderAPI(orderDetails);
      setCartItems([]); // Clear cart after placing an order
    } catch (err) {
      setError('Failed to place order');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
