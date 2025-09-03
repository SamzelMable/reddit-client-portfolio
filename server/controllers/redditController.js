import { fetchSubredditPosts, fetchPostDetails } from '../services/redditService.js';

// Controller for subreddit posts
export const getSubredditPosts = async (req, res) => {
  const { name } = req.params;
  try {
    const posts = await fetchSubredditPosts(name);
    res.json(posts);
  } catch (error) {
    console.error('❌ Error fetching subreddit posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch subreddit posts' });
  }
};

// Controller for post details
export const getPostDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await fetchPostDetails(id);
    res.json(post);
  } catch (error) {
    console.error('❌ Error fetching post details:', error.message);
    res.status(500).json({ error: 'Failed to fetch post details' });
  }
};
