import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Blog } from '../../services/blogService.ts';


interface BlogState {
  blogs: Blog[];
  page: number;
  total: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  page: 1,
  total: 0,
  limit: 5,
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
    },
    setPagination(state, action: PayloadAction<{ page: number; total: number }>) {
      state.page = action.payload.page;
      state.total = action.payload.total;
    },
    removeBlogOptimistic(state, action: PayloadAction<string>) {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
      state.total = Math.max(state.total - 1, 0);
    },
    addBlogOptimistic(state, action: PayloadAction<Blog>) {
      state.blogs = [action.payload, ...state.blogs];
      state.total += 1;
    },
    updateBlogOptimistic(state, action: PayloadAction<Blog>) {
      const index = state.blogs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },

  },
});

export const {
  setBlogs,
  setPagination,
  removeBlogOptimistic,
  addBlogOptimistic,
  updateBlogOptimistic,
} = blogSlice.actions;

export default blogSlice.reducer;