import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import PostCard from '../PostCard/PostCard';
import PostSkeleton from '../PostSkeleton/PostSkeleton';
import './PostList.css';

const PostList = ({ subreddit }) => {
  const { items, status, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subreddit) {
      dispatch(fetchPosts(subreddit));
    }
  }, [subreddit, dispatch]);

  if (status === 'loading') {
    return (
      <div className="post-list">
        {Array(5).fill().map((_, i) => <PostSkeleton key={i} />)}
      </div>
    );
  }

  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="post-list">
      {items.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
