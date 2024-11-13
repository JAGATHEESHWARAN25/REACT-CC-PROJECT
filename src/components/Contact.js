import React, { useState } from 'react';
import './styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form inputs
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate a form submission (you can replace this with actual API call)
      setSubmitted(true);
      setTimeout(() => {
        alert('Thank you for contacting us! We will get back to you soon.');
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }, 1000);
    }
  };

  return (
    <div className="contact-page">
      {/* Visually Appealing Header */}
      <div className="contact-header">
        <div className="hero-banner">
          <h1>We're Here to Help</h1>
          <p>Have a question or need support? Get in touch with us!</p>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Partnerships">Partnerships</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}

          <button type="submit" className="submit-btn" disabled={submitted}>
            {submitted ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Alternative Contact Methods */}
      <div className="contact-methods">
      <div className="black"><h3 style={{ textAlign: 'center' }}>Other Ways to Reach Us</h3></div>
        <div className="icons">
          <a href="mailto:info@ebookstore.com" className="contact-icon">📧 mailto:info@ebookstore.com</a>
          <a href="tel:+1234567890" className="contact-icon">📞 tel:+1234567890</a>
          <a href="https://twitter.com/yourhandle" className="contact-icon">🐦 https://twitter.com/yourhandle</a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="black"><h3 style={{ textAlign: 'center' }}>Frequently Asked Questions</h3></div>
      <div className="faq-section">
        <div className="faq-item">
          <div className="faq-question">How do I purchase an eBook?</div>
          <div className="faq-answer">You can purchase an eBook by browsing our catalog and adding the book to your cart. Follow the checkout process to complete your purchase.</div>
        </div>
        <div className="faq-item">
          <div className="faq-question">Can I get a refund?</div>
          <div className="faq-answer">We offer refunds for purchases made within the last 14 days, provided the eBook has not been downloaded.</div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 Your eBook Store. All Rights Reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  );
};

export default Contact;
