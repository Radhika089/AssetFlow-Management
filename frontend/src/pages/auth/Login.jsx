import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="logo">
          AssetFlow
        </div>

        <h2>Welcome Back</h2>
        <p>Login to manage your assets</p>


        <form>

          <div className="input-box">
            <label>Email</label>
            <input 
              type="email"
              placeholder="Enter your email"
            />
          </div>


          <div className="input-box">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
            />
          </div>


          <div className="forgot">
            Forgot Password?
          </div>


          <button>
            Login
          </button>


        </form>


        <div className="switch">

Dont have account?

<Link to="/signup">
Create Account
</Link>

</div>


      </div>

    </div>
  );
};


export default Login;