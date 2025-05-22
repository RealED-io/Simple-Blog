// src/components/BlogList.tsx
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { fetchBlogs, deleteBlog } from '../features/blog/blogThunks';
import { useSearchParams } from 'react-router-dom';
import { BlogEditForm } from './BlogEditForm.tsx';

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
      <h2>Blogs</h2>
      {userId && (
        <div>
          <button onClick={() => updateParams(1, 'all')} disabled={filter === 'all'}>
            All
          </button>
          <button onClick={() => updateParams(1, 'public')} disabled={filter === 'public'}>
            Public
          </button>
          <button onClick={() => updateParams(1, 'user')} disabled={filter === 'user'}>
            Private
          </button>
        </div>
      )}


      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <h3>{b.title}</h3>
            <small>by: {b.author}</small>
            <p>{b.content}</p>
            {(filter === 'user' || b.user_id === userId) && (
              <div>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
                <button onClick={() => setEditingId(b.id)}>Edit</button>
              </div>
            )}
            {editingId === b.id && (
              <BlogEditForm blog={b} onCancel={() => setEditingId(null)} />
            )}
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => updateParams(currentPage - 1)} disabled={currentPage <= 1}>
          Back
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => updateParams(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
