import axios from 'axios';

// Common headers for Reddit API
const REDDIT_HEADERS = {
  'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
};

// Fetch subreddit posts
export const fetchSubredditPosts = async (subreddit) => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const response = await axios.get(url, { headers: REDDIT_HEADERS });
  return response.data.data.children.map((child) => child.data);
};

// Fetch post details & comments
export const fetchPostDetails = async (postId) => {
  const url = `https://www.reddit.com/comments/${postId}.json`;
  const response = await axios.get(url, { headers: REDDIT_HEADERS });

  return {
    post: response.data[0].data.children[0].data,
    comments: response.data[1].data.children.map((child) => child.data),
  };
};
