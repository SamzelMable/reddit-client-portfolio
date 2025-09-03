import axios from 'axios';

// Use environment variable for backend URL
const API_BASE = process.env.REACT_APP_API_URL; // <-- update this

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axios.get(`${API_BASE}/subreddit/${subreddit}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch posts: ' + err.message);
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE}/post/${postId}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch post details: ' + err.message);
  }
};