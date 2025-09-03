// server/server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get OAuth token from Reddit
const getAccessToken = async () => {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error('❌ Failed to get Reddit access token:', err.response?.data || err.message);
    throw new Error('Unable to authenticate with Reddit API');
  }
};

// Route: fetch subreddit posts
app.get('/api/subreddit/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const token = await getAccessToken();

    const response = await axios.get(`https://oauth.reddit.com/r/${name}/hot`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
      },
    });

    res.json(response.data.data.children.map((child) => child.data));
  } catch (err) {
    console.error('❌ Error fetching subreddit posts:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// Route: fetch post details + comments
app.get('/api/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const token = await getAccessToken();

    const response = await axios.get(`https://oauth.reddit.com/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'reddit-client-app/1.0 (by SamzelMable)',
      },
    });

    res.json({
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map((child) => child.data),
    });
  } catch (err) {
    console.error('❌ Error fetching post details:', err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
