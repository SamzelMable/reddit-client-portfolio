import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axios.get(`${API_BASE}/subreddit/${subreddit}`);
    return response.data.data.children.map(child => child.data);
  } catch (err) {
    throw new Error('Failed to fetch posts');
  }
};
