// src/components/BlogList.tsx
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { fetchBlogs, deleteBlog } from '../features/blog/blogThunks';
import { useSearchParams } from 'react-router-dom';
import { BlogEditForm } from './BlogEditForm.tsx';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

export const BlogList = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { blogs, total, limit } = useAppSelector((state) => state.blog);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useAppSelector((state) => state.auth.session?.user.id);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const filter = (searchParams.get('filter') || 'public') as 'all' | 'public' | 'user';
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, filter }));
  }, [dispatch, currentPage, filter]);

  const updateParams = (newPage: number, newFilter = filter) => {
    setSearchParams({ page: newPage.toString(), filter: newFilter });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Blogs</Typography>
      {userId && (
        <div>
          <Button
            variant="text"
            onClick={() => updateParams(1, 'all')}
            disabled={filter === 'all'}
          >
            All
          </Button>
          <Button
            variant="text"
            onClick={() => updateParams(1, 'public')}
            disabled={filter === 'public'}
          >
            Public
          </Button>
          <Button
            variant="text"
            onClick={() => updateParams(1, 'user')}
            disabled={filter === 'user'}
          >
            Private
          </Button>
        </div>
      )}


      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb:4 }}>
        {blogs.map((b) => (
          <Paper
            key={b.id}
            elevation={3}
            sx={{ p: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold' }}
            >{b.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >by: {b.author}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ m:2 }}
            >{b.content}
            </Typography>
            {(filter === 'user' || b.user_id === userId) && (
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
              >
                <Button variant="outlined" onClick={() => handleDelete(b.id)}>Delete</Button>
                <Button variant="outlined" onClick={() => setEditingId(b.id)}>Edit</Button>
              </Stack>
            )}
            {editingId === b.id && (
              <BlogEditForm blog={b} onCancel={() => setEditingId(null)} />
            )}
          </Paper>
        ))}
      </Box>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        <Button
          variant="contained"
          onClick={() => updateParams(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Back
        </Button>
        <Typography
          variant="overline"
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => updateParams(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};
