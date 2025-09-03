import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [subreddit, setSubreddit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = subreddit.trim();
    if (!trimmed) return;
    // navigate to /r/<subreddit>, HomePage will fetch automatically
    navigate(`/r/${trimmed}`);
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
