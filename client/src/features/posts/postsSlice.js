import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts } from '../../utils/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const data = await fetchSubredditPosts(subreddit);
      return { posts: data, subreddit }; // include subreddit
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentSubreddit: 'popular',
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
        state.items = action.payload.posts;
        state.currentSubreddit = action.payload.subreddit; // update subreddit
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
