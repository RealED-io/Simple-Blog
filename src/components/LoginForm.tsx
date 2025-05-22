import { type FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import type { RootState } from '../app/store.ts';
import { loginUser } from '../features/user/authThunk.ts';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(loginUser({ email, password }));
    navigate('/blogs');
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};