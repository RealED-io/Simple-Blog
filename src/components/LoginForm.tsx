import { type FormEvent, useState } from 'react';
import { supabase } from '../supabaseClient.ts';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }

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