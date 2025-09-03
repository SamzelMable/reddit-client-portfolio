import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import postDetailReducer from '../features/postDetail/postDetailSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    postDetail: postDetailReducer,
  },
});
