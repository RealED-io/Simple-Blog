import { type FormEvent, useState } from 'react';
import { supabase } from '../supabaseClient.ts';

export const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [first_name, setFirst_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
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

  const handleConfirmPasswordInput = (event: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(event.currentTarget.value);
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

  const handleFirstNameInput = (event: FormEvent<HTMLInputElement>) => {
    setFirst_name(event.currentTarget.value);
  };

  const handleLastNameInput = (event: FormEvent<HTMLInputElement>) => {
    setLast_name(event.currentTarget.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={handleEmailInput}/>
        <input type="text" placeholder="First Name" onChange={handleFirstNameInput}/>
        <input type="text" placeholder="Last Name" onChange={handleLastNameInput}/>
        <input type="password" placeholder="Password" onChange={handlePasswordInput}/>
        <input type="password" placeholder="Confirm Password" onChange={handleConfirmPasswordInput}/>
        <button disabled={buttonDisabled || loading}>Signup</button>
        {loading && <div>Loading...</div>}
      </form>
    </div>
  );
};