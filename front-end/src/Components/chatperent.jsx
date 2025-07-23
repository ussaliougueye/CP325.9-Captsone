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

  // Like handler
  const handleLike = async (commentId) => {
    try {
      await fetch(`http://localhost:3000/comment/${commentId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userLogged.email }),
      });
      getComments(); // Refresh comments after like
    } catch {
      // Optionally handle error
    }
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
      {fetchComments.map((comment) => {
        const isOwnPost = comment.email === userLogged.email; {/*this state allows me to make sur the user can not like his or her own post*/ }
        const likes = comment.likes ? comment.likes.length : 0;
        const alreadyLiked =
          comment.likes && comment.likes.includes(userLogged.email);
        return (
          <div
            key={comment._id}
            className="containerChild"
            style={{ position: "relative" }}
          >
            <h6>{comment.fullname}</h6>
            <p>{comment.comment}</p>
            {!isOwnPost && (
              <button
                className={`like-button${alreadyLiked ? " liked" : ""}`}
                style={{ position: "absolute", bottom: -30, right: 10 }}
                onClick={() => handleLike(comment._id)}
              >
                {alreadyLiked ? "💙" : "🤍"}{likes} {/*check if the button is alreadyLiked before letting it be clicable */}
              </button>
            )}
          </div>
        );
      })}

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
