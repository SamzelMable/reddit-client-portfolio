import { fetchSubredditPosts, fetchPostDetails } from '../services/redditService.js';

// /api/subreddit/:subreddit
export const getSubredditPosts = async (req, res) => {
  try {
    const posts = await fetchSubredditPosts(req.params.subreddit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// /api/post/:postId
export const getPostDetails = async (req, res) => {
  try {
    const postData = await fetchPostDetails(req.params.postId);
    res.json(postData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
