// src/components/BlogEditForm.tsx
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks.ts';
import { editBlog } from '../features/blog/blogThunks';
import { type Blog } from '../services/blogService.ts';
import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material';

type Props = {
  blog: Blog;
  onCancel: () => void;
};

export const BlogEditForm = ({ blog, onCancel }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content || '');
  const [isPublic, setIsPublic] = useState(blog.is_public);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(editBlog({ id: blog.id, updates: { title, content, is_public: isPublic } }));
    onCancel();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ marginTop: '1em' }}>
        <Typography variant="h4" gutterBottom>
          Edit Blog
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ mt: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label="Public"
        />

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mt: 2 }}
        >
          <Button variant="outlined" type="submit">
            Save
          </Button>
          <Button variant="outlined" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>

  );
};
