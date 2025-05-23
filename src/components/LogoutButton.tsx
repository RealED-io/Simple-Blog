import { logoutUser } from '../features/user/authThunks.ts';
import { useAppDispatch } from '../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Button variant="text" onClick={handleLogout}>Logout</Button>
  );
};