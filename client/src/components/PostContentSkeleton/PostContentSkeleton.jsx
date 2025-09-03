import React from 'react';
import './PostContentSkeleton.css';

const PostContentSkeleton = () => {
  return (
    <div className="post-content skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-meta">
        <div className="skeleton-text small author"></div>
        <div className="skeleton-text small upvotes"></div>
        <div className="skeleton-text small comments"></div>
        <div className="skeleton-text small time"></div>
      </div>
    </div>
  );
};

export default PostContentSkeleton;
