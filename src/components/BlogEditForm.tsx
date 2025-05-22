// src/components/BlogEditForm.tsx
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks.ts';
import { editBlog } from '../features/blog/blogThunks';
import { type Blog } from '../services/blogService.ts';

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
    <form onSubmit={handleSubmit} style={{ marginTop: '1em' }}>
      <h4>Edit Blog</h4>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public
      </label>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};
