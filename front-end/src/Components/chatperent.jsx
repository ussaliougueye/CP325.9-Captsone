import React, { useState, useEffect } from "react";

import "../stylesCSS/chatperent.css";

function Chatperent() {
  const [fetchComments, setFetchComments] = useState([]);
  const [postContent, setPostContent] = useState("");
  const userLogged = JSON.parse(localStorage.getItem("user"));

  // Helper to fetch comments
  const getComments = () => {
    fetch("http://localhost:3000/comment")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFetchComments(data);
        } else {
          setFetchComments([]);
        }
      })
      .catch(() => setFetchComments([]));
  };

  useEffect(() => {
    getComments();
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      fetch("http://localhost:3000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: postContent,
          email: userLogged.email,
          fullname: userLogged.firstName + " " + userLogged.lastName,
        }),
      }).then(() => {
        setPostContent("");
        getComments(); // Refresh comments after posting
      });
    }
  };

  return (
    <div className="containerParent">
      {fetchComments.map((comment) => (
        <div key={comment._id} className="containerChild">
          <h6>{comment.fullname}</h6>
          <p>{comment.comment}</p>
        </div>
      ))}

      <div className="containParent">
        <form className="post-form" onSubmit={handlePostSubmit}>
          <textarea
            className="post-textarea"
            placeholder="Write your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={3}
          />
          <button className="post-submit-btn" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatperent;
