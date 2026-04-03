import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">

      {/* LEFT SIDE IMAGE */}
      <div className="auth-left">
        <img src="noti2.0.png" alt="logo" className="main-img" />
        <img src="noti3.png" alt="glow" className="bg-img" />
      </div>

      <div className="auth-center">
  <h1 className="hero-title">
    Feel the <span>Beat</span>
  </h1>

  <p className="hero-sub">
    Your music. Your vibe. Your space.
  </p>
</div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-right">

        <div className="auth-box">

          {/* LOGO */}
          <img src="noti1.png" className="small-logo" />

          {/* TOGGLE */}
          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <div className="auth-form">

            {!isLogin && (
              <input type="text" placeholder="Full Name" />
            )}

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            {!isLogin && (
              <input type="password" placeholder="Confirm Password" />
            )}

            <button className="submit-btn">
              {isLogin ? "Login" : "Create Account"}
            </button>

          </div>

          {/* SWITCH */}
          <p className="switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default AuthPage;