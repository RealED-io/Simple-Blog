import { type FormEvent, useState } from 'react';
import { userService } from '../services/user.ts';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await userService.signIn({ email, password });
    setLoading(false);

  };

  const handleEmailInput = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordInput = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSumbit}>
        <input type="email" placeholder="Email" onChange={handleEmailInput}/>
        <input type="password" placeholder="Password" onChange={handlePasswordInput}/>
        <button>Login</button>
        {loading && <div>Loading...</div>}
      </form>
    </div>
  );
};