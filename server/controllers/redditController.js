import { fetchSubredditPosts, fetchPostDetails } from '../services/redditService.js';

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
