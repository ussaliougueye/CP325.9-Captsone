import React, { useState } from "react";
import "../stylesCSS/loginpage.css";

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);

    // Login form state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    // Signup form state
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirm, setSignupConfirm] = useState('');
  
    // Validation
    const isLoginValid = loginEmail.trim() !== '' && loginPassword.trim() !== '';
    const isSignupValid =
      signupName.trim() !== '' &&
      signupEmail.trim() !== '' &&
      signupPassword.trim() !== '' &&
      signupConfirm.trim() !== '';
  return (
    <>
      <div>
        <header>
          <h1 className="heading">GeeksforGeeks</h1>
          <h3 className="title">Sliding Login & Registration Form</h3>
        </header>

        <div className="container">
          <div className={`slider ${isSignup ? "moveslider" : ""}`}></div>

          <div className="btn">
            <button className="login" onClick={() => setIsSignup(false)}>
              Login
            </button>
            <button className="signup" onClick={() => setIsSignup(true)}>
              Signup
            </button>
          </div>

          <div
            className={`form-section ${isSignup ? "form-section-move" : ""}`}
          >
            {/* Login Box */}
            <div className="login-box">
              <input
                type="email"
                className="email ele"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                className="password ele"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {isLoginValid && <button className="clkbtn">Login</button>}
            </div>

            {/* Signup Box */}
            <div className="signup-box">
              <input
                type="text"
                className="name ele"
                placeholder="Enter your name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
              <input
                type="email"
                className="email ele"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                className="password ele"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <input
                type="password"
                className="password ele"
                placeholder="Confirm Password"
                value={signupConfirm}
                onChange={(e) => setSignupConfirm(e.target.value)}
              />
              {isSignupValid && <button className="clkbtn">Signup</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
