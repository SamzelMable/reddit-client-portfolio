import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../features/posts/postsSlice';
import PostList from '../../components/PostList/PostList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { subreddit } = useParams(); // get subreddit from URL
  const currentSubreddit = subreddit || 'popular';

  useEffect(() => {
    dispatch(fetchPosts(currentSubreddit));
  }, [dispatch, currentSubreddit]);

  return (
    <div className="home-page">
      <h1>Reddit Client</h1>
      <SearchBar />
      <PostList subreddit={currentSubreddit} />
    </div>
  );
};

export default HomePage;
