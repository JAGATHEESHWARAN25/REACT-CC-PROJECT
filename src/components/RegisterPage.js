import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/RegisterPage.css"; // Import shared styles
import axios from 'axios'; // Import axios for HTTP requests

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = await axios.get('http://localhost:3000/users?email=' + formData.email);
      
      if (existingUsers.data.length > 0) {
        setError("User already exists.");
      } else {
        // Add new user to db.json
        await axios.post('http://localhost:3000/users', {
          email: formData.email,
          password: formData.password,
        });
        setSuccess("Registration successful! Redirecting to login...");
        setError("");
        
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Error during registration. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="body">
      <div className="App">
        {/* Header content */}
        <div className="header-login-register">
          <img
            src="https://cdn-icons-png.flaticon.com/128/864/864685.png"
            alt="Book Icon"
            className="header-icon"
          />
          <span className="header-title">e-Book Store</span>
        </div>

        {/* Register container */}
        <div className="register-container">
          <h1 className="title">Register</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="submit-button">Register</button>
          </form>
          <div className="register-prompt">
            <p>Already have an account?{" "}<span className="register-text" onClick={handleLoginRedirect}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
