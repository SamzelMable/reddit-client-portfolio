import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import './SearchBar.css';

const SearchBar = () => {
  const [subreddit, setSubreddit] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subreddit.trim()) return;
    dispatch(fetchPosts(subreddit.trim()));
    setSubreddit('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={subreddit}
        placeholder="Enter subreddit name"
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
