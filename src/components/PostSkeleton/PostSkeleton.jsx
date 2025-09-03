import React from 'react';
import './PostSkeleton.css';

const PostSkeleton = () => {
  return (
    <div className="post-card skeleton">
      <div className="skeleton-title"></div>
      <div className="skeleton-meta">
        <div className="skeleton-text small author"></div>
        <div className="skeleton-text small upvotes"></div>
        <div className="skeleton-text small comments"></div>
        <div className="skeleton-text small time"></div>
      </div>
      <div className="skeleton-image"></div>
    </div>
  );
};

export default PostSkeleton;
