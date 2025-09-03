import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostDetail = createAsyncThunk(
  'postDetail/fetchPostDetail',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/post/${postId}`);
      return response.data;
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
