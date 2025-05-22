// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { LoginForm } from './components/LoginForm.tsx';
import { SignupForm } from './components/SignupForm.tsx';
import { LogoutButton } from './components/LogoutButton.tsx';
import { supabase } from './supabaseClient.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks.ts';
import { clearSession, setSession } from './features/user/authSlice.ts';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store.ts';

function App() {
  const [ showSignup, setShowSignup ] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { user, user_profile } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: authResponse, error } = await supabase.auth.getSession();
      if (error) {
        alert(error.message);
      }
      dispatch(setSession(authResponse));
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session)
          dispatch(setSession({ session, user: session.user }));
        else
          dispatch(clearSession());
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [dispatch]);

  if (user) {
    return (
      <div>
        <span>Hello {user_profile?.first_name} {user_profile?.last_name}</span>
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div>
        {showSignup ?
          <SignupForm /> :
          <LoginForm />
        }
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Login': 'Sign Up'}
        </button>
      </div>
    );
  }
}

export default App;
