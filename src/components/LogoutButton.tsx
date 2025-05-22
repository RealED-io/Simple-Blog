import { logoutUser } from '../features/user/authThunks.ts';
import { useAppDispatch } from '../app/hooks.ts';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};