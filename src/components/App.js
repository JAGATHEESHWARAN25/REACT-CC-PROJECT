import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { CartProvider } from './contexts/CartContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Cart from './Cart';
import OrderPage from './OrderPage';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Header from './Header';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
