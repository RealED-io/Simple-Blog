import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { LogoutButton } from './LogoutButton.tsx';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Button component={Link} to="/blogs" color="inherit">
          Blogs
        </Button>

        {session ? (
          <>
            <Button component={Link} to="/blogs/create" color="inherit">
              New Post
            </Button>

            <Box sx={{ marginLeft: 'auto' }}>
              <LogoutButton />
            </Box>
          </>
        ) : (
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Typography variant="body2" color="text.secondary">
              |
            </Typography>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
