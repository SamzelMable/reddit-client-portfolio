import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostDetails } from '../../utils/api'; // use api.js

export const fetchPostDetail = createAsyncThunk(
  'postDetail/fetchPostDetail',
  async (postId, { rejectWithValue }) => {
    try {
      const data = await fetchPostDetails(postId);
      return data; // expects { post, comments }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: {
    post: null,
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearPostDetail: (state) => {
      state.post = null;
      state.comments = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearPostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
