import express from 'express';
import { getSubredditPosts, getPostDetails } from '../controllers/redditController.js';

const router = express.Router();

// Get posts from subreddit
router.get('/subreddit/:subreddit', getSubredditPosts);

// Get post details & comments
router.get('/post/:postId', getPostDetails);

export default router;
