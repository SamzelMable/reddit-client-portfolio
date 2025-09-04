import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import PostList from '../../components/PostList/PostList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentSubreddit } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(currentSubreddit));
  }, [dispatch, currentSubreddit]);

  return (
    <div className="home-page">
      <h1>/r/{currentSubreddit.charAt(0).toUpperCase() + currentSubreddit.slice(1)}</h1>
      <SearchBar />
      <PostList />
    </div>
  );
};

export default HomePage;
