import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css"; // Import specific styles for LoginPage
import axios from "axios"; // Import axios

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // To display any login errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Fetch users from db.json and check for matching email and password
      const response = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
      
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === formData.password) {
          // If the password matches, navigate to the home page
          navigate("/");
        } else {
          setError("Invalid password.");
        }
      } else {
        setError("User does not exist.");
      }
    } catch (err) {
      setError("Error during login. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect to the registration page
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

        {/* Login container */}
        <div className="login-container">
          <h1 className="title">Login</h1>
          {error && <p className="error-message">{error}</p>} {/* Error message display */}
          <form onSubmit={handleSubmit} className="login-form">
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
            <button type="submit" className="submit-button">Login</button>
          </form>
          <div className="register-prompt">
            <p>Don't have an account?{" "}
              <span className="register-text" onClick={handleRegister}>
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
