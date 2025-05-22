import { createSlice } from '@reduxjs/toolkit';
import type { Session, User, UserMetadata } from '@supabase/auth-js';

interface UserProfile extends UserMetadata {
  first_name: string;
  last_name: string;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  user_profile: UserProfile | null;
}

const initialState: AuthState = {
  session: null,
  user: null,
  status: 'idle',
  error: null,
  user_profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action) {
      state.session = action.payload.session;
      state.user = action.payload.user;
      state.status = 'succeeded';
      state.error = null;
      state.user_profile = action.payload.user?.user_metadata;
    },
    clearSession(state) {
      state.session = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.user_profile = null;
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setSession, clearSession, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
