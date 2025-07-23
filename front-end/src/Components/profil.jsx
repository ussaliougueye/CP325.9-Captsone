import React, { useState } from "react";
import "../stylesCSS/profil.css";
function Profil() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  if (!user) {
    return <div>Please login to view your profile.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }
    fetch(`http://localhost:3000/user/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password: password || undefined, // Only send if changed
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus(data.error);
        } else {
          setStatus("Profile updated successfully!");
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch(() => setStatus("Error updating profile. Please try again."));
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        backgroundColor: "rgb(203, 226, 245)",
      }}
    >
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
    </div>
  );
}

export default Profil;
