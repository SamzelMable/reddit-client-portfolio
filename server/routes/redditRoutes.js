import express from 'express';
import { getSubredditPosts, getPostDetails } from '../controllers/redditController.js';

const router = express.Router();

// GET /api/subreddit/:name
router.get('/subreddit/:name', getSubredditPosts);

// GET /api/post/:id
router.get('/post/:id', getPostDetails);

export default router;
