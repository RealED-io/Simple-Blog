import { supabase } from '../supabaseClient.ts';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const userService = {
  async login(loginPayload: LoginPayload): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword(loginPayload);
    if (error) {
      alert(error.message);
    } else {
      alert('Login Successful!');
    }
  },

  async signup(signupPayload: SignupPayload): Promise<void> {
    const { email, password, first_name, last_name } = signupPayload;
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
    if (error) {
      alert(error.message);
    } else {
      alert('Signup Successful!');
    }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert('Logout Successful!');
    }
  },
};