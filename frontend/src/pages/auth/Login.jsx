import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log(response.data);

      alert("Login Successful");

      // Agar backend token bhej raha hai
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
          AssetFlow
        </div>

        <h2>Welcome Back</h2>
        <p>Login to manage your assets</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot">
            Forgot Password?
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <div className="switch">
          Dont have an account?{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;