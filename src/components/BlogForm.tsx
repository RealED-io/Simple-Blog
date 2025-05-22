import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { RootState } from '../app/store.ts';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { createBlog } from '../features/blog/blogThunks.ts';

export default function BlogForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const dispatch = useAppDispatch();
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

    dispatch(
      createBlog({
        title,
        content,
        is_public: isPublic,
        user_id: user.id,
      }),
    );

    setTitle('');
    setContent('');
    setIsPublic(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Blog</h3>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
