import { fetchSubredditPosts, fetchPostDetails } from '../services/redditService.js';
import fetch from 'node-fetch';

export const getSubredditPosts = async (req, res) => {
  const { subreddit } = req.params;
  try {
    const posts = await fetchSubredditPosts(subreddit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostDetails = async (req, res) => {
  const { postId } = req.params;
  try {
    const details = await fetchPostDetails(postId);
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubredditSuggestions = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  try {
    const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}&limit=5`);
    const data = await response.json();
    const suggestions = data.data.children.map(child => ({
      name: child.data.display_name,
      icon: child.data.icon_img || child.data.community_icon || ''
    }));
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
