import { type FormEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store.ts';
import { signupUser } from '../features/user/authThunk.ts';

export const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [first_name, setFirst_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(signupUser({ email, password, first_name, last_name }));
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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(event) => setFirst_name(event.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(event) => setLast_name(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <button disabled={buttonDisabled || loading}>Signup</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};