import React from 'react';
import { Link } from 'react-router-dom';
import PostContent from '../PostContent/PostContent';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`}>
        <PostContent post={post} />
      </Link>
    </div>
  );
};

export default PostCard;
