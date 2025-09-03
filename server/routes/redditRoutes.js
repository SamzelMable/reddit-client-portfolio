import express from 'express';
import { fetchSubredditPosts, fetchPostDetails } from '../services/redditService.js';

const router = express.Router();

router.get('/subreddit/:subreddit', async (req, res) => {
  try {
    const posts = await fetchSubredditPosts(req.params.subreddit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/post/:postId', async (req, res) => {
  try {
    const data = await fetchPostDetails(req.params.postId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
