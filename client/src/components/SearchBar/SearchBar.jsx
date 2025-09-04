import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import './SearchBar.css';

// Directly use your Render backend URL
const BACKEND_URL = "https://reddit-client-portfolio.onrender.com";

const SearchBar = () => {
  const [subreddit, setSubreddit] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();

  // Fetch subreddit suggestions from the backend
  useEffect(() => {
    if (!subreddit.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`${BACKEND_URL}/api/search-subreddits?q=${subreddit}`)
        .then((res) => res.json())
        .then((data) => {
          const subs = data.map((s) => ({
            name: s.name,
            icon: s.icon,
          }));
          setSuggestions(subs);
          setActiveIndex(-1);
        })
        .catch(() => setSuggestions([]));
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [subreddit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let chosenSubreddit = subreddit.trim();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      chosenSubreddit = suggestions[activeIndex].name;
    }
    if (!chosenSubreddit) return;

    dispatch(fetchPosts(chosenSubreddit));
    setSuggestions([]);
    setActiveIndex(-1);
    setSubreddit(chosenSubreddit); // keep input updated
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch(fetchPosts(suggestion.name));
    setSuggestions([]);
    setActiveIndex(-1);
    setSubreddit(suggestion.name); // update input
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={subreddit}
          placeholder="Enter subreddit name"
          onChange={(e) => setSubreddit(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li
              key={s.name}
              className={`suggestion-item ${i === activeIndex ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(s)}
            >
              {s.icon && <img src={s.icon} alt="" className="suggestion-icon" />}
              r/{s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
