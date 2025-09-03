import React from "react";
import Comment from "../Comment/Comment";
import "./PostContent.css";

const PostContent = ({ post, comments }) => {
  const timeAgo = (utcSeconds) => {
    const seconds = Math.floor(Date.now() / 1000) - utcSeconds;
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const imageUrl =
    post.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") ||
    (post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : null);

  return (
    <div className="post-content">
      {imageUrl && <img src={imageUrl} alt={post.title} className="post-image" />}
      <h3>{post.title}</h3>
      <p className="post-meta">
        By {post.author} • {post.ups} upvotes • {post.num_comments} comments • {timeAgo(post.created_utc)}
      </p>

      <div className="comments-section">
        {comments?.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
};

export default PostContent;
