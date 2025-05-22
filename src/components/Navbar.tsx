import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { LogoutButton } from './LogoutButton.tsx';

export default function Navbar() {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', position: 'sticky', top: 0, backgroundColor: '#eee' }}>
      <Link to="/blogs">Blogs</Link>
      {session ? (
        <>
          <Link to="/blogs/create">New Post</Link>
          <div style={{ marginLeft: 'auto' }}>
            <LogoutButton />
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
