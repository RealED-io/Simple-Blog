import { createSlice } from '@reduxjs/toolkit';
import type { Session, User } from '@supabase/auth-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  user: null,
  status: 'idle',
  error: null,
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
    },
    clearSession(state) {
      state.session = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
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
