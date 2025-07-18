import React, { useState } from "react";

import "../stylesCSS/loginpage.css";

const BASE_URL = "http://localhost:3000";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  // Validation
  const isLoginValid = loginEmail.trim() !== "" && loginPassword.trim() !== "";
  const isSignupValid =
    signupName.trim() !== "" &&
    signupEmail.trim() !== "" &&
    signupPassword.trim() !== "" &&
    signupConfirm.trim() !== "" &&
    signupPassword === signupConfirm;

  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Login successful!");
        console.log("Login successful!", data.user);
        // Redirect or set user state here
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Network error. Please try again.");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (signupPassword !== signupConfirm) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Registration successful! You can now login.");
        // Clear signup form
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirm("");
        setIsSignup(false);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <>
      <div>
        <header>
          <h1 className="heading">Loging</h1>
          <h3 className="title">Association des hommes niaw diabar</h3>
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
          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}
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
              {isLoginValid && (
                <button className="clkbtn" onClick={handleLogin}>
                  Login
                </button>
              )}
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
              {isSignupValid && (
                <button className="clkbtn" onClick={handleSignup}>
                  Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
