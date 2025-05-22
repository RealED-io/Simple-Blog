import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { blogService } from '../../services/blogService.ts';

export interface Blog {
  id: string;
  title: string;
  content: string;
  is_public: boolean;
  author: string;
  user_id: string;
  created_at: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  page: number;
  filter: 'public' | 'user' | 'all';
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  page: 1,
  filter: 'public',
};

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page, filter }: { page: number; filter: 'public' | 'user' | 'all' }) => {
    return await blogService.list({ page, filter });
  },
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFilter: (state, action: PayloadAction<'public' | 'user' | 'all'>) => {
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blogs';
      });
  },
});

export const { setPage, setFilter } = blogSlice.actions;
export default blogSlice.reducer;
