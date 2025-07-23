import React, { useState } from "react";
import "../stylesCSS/feedback.css";

function Feedback() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  if (!user) {
    return <div>Please log in to leave feedback.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        message,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setStatus("Thank you for your feedback!");
        setMessage("");
      })
      .catch(() => setStatus("Error submitting feedback. Please try again."));
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
      <h2>Feedback</h2>
      <form className="post-textarea" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label>
          <input
            type="text"
            value={user.firstName + " " + user.lastName}
            disabled
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            disabled
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Feedback:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            style={{ width: "100%" }}
          />
        </div>
        <button className="post-submit-btn" type="submit">Submit feedback</button>
      </form>
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
    </div>
  );
}

export default Feedback;
