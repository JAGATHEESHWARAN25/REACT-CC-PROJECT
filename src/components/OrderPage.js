import React, { useState, useContext } from 'react';
import { CartContext } from './contexts/CartContext';
import './styles/OrderPage.css';
import axios from 'axios';

const OrderPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      // Example of a promo code validation
      setIsPromoValid(true);
      alert('Promo code applied! You got 10% off.');
    } else {
      setIsPromoValid(false);
    }
  };

  const placeOrder = async () => {
    const orderDetails = {
      cartItems,
      shippingInfo,
      paymentInfo,
      deliveryMethod,
      promoCode
    };

    try {
      // Send order details to backend API
      const response = await axios.post('/api/order', orderDetails);
      alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
      clearCart(); // Clear cart after placing order
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return deliveryMethod === 'next-day' ? subtotal + 20 : subtotal + 10; // Example of adding delivery charges
  };

  return (
    <div className="order-page">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.imgSrc} alt={item.title} className="book-img" /></td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Order Total: ${calculateTotal()}</h3>
      </div>

      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            required
          />
        </form>
      </div>

      <div className="payment-method">
        <h2>Payment</h2>
        <form>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiration Date"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            required
          />
        </form>
      </div>

      <div className="promo-section">
        <h2>Promotions</h2>
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={applyPromoCode}>Apply</button>
        {!isPromoValid && <p className="promo-error">Invalid Promo Code</p>}
      </div>

      <div className="delivery-options">
        <h2>Delivery Options</h2>
        <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
          <option value="standard">Standard - $10 (5-7 days)</option>
          <option value="next-day">Next Day - $20 (1 day)</option>
        </select>
      </div>

      <div className="review-order">
        <h2>Review Your Order</h2>
        <p>Shipping to: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.zipCode}</p>
        <p>Payment Method: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
        <p>Delivery: {deliveryMethod === 'next-day' ? 'Next Day' : 'Standard'}</p>
      </div>

      <button className="place-order-button" onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default OrderPage;
