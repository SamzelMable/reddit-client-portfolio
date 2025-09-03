import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import PostList from '../../components/PostList/PostList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Load default subreddit
    dispatch(fetchPosts('popular'));
  }, [dispatch]);

  return (
    <div className="home-page">
      <h1>Reddit Client</h1>
      <SearchBar />

      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {status === 'succeeded' && <PostList posts={posts} />}
    </div>
  );
};

export default HomePage;
