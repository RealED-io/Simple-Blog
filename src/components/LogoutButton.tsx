import { userService } from '../services/user.ts';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await userService.logout();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};