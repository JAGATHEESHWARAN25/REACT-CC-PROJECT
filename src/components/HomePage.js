import React, { useContext } from 'react';
import './styles/HomePage.css';
import { CartContext } from './contexts/CartContext';
import axios from 'axios';

const books = [
    { title: 'Alone', author: 'Author Name 1', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcO26kdi60I4raBpJSMFyJMX2AzPfb2D9Aw&s' },
    { title: 'Memory', author: 'Author Name 2', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjpNktAuQGDsFq-3yIHfyLE5zm7HQ-tZ9Ubg&s' },
    { title: 'City Of Orange', author: 'Author Name 3', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwkl2cfIG_d2wRZ3ToFLGHgqg8eFfdMBeYA&s' },
    { title: 'Catching Fire', author: 'Author Name 4', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyL_OVkOnTSP5YMQTM9e8kAj65RFHkMQQnnA&s' },
    { title: 'To Sleep In A Sea Of Stars', author: 'Author Name 5', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_JpL-xglf-GR6MJZ6s3aZXLjeiZr8S_6s0Q&s' },
    { title: 'Book Title 6', author: 'Author Name 6', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TmjCjoKrMIAdPJmVFc-q_k7S6fbH-XVcJg&s' },
    { title: 'Book Title 7', author: 'Author Name 7', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSUEyJZbIN7C0mcH8aNP44G7fVJ4TkmykQA&s' },
    { title: 'Book Title 8', author: 'Author Name 8', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xvbWyP148ffifV_J5eysSgOWuGbwXSOw-Q&s' },
    { title: 'Book Title 9', author: 'Author Name 9', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwl2q5V2YnwLJqIlRuVKliYB9I89gO-eoI2A&s' },
    { title: 'Book Title 10', author: 'Author Name 10', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3oGDi5F-6eI5Rd6njlSyC4jYGDJpr9bfNxQ&s' },
    { title: 'Book Title 11', author: 'Author Name 11', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOnDgk5hojLt6UX0UFqq8ZgpXjFewdcnk5Q&s' },
    { title: 'Book Title 12', author: 'Author Name 12', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYB0lpxdx_m3daUbo2KmMhBQfANsVyCpSLA&s' },
    { title: 'Book Title 13', author: 'Author Name 11', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISvLadDcPcq8PTF4Z5DnUU8EuN2VqBjjkiw&s' },
    { title: 'Book Title 14', author: 'Author Name 12', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsKrxQKG_xAUQaradE8I_TeZhbSJjJlnJhJQ&s' },
    { title: 'Book Title 14', author: 'Author Name 12', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tvKph5lNYdMD0imB_wGyE7tMyOBDplOJbQ&s' },
];

const HomePage = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async (book) => {
    try {
      const response = await axios.post('http://localhost:3000/cart', {
        title: book.title,
        imgSrc: book.imgSrc,
      });
      if (response.status === 201) {
        addToCart(book); // Updates the context state with the newly added book
        alert(`${book.title} has been added to the cart!`);
      }
    } catch (error) {
      console.error('Error adding the book to cart:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Explore Our Collection</h1>
      <div className="book-grid">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img src={book.imgSrc} alt={book.title} className="book-image" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">{book.author}</p>
            <button onClick={() => handleAddToCart(book)} className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
