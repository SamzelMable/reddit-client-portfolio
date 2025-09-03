import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch posts from your backend server
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/subreddit/${subreddit}`);
      return response.data; // already mapped in backend service
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
