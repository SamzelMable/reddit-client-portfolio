import axios from 'axios';

// Get access token
const getAccessToken = async () => {
  const response = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    'grant_type=client_credentials',
    {
      auth: {
        username: process.env.REDDIT_CLIENT_ID,
        password: process.env.REDDIT_CLIENT_SECRET,
      },
      headers: { 'User-Agent': process.env.USER_AGENT },
    }
  );

  return response.data.access_token;
};

// Fetch subreddit posts
export const fetchSubredditPosts = async (subreddit) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://oauth.reddit.com/r/${subreddit}/hot`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': process.env.USER_AGENT,
      },
    }
  );

  return response.data.data.children.map((child) => child.data);
};

// Fetch post details + comments
export const fetchPostDetails = async (postId) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://oauth.reddit.com/comments/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': process.env.USER_AGENT,
      },
    }
  );

  return {
    post: response.data[0].data.children[0].data,
    comments: response.data[1].data.children.map((child) => child.data),
  };
};
