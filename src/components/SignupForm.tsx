import { type FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import type { RootState } from '../app/store.ts';
import { signupUser } from '../features/user/authThunks.ts';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

export const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [first_name, setFirst_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(signupUser({ email, password, first_name, last_name }));
    navigate('/blogs');

    setLoading(false);
  };

  let buttonDisabled = true;
  if (email !== ''
      && first_name !== ''
      && last_name !== ''
      && password !== ''
      && confirmPassword !== ''
      && password === confirmPassword) {
    buttonDisabled = false;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        maxWidth: 400,
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
      <Typography variant="h5" component="h2" textAlign="center">
        Signup
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
        type="text"
        label="First Name"
        placeholder="First Name"
        onChange={(e) => setFirst_name(e.target.value)}
        required
        fullWidth
      />

      <TextField
        type="text"
        label="Last Name"
        placeholder="Last Name"
        onChange={(e) => setLast_name(e.target.value)}
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

      <TextField
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={buttonDisabled || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
      </Button>

      {error && (
        <Typography color="error" textAlign="center" fontWeight="medium">
          {error}
        </Typography>
      )}
    </Box>
  );
};