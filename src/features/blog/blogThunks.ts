// src/store/blog/blogThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogService } from '../../services/blogService';
import { type AppDispatch, type RootState } from '../../app/store';
import { setBlogs, setPagination, removeBlogOptimistic, addBlogOptimistic, updateBlogOptimistic } from './blogSlice';
import { type Blog } from '../../services/blogService.ts';

// export const fetchBlog = createAsyncThunk(
//   'blogs/fetch',
//   async (
//     { page, filter }: { page: number; filter: 'all' | 'public' | 'user' },
//     { dispatch, getState },
//   ) => {
//     const state = getState() as RootState;
//     const limit = state.blog.limit;
//     // const userId = state.auth.session?.user.id;
//
//     const { blogs, total } = await blogService.list({ page, limit, filter });
//     dispatch(setBlogs(blogs));
//     dispatch(setPagination({ page, total }));
//   },
// );

export const fetchBlogs = createAsyncThunk(
  'blogs/fetch',
  async (
    { page, filter }: { page: number; filter: 'all' | 'public' | 'user' },
    { dispatch, getState },
  ) => {
    const state = getState() as RootState;
    const limit = state.blog.limit;

    const { blogs, total } = await blogService.list({ page, limit, filter });
    dispatch(setBlogs(blogs));
    dispatch(setPagination({ page, total }));
  },
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id: string, { dispatch }) => {
    dispatch(removeBlogOptimistic(id));
    try {
      await blogService.delete(id);
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
  },
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blog: Omit<Blog, 'id' | 'created_at' | 'author'>, { dispatch }) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlogOptimistic(newBlog));
  },
);

export const editBlog = createAsyncThunk<
  void,
  { id: string; updates: Partial<Blog> },
  { state: RootState; dispatch: AppDispatch }
>(
  'blogs/edit',
  async ({ id, updates }, { dispatch, getState }) => {
    await blogService.update(id, updates);

    const state = getState();
    const existingBlog = state.blog.blogs.find((b) => b.id === id);

    if (existingBlog) {
      const updatedBlog = { ...existingBlog, ...updates };
      dispatch(updateBlogOptimistic(updatedBlog));
    } else {
      dispatch(fetchBlogs({ page: 1, filter: 'all' }));
    }
  },
);


