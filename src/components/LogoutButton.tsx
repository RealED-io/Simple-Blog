import { userService } from '../services/userService.ts';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await userService.logout();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};