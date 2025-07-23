import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesCSS/loginpage.css";

const BASE_URL = "http://localhost:3000";

function LoginPage() {
  const navigate = useNavigate();
  // State to determine if the user is on the signup form (true) or login form (false)
  const [isSignup, setIsSignup] = useState(false);

  // State to store the email entered in the login form
  const [loginEmail, setLoginEmail] = useState("");
  // State to store the password entered in the login form
  const [loginPassword, setLoginPassword] = useState("");
  // State to store any login error messages
  const [loginError, setLoginError] = useState("");

  // State to store the first name entered in the signup form
  const [signupFirstName, setSignupFirstName] = useState("");
  // State to store the last name entered in the signup form
  const [signupLastName, setSignupLastName] = useState("");
  // State to store the email entered in the signup form
  const [signupEmail, setSignupEmail] = useState("");
  // State to store the password entered in the signup form
  const [signupPassword, setSignupPassword] = useState("");
  // State to store the password confirmation entered in the signup form
  const [signupConfirm, setSignupConfirm] = useState("");

  // Validation
  const isLoginValid = loginEmail.trim() !== "" && loginPassword.trim() !== "";
  const isSignupValid =
    signupFirstName.trim() !== "" &&
    signupLastName.trim() !== "" &&
    signupEmail.trim() !== "" &&
    signupPassword.trim() !== "" &&
    signupConfirm.trim() !== "";

  async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/get`);
    await response.json();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleLogin(e) {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await fetch(`${BASE_URL}/get/${loginEmail}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.password === loginPassword) {
        localStorage.setItem("user", JSON.stringify(data));
        setLoginError(""); // Clear error on success
        navigate("/chat"); //  Redirect after success
      } else {
        setLoginError("Incorrect email or password.");
      }
    } catch (error) {
      setLoginError("Incorrect email or password.");
      console.error("Login error:", error);
    }
  }
  async function handleSignup(e) {
    e.preventDefault(); // Prevent form reload
    if (signupPassword !== signupConfirm) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();

      //console.log("✅ Signed up successfully");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/chat"); // Redirect after success
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  return (
    <>
      <div className="sg">
        <header>
          <h1 className="heading">Loging</h1>
          <h3 className="title">Let's chat</h3>
        </header>

        <div className="container">
          <div className={`slider ${isSignup ? "moveslider" : ""}`}></div>

          <div className="btn">
            <button
              className={`login${!isSignup ? " active-btn" : ""}`}
              onClick={() => {
                setIsSignup(false);
                setLoginError("");
              }}
            >
              Login
            </button>
            <button
              className={`signup${isSignup ? " active-btn" : ""}`}
              onClick={() => {
                setIsSignup(true);
                setLoginError("");
              }}
            >
              Signup
            </button>
          </div>
          <div className="form-section">
            {/* Login Box */}
            {!isSignup && (
              <div className="login-box">
                {loginError && (
                  <div className="login-error-alert">{loginError}</div>
                )}
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
            )}

            {/* Signup Box */}
            {isSignup && (
              <div className="signup-box">
                <input
                  type="text"
                  className="name ele"
                  placeholder="Enter your first name"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="name ele"
                  placeholder="Enter your last name"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
