import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { logoutUser } from '../features/user/authThunk';
import { useAppDispatch } from '../app/hooks.ts';

export default function Navbar() {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', position: 'sticky', top: 0, backgroundColor: '#eee' }}>
      <Link to="/blogs">Blogs</Link>
      {session ? (
        <>
          <Link to="/blogs/create">New Post</Link>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/login">Login</Link>
          <span> | </span>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}
