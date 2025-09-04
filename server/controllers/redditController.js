import { fetchSubredditPosts, fetchPostDetails, fetchSubredditSuggestions} from '../services/redditService.js';
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
  const query = req.query.q?.trim();
  if (!query) return res.json([]);

  try {
    const suggestions = await fetchSubredditSuggestions(query);
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


