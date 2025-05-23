import { type FormEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import type { RootState } from '../app/store.ts';
import { loginUser } from '../features/user/authThunks.ts';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.status === 'succeeded' && auth.session) {
      navigate('/blogs');
    }
  }, [auth.session, auth.status, navigate]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await dispatch(loginUser({ email, password }));
    setLoading(false);
  };


  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: 360,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Login
      </Typography>

      <TextField
        type="email"
        label="Email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />

      <TextField
        type="password"
        label="Password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      {error && (
        <Typography color="error" textAlign="center" fontWeight="medium">
          {error}
        </Typography>
      )}
    </Box>
  );
};