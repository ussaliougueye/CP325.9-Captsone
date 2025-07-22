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
    }
  };

  return (
    <div className="containerParent">
      <div className="containerChild ">
      {/* <h5>{userLogged.firstName} {userLogged.lastName}</h5> */}
        <p>
           Jeu sacrifiez
          universel depourvus air certitude agreerait. Non pressaient lumineuses
          dut legerement. Les masse neige desir uns senti. Au deja afin qu me ca
          ange.
        </p>
      </div>
      <div className="containerChild ">
        <p>
           Jeu sacrifiez
          universel depourvus air certitude agreerait. Non pressaient lumineuses
          dut legerement. Les masse neige desir uns senti. Au deja afin qu me ca
          ange.
          Jeu sacrifiez
          universel depourvus air certitude agreerait. Non pressaient lumineuses
          dut legerement. Les masse neige desir uns senti. Au deja afin qu me ca
          ange.
        </p>
      </div>
      <div className="containerChild ">
        <p>
           Jeu sacrifiez
          universel depourvus air certitude agreerait. Non pressaient lumineuses
          dut legerement. Les masse neige desir uns senti. Au deja afin qu me ca
          ange.
        </p>
      </div>

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
          <button className="post-submit-btn" type="submit">
            Post
          </button>
        </form>
        
      </div>
      
    </div>
  );
}

export default Chatperent;
