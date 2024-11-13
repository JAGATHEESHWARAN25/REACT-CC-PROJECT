import React, { useContext ,useEffect} from 'react';
import { CartContext } from './contexts/CartContext';
import axios from 'axios';
import './styles/Cart.css';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Function to remove item from the cart and from db.json
  useEffect(() => {
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    fetchCartItems();
});
const removeFromCart = async (id) => {
  try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
  } catch (error) {
      console.error('Error deleting booking:', error);
  }
};

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0; // Default to 0 if price is undefined
      return total + itemPrice;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imgSrc} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
                <div className="book-info">
                  <h3>{item.title}</h3> {/* Book title */}
                  <p>Author: {item.author}</p> {/* Author name */}
                  <p className="item-price">Price: ₹{item.price?.toFixed(2) || '0.00'}</p> {/* Price */}
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total: ₹{calculateTotal()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
