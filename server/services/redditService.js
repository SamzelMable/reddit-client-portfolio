import axios from 'axios';
import qs from 'qs';

const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error('Error fetching Reddit access token:', err.message);
    throw new Error('Unable to authenticate with Reddit API');
  }
};

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/hot`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
      },
    });

    return response.data.data.children.map((child) => child.data);
  } catch (err) {
    console.error('Error fetching subreddit posts:', err.message);
    throw new Error('Failed to fetch posts from Reddit');
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://oauth.reddit.com/comments/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
      },
    });

    return {
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map((child) => child.data),
    };
  } catch (err) {
    console.error('Error fetching post details:', err.message);
    throw new Error('Failed to fetch post details from Reddit');
  }
};

export const fetchSubredditSuggestions = async (query) => {
  const url = `https://www.reddit.com/subreddits/search.json?q=${query}&limit=5`;
  const response = await axios.get(url);

  return response.data.data.children.map((child) => ({
    id: child.data.id,
    name: child.data.display_name_prefixed,
  }));
};

