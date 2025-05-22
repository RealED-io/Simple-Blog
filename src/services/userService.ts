import { supabase } from '../supabaseClient.ts';
import type { Session, User } from '@supabase/auth-js';

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

interface AuthResponse {
  session: Session;
  user: User;
}

export const userService = {
  async login(loginPayload: LoginPayload): Promise<AuthResponse> {
    const { data: { session, user }, error } = await supabase.auth.signInWithPassword(loginPayload);
    if (error || !session || !user)
      throw new Error(error?.message || 'Login failed');
    return { session, user };
  },

  async signup(signupPayload: SignupPayload): Promise<AuthResponse> {
    const { email, password, first_name, last_name } = signupPayload;
    const { data: { session, user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });
    if (error || !session || !user)
      throw new Error(error?.message || 'Signup failed');
    return { session, user };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error)
      throw new Error(error?.message || 'Logout failed');
  },

  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      alert(error.message);
      return null;
    } else {
      return data.session;
    }
  },
};