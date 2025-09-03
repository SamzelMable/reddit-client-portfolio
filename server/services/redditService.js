import axios from 'axios';

const REDDIT_HEADERS = {
  'User-Agent': process.env.REDDIT_USER_AGENT,
};

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    const response = await axios.get(url, { headers: REDDIT_HEADERS });
    return response.data.data.children.map(child => child.data);
  } catch (err) {
    throw new Error('Failed to fetch posts: ' + err.message);
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const url = `https://www.reddit.com/comments/${postId}.json`;
    const response = await axios.get(url, { headers: REDDIT_HEADERS });
    return {
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map(child => child.data),
    };
  } catch (err) {
    throw new Error('Failed to fetch post details: ' + err.message);
  }
};
