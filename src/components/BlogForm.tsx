import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { RootState } from '../app/store.ts';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { createBlog } from '../features/blog/blogThunks.ts';
import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material';

export default function BlogForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    if (id) {
      blogService.get(id).then((blog) => {
        setTitle(blog.title);
        setContent(blog.content);
        setIsPublic(blog.is_public);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await dispatch(
      createBlog({
        title,
        content,
        is_public: isPublic,
        user_id: user.id,
      }),
    );
    navigate('/blogs');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ marginTop: '1em' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>New Blog</Typography>

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
        </Stack>
      </form>
    </Container>

  );
}
