import React, { useState, useEffect, useRef } from "react";
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
    signupConfirm.trim() !== "";

  const [userInfo, setUserInfo] = useState([]);

  async function getUserInfo() {
    const response = await fetch(`${BASE_URL}/get`);
    const data = await response.json();
    setUserInfo(data);
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  async function handleLogin() {
    const response = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await response.json();
    console.log(data);
  }

  //console.log(userInfo);

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
              {isSignupValid && <button className="clkbtn">Signup</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
