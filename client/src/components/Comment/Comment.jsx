// Comment.jsx
import React from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img
        src={comment.icon_img || "/default-avatar.png"} // fallback avatar
        alt={comment.author}
        className="comment-avatar"
      />
      <div className="comment-content">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-body">{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;
