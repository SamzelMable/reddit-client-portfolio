import express from 'express';
import { getSubredditPosts, getPostDetails } from '../controllers/redditController.js';

const router = express.Router();

// GET /api/subreddit/:subreddit
router.get('/subreddit/:subreddit', getSubredditPosts);

// GET /api/post/:postId
router.get('/post/:postId', getPostDetails);

export default router;
