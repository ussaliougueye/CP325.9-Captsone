import React, { useState, useEffect } from "react";
import "../stylesCSS/chatperent.css";

function Chatperent() {
  const [postContent, setPostContent] = useState("");
  const userLogged = JSON.parse(localStorage.getItem("user"));
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      // For now, just log the post content
      console.log("New post:", postContent);
      setPostContent("");
    };
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
    });
  };
  
  return (
    <div className="containerParent">
     

      <div className="containParent">
        {/* Post creation form */}
        <form className="post-form" onSubmit={handlePostSubmit}>
          <textarea
            className="post-textarea"
            placeholder="Write your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={3}
          />
          <button className="post-submit-btn" type="submit" onClick={handlePostSubmit}>
            Post
          </button>
        </form>
        
      </div>
      
    </div>
  );
}

export default Chatperent;
